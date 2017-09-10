declare var globals: any;
import * as ex from "excalibur";

export class LevelMap extends ex.Actor {
    private _level: string;

    constructor(level) {
        let c = globals.conf;

        super(c.GAME.WIDTH / 2,
            c.GAME.HEIGHT / 2,
            c.MAPS.W,
            c.MAPS.H);
        
        this._level = level;
    }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.Sprite(globals.resources[this._level], 0, 0, globals.conf.MAPS.W, globals.conf.MAPS.H);
    this.addDrawing(spriteSheet);
  }
}
