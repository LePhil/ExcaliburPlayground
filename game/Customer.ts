import * as ex from "excalibur";
import {Food} from "./Item";

export class Customer extends ex.Actor {
  public wants:Food;

  constructor(x, y, w, h, wants = new Food()) {
    super(x, y, w, h, wants.color);

    this.wants = wants;

    this.collisionType = ex.CollisionType.Passive;
  }
}
