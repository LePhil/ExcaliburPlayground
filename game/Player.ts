declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";
import {FoodStation} from "./FoodStation";
import {Inventory} from "./Inventory";
import {Customer} from "./Customer";
import {Cassa} from "./Cassa";
import {AbstractPlayer} from "./AbstractPlayer";

export class Player extends AbstractPlayer {
  inventory: Inventory;
  private _isBusy:boolean;

  constructor(inventory: Inventory) {
    super(globals.conf.PLAYER_STARTX,
          globals.conf.PLAYER_STARTY,
          globals.conf.PLAYER_WIDTH,
          globals.conf.PLAYER_HEIGHT);

    this.inventory = inventory;
    this.collisionType = ex.CollisionType.Active;
    this._isBusy = false;
  }

  getPlayerColor ():string {
    let playerColor = globals.conf.PLAYER_TYPE_INITIAL_COLOR; //start with green guy if no color was chosen

    if ( globals.storage.get("playerColor") ) {
      playerColor = globals.storage.get("playerColor");
    }
    
    return playerColor;
  }

  _updateChildren():void {}

  public goTo(evt: PointerEvent) {
   this.actions.moveTo(evt.x, evt.y, this._speed)
               .callMethod(()=> {
                 // TODO ?
               });
  }

  public sendToFoodStation(station: FoodStation) {
    this.actions
      .moveTo(station.pos.x,
              station.pos.y,
              this._speed)
      .callMethod(() => {
        this._isBusy = true;
        this.setDrawing("pickUp");
      })
      .delay(globals.conf.STATION_DURATION)
      .callMethod(()=> {
        this.addFood(station.getFood());
        this._isBusy = false;
        this.setDrawing("idle");
      });
  }

  public sendToCassa(cassa: Cassa, callback: any) {
    this.actions
      .moveTo(cassa.pos.x, cassa.pos.y, 200)
      .delay(1000)
      .callMethod(callback);
  }

  public addFood(food: Food) {
    this.inventory.addItem(food);
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

  _handleIdlePlayer():void {
    if(!this._isBusy) {
      this.setDrawing("idle");
    }
  }

  public resetState():void {
    this.inventory.resetState();
    this.actions.clearActions();
    this.pos.x = globals.conf.PLAYER_STARTX;
    this.pos.y = globals.conf.PLAYER_STARTY;
  }
}
