import * as ex from "excalibur";
import {Customer} from "./Customer";

export class CustomerSpawner extends ex.Actor {
  public queue:Customer[];

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);

    this.collisionType = ex.CollisionType.Passive;
  }
}
