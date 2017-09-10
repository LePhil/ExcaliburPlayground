declare var globals: any;
import * as ex from "excalibur";

export class LevelMap extends ex.Actor {
    private _levelConf: any;

    constructor(levelConf) {
        let c = globals.conf;

        super(c.GAME.WIDTH / 2,
            c.GAME.HEIGHT / 2,
            c.MAPS.W,
            c.MAPS.H);
        
        this._levelConf = levelConf;
    }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.Sprite(globals.resources[this._levelConf.IMG], 0, 0, this._levelConf.W, this._levelConf.H);
    this.addDrawing(spriteSheet);
  }
}
