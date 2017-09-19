declare var globals: any;
import * as ex from "excalibur";

export class Button extends ex.UIActor {
    constructor(x: number,
                y: number,
                w = globals.conf.GAME.UI.BUTTON_WIDTH,
                h = globals.conf.GAME.UI.BUTTON_HEIGHT,
                public text: string,
                sprite: ex.Sprite,
                public action: () => void) {

      super(x, y, w, h);

      this.addDrawing(sprite);
      let fontSize = 24;
      let label = new ex.Label(text, w/2, h/2 + fontSize/2);
      label.fontSize = fontSize;
      label.color = ex.Color.White;
      label.textAlign = ex.TextAlign.Center;
      this.add(label);
      
      this.off("pointerup", this.action);
      this.on("pointerup", this.action);
    }
  }