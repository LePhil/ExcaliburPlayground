import * as ex from "excalibur";
import {Digit} from "../Digit";
import {TextOverlay} from "../ui/TextOverlay";
import {Pos, Button} from "../ui/Button";
import {Medal} from "../ui/Medal";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class EndGameScene extends ex.Scene {
    private _textOverlay: TextOverlay;  
    private _digits:Array<Digit>;
    private _button: Button;

    constructor(engine: ex.Engine) {
        super(engine);
    
        this._textOverlay = new TextOverlay();
        this.add(this._textOverlay);
    
        this._digits = new Array<Digit>();
    
        // TODO: different medal, depending on the score
        this.add( new Medal(200, 200, "sun_silver") );
    
        this.add(new Button(
            Pos.make(Config.GAME.UI.BUTTONS.POSITIONS.bottom_l),
            "Back",
            () => { engine.goToScene("menu"); }
        ));

        this._button = new Button(
            Pos.make(Config.GAME.UI.BUTTONS.POSITIONS.bottom_r),
            "Continue",
            () => {}
        );
        this.add(this._button);
    }

    onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);
    }

    onActivate () {}

    onDeactivate () {}

    public load(setup: any, results: number, callback: () => void) {
        if (setup.OUTRO) {
            this._textOverlay.setText(setup.OUTRO);
        } else {
            // TODO: hide instead of showing empty string.
            this._textOverlay.setText([""]);
        }
        this._button.action = callback;
        // only show Next button if there's a next level
        this._button.visible = !!setup.NEXT;

        // Make sure nothing from the previous game is left over
        if(this._digits) {
            this._digits.forEach((digit) => {
                digit.kill();
            });
        }
        
        let pos_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON.W / 2;
        let pos_y = Config.GAME.HEIGHT / 2 - Config.GAME.UI.BUTTON.H;

        let digitStartX = pos_x - 100;
        
        for(let i = 0; i < (""+results).length; i++) {
            let newDigit = new Digit(digitStartX + i*Config.DIGIT_WIDTH, pos_y - 100, +(""+results)[i]);
            this._digits.push(newDigit);
            this.add(newDigit);
        }
    }
}