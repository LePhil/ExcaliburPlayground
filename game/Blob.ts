declare var globals: any;
import * as ex from "excalibur";
import { Director } from "./Director";
import { MoneyEffect } from "./Effects";

export class Blob extends ex.Actor {
  private _speed: number;
  private _director: Director;

  constructor(director: Director) {
    let setup = director.getLevelData();
    let getRandomX = () => {
      let minX = (globals.conf.GAME.WIDTH - setup.W) / 2;
      let maxX = globals.conf.GAME.WIDTH - minX;
      return ex.Util.randomIntInRange(minX, maxX);
    };
    let getRandomY = () => {
      let minY = (globals.conf.GAME.HEIGHT - setup.H) / 2;
      let maxY = globals.conf.GAME.HEIGHT - minY;
      return ex.Util.randomIntInRange(minY, maxY);
    };

    super(getRandomX(), getRandomY(),
          globals.conf.BLOB.WIDTH,
          globals.conf.BLOB.HEIGHT);

    this._speed = globals.conf.BLOB.SPEED;
    this.collisionType = ex.CollisionType.Passive;
    this._director = director;

    let nrOfPoints = ex.Util.randomIntInRange(3, 6);

    for(let i = 0; i < nrOfPoints; i++) {
      this.actions.moveTo(getRandomX(), getRandomX(), this._speed)
                  .delay(500);
    }

    this.actions.repeatForever();

    this.on("pointerdown", (event) => {
      this.kill();
      this._director.addPoints(globals.conf.BLOB.WORTH);

      this.scene.add(new MoneyEffect(this.pos.x, this.pos.y));
    });
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(globals.resources.TextureBlob, 1, 2, 57, 34);

    let speed = globals.conf.BLOB.ANIM_SPEED;

    let walkAnim = spriteSheet.getAnimationByIndices(engine,[0,1], speed);
    walkAnim.loop = true;
    this.addDrawing("walk", walkAnim);

    this.setDrawing("walk");

    // Remove Blob after X seconds
    let blobRemovalTimer = new ex.Timer(() => {
      this.kill();
    }, globals.conf.BLOB.LIFETIME * 1000, true);

    engine.add(blobRemovalTimer);
  }
}
