declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Food} from "./Food";
import {FoodStation} from "./FoodStation";
import {Inventory} from "./Inventory";
import {Customer} from "./Customer";
import {Cassa} from "./Cassa";
import {AbstractPlayer} from "./AbstractPlayer";
import {Tool} from "./Tools";
import {Storage} from "./Storage";

export class Player extends AbstractPlayer {
  inventory: Inventory;
  private _isBusy:boolean;

  constructor(inventory: Inventory) {
    super(Config.PLAYER.START.X,
          Config.PLAYER.START.Y,
          Config.PLAYER.WIDTH,
          Config.PLAYER.HEIGHT);

    this.inventory = inventory;
    this.collisionType = ex.CollisionType.Active;
    this._isBusy = false;
  }

  getPlayerColor ():string {
    let playerColor = Config.PLAYER.INITIAL_TYPE; //start with green guy if no color was chosen

    if ( Storage.get("playerColor") ) {
      playerColor = Storage.get("playerColor");
    }
    
    return playerColor;
  }

  /**
   * Ain't got no kids!
   */
  _updateChildren():void {}

  // TODO: very similar to sendToFoodStation...
  public pickupTool(tool: Tool, callback: any) {
    this.actions
      .moveTo(tool.pos.x, tool.pos.y, this._speed)
      .callMethod(() => {
        this._isBusy = true;
        this.setDrawing("pickUp");
      })
      .delay(500)
      .callMethod(()=> {
        this._isBusy = false;
        this.setDrawing("idle");
        callback();
      });
  }
  
  public goTo(evt: PointerEvent) {
   this.actions.moveTo(evt.x, evt.y, this._speed);
  }

  public sendToFoodStation(station: FoodStation, callback: () => void) {
    this.actions
      .moveTo(station.pos.x,
              station.pos.y,
              this._speed)
      .callMethod(() => {
        callback();
        if (station.isReady()) {
          this.getFoodFromStation(station);
        } else if (station.isBroken()) {
          if (this.inventory.checkAndRemoveTool("hammer")) {
            this.repairStation(station);
          } else {
            // TODO: What to do if tool not equipped
          }
        }
      });
  }

  public getFoodFromStation(station: FoodStation): void {
    this._isBusy = true;
    this.setDrawing("pickUp");
    this.actions
      .delay(station.getDuration())
      .callMethod(() => {
        this.addFood(station.getFood());
        this._isBusy = false;
        this.setDrawing("idle");
      });
  }

  public repairStation(station: FoodStation): void {
    // TODO: maybe different duration, depending on tool and/or station?
    this._isBusy = true;
    this.setDrawing("pickUp");
    this.actions
      .delay(station.getDuration())
      .callMethod(() => {
        station.fix();
        this._isBusy = false;
        this.setDrawing("idle");
      });
  }

  public sendToCassa(cassa: Cassa, callback: any) {
    // TODO: delay still necessary?
    this.actions
      .moveTo(cassa.pos.x, cassa.pos.y, 200)
      .delay(1000)
      .callMethod(callback);
  }

  public addFood(food: Food) {
    this.inventory.addItem(food);
  }

  public addTool(type: string) {
    this.inventory.addTool(type);
  }

  /**
   * Serve items to a customer if applicable
   * @param  {Customer[]} customerQueue
   */
  public serveItems(customerQueue:Customer[]) {
    let customersToRemove = new Array<Customer>();

    // check for each customer if we have what they want
    for (let cust of customerQueue) {
      if (this.inventory.checkAndRemoveItem(cust.wants)) {
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
    }, duration*1000);

  }

  _handleIdlePlayer():void {
    if(!this._isBusy) {
      this.setDrawing("idle");
    }
  }

  public resetState():void {
    this.inventory.resetState();
    this.actions.clearActions();
    this.pos.x = Config.PLAYER.START.X;
    this.pos.y = Config.PLAYER.START.Y;
  }
}
