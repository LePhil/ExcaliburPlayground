declare var globals: any;
import * as ex from "excalibur";

export class Digit extends ex.UIActor {

    constructor(x:number, y:number, initialDigit = 0) {
        super(x, y);

        for(let i = 0; i <= 9; i++) {
            let conf = globals.conf.HUD["hud_" + i];
            let sprite = new ex.Sprite(globals.resources.HUDSpriteSheet, conf.x, conf.y, conf.w, conf.h);
            this.addDrawing(""+i, sprite);
        }
    
        this.setDigit(initialDigit);
    }

    public setDigit(digit: number) {
        this.setDrawing(""+digit);
    }
}
