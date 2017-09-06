declare var globals: any;
import * as ex from "excalibur";

export class Blob extends ex.Actor {
  private _speed: number;

  constructor(x, y) {
    super(x, y,
          globals.conf.BLOB.WIDTH,
          globals.conf.BLOB.HEIGHT);

    this._speed = globals.conf.BLOB.SPEED;
    this.collisionType = ex.CollisionType.Passive;

    this.on("pointerdown", (event) => {
      this.kill();
    });

    // TODO: nicer pattern, points/event on capture
    // TODO: disappear after X seconds again
    this.actions
      .moveTo(0  , 0  , this._speed)
      .delay(500)
      .moveTo(200, 400, this._speed)
      .delay(500)
      .moveTo(400, 200, this._speed)
      .repeatForever();
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(globals.resources.TextureBlob, 1, 2, 57, 34);

    let speed = globals.conf.BLOB.ANIM_SPEED;

    let walkAnim = spriteSheet.getAnimationByIndices(engine,[0,1], speed);
    walkAnim.loop = true;
    this.addDrawing("walk", walkAnim);

    this.setDrawing("walk");
  }
}
