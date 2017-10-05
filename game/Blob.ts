import * as ex from "excalibur";
import {MoneyEffect} from "./Effects";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";

export class Blob extends ex.Actor {
  private _speed: number;

  constructor(setup: any, callback: (results: number) => void) {
    let getRandomX = () => {
      let minX = (Config.GAME.WIDTH - setup.W) / 2;
      let maxX = Config.GAME.WIDTH - minX;
      return ex.Util.randomIntInRange(minX, maxX);
    };
    let getRandomY = () => {
      let minY = (Config.GAME.HEIGHT - setup.H) / 2;
      let maxY = Config.GAME.HEIGHT - minY;
      return ex.Util.randomIntInRange(minY, maxY);
    };

    super(getRandomX(), getRandomY(),
          Config.BLOB.WIDTH,
          Config.BLOB.HEIGHT);

    this._speed = Config.BLOB.SPEED;
    this.collisionType = ex.CollisionType.Passive;

    let nrOfPoints = ex.Util.randomIntInRange(3, 6);

    for(let i = 0; i < nrOfPoints; i++) {
      this.actions.moveTo(getRandomX(), getRandomY(), this._speed)
                  .delay(500);
    }

    this.actions.repeatForever();

    this.on("pointerdown", (event) => {
      this.kill();
      this.scene.add(new MoneyEffect(this.pos.x, this.pos.y));
      // TODO: maybe worth decreases with time?
      callback(Config.BLOB.WORTH);
    });
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(Resources.TextureBlob, 1, 2, 57, 34);

    let speed = Config.BLOB.ANIM_SPEED;

    let walkAnim = spriteSheet.getAnimationByIndices(engine,[0,1], speed);
    walkAnim.loop = true;
    this.addDrawing("walk", walkAnim);

    this.setDrawing("walk");

    // Remove Blob after X seconds
    let blobRemovalTimer = new ex.Timer(() => {
      this.kill();
    }, Config.BLOB.LIFETIME * 1000, true);

    engine.add(blobRemovalTimer);
  }
}
