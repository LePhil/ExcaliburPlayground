import * as ex from "excalibur";
import {Resources} from "./config/Resources";
import {Config} from "./config/Config";

export class LevelMap extends ex.Actor {
    private _levelConf: any;

    constructor(levelConf) {
        super(Config.GAME.WIDTH / 2,
              Config.GAME.HEIGHT / 2,
              levelConf.W,
              levelConf.H);
        
        this._levelConf = levelConf;
    }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.Sprite(Resources[this._levelConf.IMG], 0, 0, this._levelConf.W, this._levelConf.H);
    this.addDrawing(spriteSheet);
  }
}
