declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";
import {Inventory} from "./Inventory";
import {Customer} from "./Customer";


const PLAYER_SPEED = 100;
const enum PlayerMode {
   Idle,
   Walking,
   Working
}

export class Player extends ex.Actor {
  inventory: Inventory;
  private _currentMode: PlayerMode = PlayerMode.Idle;

  constructor(color, inventory: Inventory) {
    super(globals.conf.PLAYER_STARTX,
          globals.conf.PLAYER_STARTY,
          globals.conf.PLAYER_WIDTH,
          globals.conf.PLAYER_HEIGHT,
          color);
    this.inventory = inventory;

    this.collisionType = ex.CollisionType.Active;
  }

  public goTo(evt: PointerEvent) {
     // this.actions.clearActions();
     this.actions.moveTo(evt.x, evt.y, globals.conf.PLAYER_SPEED).callMethod(()=> {
       console.log("Done");
     });
  }

  public receiveFood(food: Food) {
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
}
