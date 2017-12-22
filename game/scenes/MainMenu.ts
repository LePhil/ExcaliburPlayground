declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {Config} from "../config/Config";
import {Levels} from "../config/Levels";
import {AudioManager} from "../AudioManager";
import {EffectTypes, EffectFactory, Effect} from "../Effects";

export class MainMenu extends ex.Scene {

    private _startButton: Button;
    private _optionsButton: Button;
    private _creditsButton: Button;
    private _customButton: Button;
    private _menuEffect: Effect;

    constructor(engine: ex.Engine) {
        super(engine);
        
        let buttonPos = Config.GAME.UI.BUTTONS.POSITIONS;

        this._startButton = new Button(
            Pos.make(buttonPos.center_1),
            "Start",
            () => {globals.startGame();}
        );

        this._optionsButton = new Button(
            Pos.make(buttonPos.center_2),
            "Options",
            () => {engine.goToScene("options");}
        );

        this._creditsButton = new Button(
            Pos.make(buttonPos.center_3),
            "Credits",
            () => {engine.goToScene("credits");}
        )

        this._customButton = new Button(
            Pos.make(buttonPos.center_4),
            "Custom Game",
            () => {engine.goToScene("custom");}
        );

        this.add(this._startButton);
        this.add(this._optionsButton);
        this.add(this._creditsButton);
        this.add(this._customButton);

        if (Config.GAME.DEBUG) {
            Levels.MAPS.forEach((map, index) => {
              this.add(new Button(
                Pos.make(Config.GAME.UI.BUTTON.W/2, Config.GAME.UI.BUTTON.H/2 + index * 40),
                map.NAME,
                () => globals.loadNextLevel(map.NAME) ));
            });

            this.add(new Button(
                Pos.make(900, 100),
                "Debug Level",
                () => {engine.goToScene("debug");}
            ));

            this.add(new Button(
                Pos.make(900, 200),
                "Debug Outro",
                () => {engine.goToScene("debug_outro");}
            ));
        }
    }

    onActivate () {
        AudioManager.play("Sound_Intro", true);
        this._menuEffect = EffectFactory.Make(EffectTypes.Snow);
        this.add(this._menuEffect);
    }

    onDeactivate () {
        AudioManager.stop("Sound_Intro");
        this._menuEffect && this._menuEffect.kill();
    }
}
