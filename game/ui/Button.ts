declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class Button extends ex.UIActor {
    constructor(x: number,
                y: number,
                public text: string,
                public action: () => void,
                w = Config.GAME.UI.BUTTON_WIDTH,
                h = Config.GAME.UI.BUTTON_HEIGHT,
                sprite = Resources.ImgButton.asSprite()) {

      super(x, y, w, h);

      let scaleX = w/Config.GAME.UI.BUTTON_WIDTH,
          scaleY = h/Config.GAME.UI.BUTTON_HEIGHT;

      // TODO: doesn't seem to work!
      sprite.scale.setTo(scaleX, scaleY);
      this.addDrawing(sprite);
      let fontSize = 24;
      let label = new ex.Label(text, w/2, h/2 + fontSize/2);
      label.fontSize = fontSize;
      label.color = ex.Color.White;
      label.textAlign = ex.TextAlign.Center;
      this.add(label);
      
      this.off("pointerup", this.action);
      this.on("pointerup", () => this.action());
    }
  }