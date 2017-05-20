import * as ex from "excalibur";

export class Brick extends ex.Actor {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);

        // Make sure that bricks can participate in collisions
        this.collisionType = ex.CollisionType.Active;

        // enable propagating pointer events
        this.enableCapturePointer = true;

        // subscribe to input
        this.on("pointerup", function (ev) {
          this.logger.info("Brick selected!", ev);
          this.kill();
        });
    }
}
