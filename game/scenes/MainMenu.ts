declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";
import {Levels} from "../config/Levels";
import {AudioManager} from "../AudioManager";
import {EffectTypes, EffectFactory, Effect} from "../Effects";
import {SimpleDialogue, OptionsDialogue, CustomGameDialogue} from "../ui/HTMLDialogue";

const MAIN_SOUND = "Sound_Intro";

export class MainMenu extends ex.Scene {
    private _startButton: Button;
    private _optionsButton: Button;
    private _creditsButton: Button;
    private _customButton: Button;
    private _menuEffect: Effect;

    private _buttons: Array<Button>;

    constructor(engine: ex.Engine) {
        super(engine);
        
        this._buttons = [];
        let buttonPos = Config.GAME.UI.BUTTONS.POSITIONS;

        let creditDlg = new SimpleDialogue();
        creditDlg.setup(() => {
            creditDlg.hide();
            this._toggleButtons(true);
        });

        let optionsDlg = new OptionsDialogue();
        optionsDlg.setup(
            () => {
                optionsDlg.hide();
                this._toggleButtons(true);
            },
            (muted) => {
                this.onMuteChange(muted);
            }
        );

        let customGameDlg = new CustomGameDialogue();
        customGameDlg.setup(
            () => {
                //TODO: start custom game
                customGameDlg.hide();
            },
            () => {
                customGameDlg.hide();
                this._toggleButtons(true);
            }
        );

        this._startButton = new Button(
            Pos.make(buttonPos.center_1),
            "Start",
            () => {globals.startGame();}
        );

        this._optionsButton = new Button(
            Pos.make(buttonPos.center_2),
            "Options",
            () => {
                optionsDlg.show();
                this._toggleButtons(false);
            }
        );

        this._creditsButton = new Button(
            Pos.make(buttonPos.center_3),
            "Credits",
            () => {
                creditDlg.show();
                this._toggleButtons(false);
            }
        );

        this._customButton = new Button(
            Pos.make(buttonPos.center_4),
            "Custom Game",
            () => {
                customGameDlg.show();
                this._toggleButtons(false);
            }
        );

        this._addBtn(this._startButton);
        this._addBtn(this._optionsButton);
        this._addBtn(this._creditsButton);
        this._addBtn(this._customButton);

        if (Config.GAME.DEBUG) {
            Levels.MAPS.forEach((map, index) => {
                this._addBtn(new Button(
                    Pos.make(Config.GAME.UI.BUTTON.W/2, Config.GAME.UI.BUTTON.H/2 + index * 40),
                    map.NAME,
                    () => globals.loadNextLevel(map.NAME)
                ));
            });

            this._addBtn(new Button(
                Pos.make(900, 100),
                "Debug Level",
                () => {engine.goToScene("debug");}
            ));
        }

        let logo = new ex.UIActor(Config.GAME.WIDTH/2, 100, 570, 202);
        logo.addDrawing(Resources.Logo);
        logo.anchor.setTo(.5, .5);
        this.add(logo);

        // JINGLE BELLS JINGLE BELLS JINGLE ALL THE WAY
        this._menuEffect = EffectFactory.Make(EffectTypes.Snow);
        this.add(this._menuEffect);
    }

    onMuteChange(muted: boolean): void {
        if (muted) {
            AudioManager.stop(MAIN_SOUND);
        } else {
            AudioManager.play(MAIN_SOUND, true);        
        }
    }

    onActivate () {
        AudioManager.play(MAIN_SOUND, true);
    }

    onDeactivate () {
        AudioManager.stop(MAIN_SOUND);
    }

    private _addBtn(btn: Button): void {
        this.add(btn);
        this._buttons.push(btn);
    }

    private _toggleButtons(on: boolean): void {
        this._buttons.forEach(button => {
            button.enableCapturePointer = on;
        });
    }
}
