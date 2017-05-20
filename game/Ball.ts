import * as ex from "excalibur";
import {Brick} from "./Brick";

export class Ball extends ex.Actor {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.collisionType = ex.CollisionType.Elastic;

    // On collision remove the brick
    this.on("collision", function(ev: ex.CollisionEvent) {
      if (ev.other instanceof Brick) {
        ev.other.kill();
      }
    });
  }

  public update(engine: ex.Engine, delta: number) {
    super.update(engine, delta);

    // If the ball collides with the left side of the screen reverse the x velocity
    if (this.pos.x < (this.getWidth() / 2)) {
      this.vel.x *= -1;
    }

    // If the ball collides with the right side of the screen reverse the x velocity
    if (this.pos.x + (this.getWidth() / 2) > engine.getDrawWidth()) {
      this.vel.x *= -1;
    }

    // If the ball collides with the top of the screen reverse the y velocity
    if (this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    // super.draw(ctx, delta);
    ctx.fillStyle = this.color.toString();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
