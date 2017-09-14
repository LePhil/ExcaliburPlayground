declare var globals: any;
import * as ex from "excalibur";

export class Medal extends ex.UIActor {
    constructor(x, y, value: string) {
      super(x, y);

      let conf = globals.conf.MEDALS;
      let tex = globals.resources.MedalsSheet;
      let index = conf.TYPES[value] ? conf.TYPES[value] : 0;
      let sprite = new ex.SpriteSheet(tex, 5, 2, conf.W, conf.H);
      this.addDrawing( sprite.getSprite(index) );
    }
  }