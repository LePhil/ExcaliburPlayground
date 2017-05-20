import * as ex from "excalibur";

export class Paddle extends ex.Actor {
    constructor(x, y, w, h, color) {
      super(x, y, w, h, color);

      // Make sure the paddle can partipate in collisions, by default excalibur actors do not collide
      this.collisionType = ex.CollisionType.Fixed;
    }
}
