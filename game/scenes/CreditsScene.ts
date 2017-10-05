import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {TextOverlay} from "../ui/TextOverlay";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class CreditsScene extends ex.Scene {

    private _textOverlay: TextOverlay;
    private _button: Button;

    constructor(engine: ex.Engine) {
        super(engine);

        this._textOverlay = new TextOverlay();
        this.add(this._textOverlay);

        this._textOverlay.setText([
            "Music",
            "'WHIMSICAL POPSICLE'",
            "by Eric Matyas",
            "soundimage.org",
            "",
            "Sound Effects",
            "soundbible.com",
            "",
            "Graphics",
            "kenney.nl"
        ]);
        
        let pos_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON_WIDTH / 2;
        let pos_y = Config.GAME.HEIGHT - 300;
        
        this.add(new Button(
            Pos.make(Config.GAME.UI.BUTTONS.POSITIONS.bottom_l),
            "Back",
            () => { engine.goToScene("menu"); }
        ));
    }
}