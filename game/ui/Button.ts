declare var globals: any;
import * as ex from "excalibur";

export class Button extends ex.UIActor {
    constructor(sprite: ex.Sprite, hoverSprite: ex.Sprite, public action: () => void, x: number, y: number, w = globals.conf.GAME.UI.BUTTON_WIDTH, h = globals.conf.GAME.UI.BUTTON_HEIGHT) {
      super(x, y, w, h);
  
      this.off("pointerup", this.action);
      this.on("pointerup", this.action);
  
      this.addDrawing("normal", sprite);
      this.addDrawing("hover", hoverSprite);
      this.setDrawing("normal");
  
      this.on("pointerdown", (event) => {
        this.setDrawing("hover");
      });
  
      this.on("pointerup", (event) => {
        this.setDrawing("normal");
      });
    }
  }