declare var globals: any;
import * as ex from "excalibur";
import {Button} from "../ui/Button";
import {TextOverlay} from "../ui/TextOverlay";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class PreGameScene extends ex.Scene {

    private _textOverlay: TextOverlay;
    private _button: Button;

    constructor(engine: ex.Engine) {
        super(engine);

        this._textOverlay = new TextOverlay();
        this.add(this._textOverlay);
        
        let pos_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON_WIDTH / 2;
        let pos_y = Config.GAME.HEIGHT - 300;
        
        this._button = new Button(
            pos_x, pos_y,
            "Start",
            () => {}
        );

        this.add(this._button);
    }

    public onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);
    }

    public load(setup: any, callback: () => void) {
      this._textOverlay.setText(setup.INTRO);
      this._button.action = callback;
    }

    onActivate () {}

    onDeactivate () {}
}