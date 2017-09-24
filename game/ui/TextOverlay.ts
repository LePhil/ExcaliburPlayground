declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../config/Config";

export class TextOverlay extends ex.UIActor {
    constructor(texts: Array<string>) {

      let w = Config.GAME.UI.OVERLAY.W;
      let h = Config.GAME.UI.OVERLAY.H;
      let x = (Config.GAME.WIDTH - w) / 2;
      let y = (Config.GAME.HEIGHT - h) / 2;

      super(x, y, w, h);

      this.color = ex.Color.White;

      let fontSize = 24;
      let textColor = ex.Color.Black;

      texts.forEach((text, index) => {
          let label = new ex.Label(text, w/2, (y - h/2) + (1.6 * (index + 3) * fontSize));
          label.fontSize = fontSize;
          label.color = textColor;
          label.textAlign = ex.TextAlign.Center;
          this.add(label);
      });
    }
  }