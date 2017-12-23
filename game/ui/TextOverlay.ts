import * as ex from "excalibur";
import {Config} from "../config/Config";

export class TextOverlay extends ex.UIActor {

    private _labels: Array<ex.Label>;

    constructor(color: ex.Color = ex.Color.White ) {
        let w = Config.GAME.UI.OVERLAY.W;
        let h = Config.GAME.UI.OVERLAY.H;
        let x = (Config.GAME.WIDTH - w) / 2;
        let y = (Config.GAME.HEIGHT - h) / 2;

        super(x, y, w, h);

        let bg = new ex.UIActor(w/2,h/2,w,h);
        bg.color = color;
        bg.anchor.setTo(.5, .5);
        this.add(bg);
        if(color === ex.Color.Transparent) {
            bg.opacity = .4;
        }

        this._labels = [];
    }

    public setText(texts: Array<any>): void {
      // Remove previous labels
      if (this._labels.length > 0) {
        this._labels.forEach(label => {
          this.remove(label);
        });
      }
      this._labels = [];

      let w = Config.GAME.UI.OVERLAY.W;
      let h = Config.GAME.UI.OVERLAY.H;
      let x = (Config.GAME.WIDTH - w) / 2;
      let y = (Config.GAME.HEIGHT - h) / 2;

      texts.forEach((textSetup, index) => {
          let text = new Text(textSetup);
          let label = new ex.Label(text.text, w/2, (y - h/2) + (1.6 * (index + 3) * text.fontSize));
          label.fontSize = text.fontSize;
          label.color = text.color;
          label.textAlign = ex.TextAlign.Center;
          this._labels.push(label);
          this.add(label);
      });
    }
}

class Text {
    public text: string;
    public fontSize: number;
    public color: ex.Color;

    /**
     * Setup param can be a simple string, then default fontSize and -color are applied.
     * If it's an object; text, fontsize and color will be taken from it, if available.
     * 
     * @param textObj string/object
     */
    constructor(textObj: any) {
        this.text = textObj && textObj.text ? textObj.text : typeof textObj === "string" ? textObj : "";
        this.fontSize = textObj && textObj.fontSize ? textObj.fontSize : 24;
        this.color = textObj && textObj.color ? textObj.color : ex.Color.Black;
    }
}