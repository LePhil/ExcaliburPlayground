import * as ex from "excalibur";
import {Food} from "./Item";

const PLAYER_SPEED = 100;

export class Player extends ex.Actor {
  inventory: Array<Food>;

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.inventory = [];

    this.collisionType = ex.CollisionType.Active;
  }

  public goTo(evt: PointerEvent) {
     // this.actions.clearActions();
     this.actions.moveTo(evt.x, evt.y, 200).callMethod(()=> {
       console.log("Done");
     });
  }

  public receiveFood(food: Food) {
    this.inventory.push(food);
    console.log(this.inventory);
  }
}
