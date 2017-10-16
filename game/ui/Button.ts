import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class Pos {
    static make(obj:any, y?:number) {
        return new Pos(obj, y);
    }

    x: number;
    y: number;

    constructor(obj:any, y?:number) {
        if (typeof obj === "number" && y) {
            this.x = obj;
            this.y = y;
        } else {
            this.x = obj.X ? obj.X : obj.x;
            this.y = obj.Y ? obj.Y : obj.y;
        }
    }
}

export class Button extends ex.UIActor {
    constructor(position: Pos,
                public text: string,
                public action: () => void,
                w = Config.GAME.UI.BUTTON_WIDTH,
                h = Config.GAME.UI.BUTTON_HEIGHT,
                sprite = Resources.ImgButton.asSprite()) {

        super(position.x, position.y, w, h);

        this.anchor.setTo(.5, .5);

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
        label.pos.setTo(0, h/4);
        this.add(label);
        
        this.off("pointerup", this.action);
        this.on("pointerup", () => this.action());
    }
}