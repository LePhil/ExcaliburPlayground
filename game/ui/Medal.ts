declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class Medal extends ex.UIActor {
    constructor(x, y, value: string) {
      super(x, y);

      let conf = Config.MEDALS;
      let tex = Resources.MedalsSheet;
      let index = conf.TYPES[value] ? conf.TYPES[value] : 0;
      let sprite = new ex.SpriteSheet(tex, 5, 2, conf.W, conf.H);
      this.addDrawing( sprite.getSprite(index) );
    }
  }