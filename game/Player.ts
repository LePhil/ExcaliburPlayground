import * as ex from "excalibur";
import { Config } from "./config/Config";
import { Item } from "./Item";
import { ItemSource } from "./ItemSource";
import { Inventory } from "./Inventory";
import { Customer } from "./Customer";
import { Cassa } from "./Cassa";
import { AbstractPlayer } from "./AbstractPlayer";
import { Tool } from "./Tools";
import { Storage } from "./Storage";

export class Player extends AbstractPlayer {
  inventory: Inventory;
  private _isBusy: boolean = false;

  constructor(inventory: Inventory) {
    super(Config.PLAYER.START.X,
      Config.PLAYER.START.Y,
      Config.PLAYER.WIDTH,
      Config.PLAYER.HEIGHT);

    this.anchor.setTo(.5, .5);
    this.inventory = inventory;
    this.collisionType = ex.CollisionType.Active;
  }

  getPlayerColor(): string {
    return "HIME";
  }

  // TODO: very similar to sendToFoodStation...
  public pickupTool(tool: Tool, callback: any) {

    this.actions
      .moveTo(tool.pos.x, tool.pos.y, this._speed)
      .callMethod(() => {
        this._isBusy = true;
        this.setDrawing("pickUp");
      })
      .delay(500)
      .callMethod(() => {
        this._isBusy = false;
        this.setDrawing("idle");
        callback();
      });
  }

  public goToAndDoTask(pos: ex.Vector, duration: number, callback: any) {
    this.actions
      .moveTo(pos.x, pos.y, this._speed)
      .callMethod(() => {
        this._isBusy = true;
        this.setDrawing("pickUp");
      })
      .delay(duration)
      .callMethod(() => {
        this._isBusy = false;
        this.setDrawing("idle");
        callback();
      });
  }

  public goTo(pos: ex.Vector, callback: () => void) {
    this.actions.moveTo(pos.x, pos.y, this._speed).callMethod(callback);
  }

  // TODO: found the bug - click on 2nd foodstations before 1st is reached --> the "waiting" happens while player is moving to the 2nd station already!
  // See https://github.com/excaliburjs/Excalibur/issues/292
  public goToItemSource(itemSource: ItemSource, callback: () => void) {

    let target = itemSource.getPositionToStand();

    this.actions
      .moveTo(target.x, target.y, this._speed)
      .callMethod(() => {
        this._isBusy = true;
        this.setDrawing("pickUp");
      })
      .delay(itemSource.getDuration())
      .callMethod(() => {
        callback();
        if (!this.inventory.isFull() && itemSource.isReady()) {
          this.getItemFromSource(itemSource);
        } else if (itemSource.isBroken() && this.inventory.hasItem("hammer")) {
          if (this.inventory.checkAndRemoveItem("hammer")) {
            this.repairItemSource(itemSource);
          } else {
            console.warn("Something went wrong. Schrödinger's item?");
          }
        }
        
        this._isBusy = false;
        this.setDrawing("idle");
      });
  }

  public getItemFromSource(itemSource: ItemSource): void {
    this.addToInventory(itemSource.getContent());
  }

  public repairItemSource(itemSource: ItemSource): void {
    itemSource.fix();
  }

  public sendToCassa(cassa: Cassa, callback: any) {
    let target = cassa.getTargetLocation();

    this.actions
      .moveTo(target.x, target.y, 200)
      .delay(1000)
      .callMethod(() => {
        callback();
      });
  }

  public addToInventory(type: string) {
    this.inventory.addItem(type);
  }

  /**
   * Serve items to a customer if applicable
   * @param  {Customer[]} customerQueue
   */
  public serveItems(customerQueue: Customer[]) {
    let customersToRemove = new Array<Customer>();

    // check for each customer if we have all that they want
    for (let cust of customerQueue) {
      let itemsToRemove = new Array<Item>();

      cust.desiredItems.forEach(item => {
        if (this.inventory.checkAndRemoveItem(item.getType())) {
          itemsToRemove.push(item);
        }
      });

      cust.removeItems(itemsToRemove);

      if (cust.desiredItems.length === 0) {
        customersToRemove.push(cust);
      }
    }

    return customersToRemove;
  }

  public adjustSpeed(adjustment: number, duration: number) {
    let originalSpeed = this._speed;
    this._speed *= adjustment;

    setTimeout(() => {
      this._speed = originalSpeed;
    }, duration * 1000);
  }

  _setup(): void {
    this._isBusy = false;
    super._setup();
  }

  _handleIdlePlayer(): void {
    if (!this._isBusy) {
      super._handleIdlePlayer();
    }
  }

  public resetState(): void {
    this._setup();
    this.inventory.resetState();
    this.actions.clearActions();
    this.pos.x = Config.PLAYER.START.X;
    this.pos.y = Config.PLAYER.START.Y;
    this._handleIdlePlayer();
  }
}
