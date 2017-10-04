declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {Config} from "../config/Config";
import {Levels} from "../config/Levels";
import {AudioManager} from "../AudioManager";

export class MainMenu extends ex.Scene {

    private _introButton: Button;
    private _startButton: Button;
    private _optionsButton: Button;
    private _creditsButton: Button;  

    constructor(engine: ex.Engine) {
        super(engine);
        
        let buttonPos = Config.GAME.UI.BUTTONS.POSITIONS;

        this._introButton = new Button(
            Pos.make(buttonPos.center_1),
            "Intro",
            () => {globals.startCutscene();}
        );

        this._startButton = new Button(
            Pos.make(buttonPos.center_2),
            "Start",
            () => {globals.startGame();}
        );

        this._optionsButton = new Button(
            Pos.make(buttonPos.center_3),
            "Options",
            () => {globals.optionsScene();}
        );

        this._creditsButton = new Button(
            Pos.make(buttonPos.center_4),
            "Credits",
            () => {globals.credits();}
        )

        this.add(this._introButton);
        this.add(this._startButton);
        this.add(this._optionsButton);
        this.add(this._creditsButton);

        if (Config.GAME.DEBUG) {
            Levels.MAPS.forEach((map, index) => {
              this.add(new Button(
                Pos.make(Config.GAME.UI.BUTTON_WIDTH/2, Config.GAME.UI.BUTTON_HEIGHT/2 + index * 50),
                map.NAME,
                () => globals.loadNextLevel(map.NAME) ));
            });
        }
    }

    onActivate () {
        AudioManager.play("Sound_Intro", true);
    }

    onDeactivate () {
        AudioManager.stop("Sound_Intro");
    }
}
