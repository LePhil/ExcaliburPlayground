declare var globals: any;
import * as ex from "excalibur";
import {Director} from "../Director";

export class TextOverlay extends ex.UIActor {
    constructor(text: string,
                director: Director) {

      let w = globals.conf.GAME.UI.OVERLAY.W;
      let h = globals.conf.GAME.UI.OVERLAY.H;

      super(
        (globals.conf.GAME.WIDTH - w) / 2,
        (globals.conf.GAME.HEIGHT - h) / 2,
        w,
        h);

      this.color = ex.Color.White;

      let fontSize = 24;
      let label = new ex.Label(text, w/2, h/2 + fontSize/2);
      label.fontSize = fontSize;
      label.color = ex.Color.Black;
      // TODO: if the text is too long, it'll go over the panel
      label.textAlign = ex.TextAlign.Center;
      this.add(label);

      // TODO: maybe add a button to contine
      
      this.on("pointerup", () => {
        director.onOverlayClose();
        // TODO: killing the uiActor results in errors on the LevelScene.
        this.visible = false;
      });
    }
  }