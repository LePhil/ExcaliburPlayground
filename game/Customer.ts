declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

export class Customer extends ex.Actor {
  public wants:Food;

  constructor(x, y, wants = new Food()) {
    super(x, y,
          globals.conf.CUSTOMER_WIDTH,
          globals.conf.CUSTOMER_HEIGHT,
          wants.color);

    this.wants = wants;

    this.collisionType = ex.CollisionType.Passive;
  }
}
