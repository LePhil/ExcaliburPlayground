declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button, Checkbox, RadioButtonGroup} from "../ui/Button";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class CustomGameMenu extends ex.Scene {

    private _startButton: Button;
    private _backButton: Button;
    private _blobCheckBox: Checkbox;
    private _difficultyRadios: RadioButtonGroup;

    private _difficulties: any;
    private _settings: any;

    constructor(engine: ex.Engine) {
        super(engine);
        
        let buttonPos = Config.GAME.UI.BUTTONS.POSITIONS;

        this._difficulties = {
            easy: {
                items: ["rabbit"],
                sources: [{X: 700, Y: 500, T: "rabbit",   DECAY: false}]
            },
            medium: {
                items: ["rabbit", "elephant"],
                sources: [
                    {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                    {X: 300, Y: 300, T: "elephant", DECAY: false},
                ]
            },
            hard: {
                items: ["rabbit", "elephant", "giraffe"],
                sources: [
                    {X: 700, Y: 500, T: "rabbit",   DECAY: true},
                    {X: 300, Y: 300, T: "elephant", DECAY: true},
                    {X: 600, Y: 300, T: "giraffe",  DECAY: true}
                ]
            }
        };

        this._settings = {
            IMG: "Map_01_first_day",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: [],
            ITEMSOURCES: [],
            TOOLS: [
                {X: 200, Y: 200, T: "cup"},
                {X: 200, Y: 250, T: "hammer"},
                {X: 200, Y: 300, T: "bone"}
            ],
            BLOB: true,
            DURATION_S: 10
        };

        this._startButton = new Button(
            Pos.make(buttonPos.bottom_r),
            "Start",
            () => {globals.customGame(this._settings);}
        );

        this._blobCheckBox = new Checkbox(
            Pos.make(buttonPos.center_2),
            "Blob",
            () => {
                this._settings.BLOB = this._blobCheckBox.isChecked();
            },
            this._settings.BLOB
        );

        this._difficultyRadios = new RadioButtonGroup(
            Pos.make(buttonPos.center_3),
            "Difficulty",
            ["Easy", "Medium", "Hard"],
            () => {
                let difficultyLevel = this._difficultyRadios.getSelection();
                this._setDifficulty(difficultyLevel);
            }
        );

        this._backButton = new Button(
            Pos.make(buttonPos.bottom_l),
            "Back",
            () => {engine.goToScene("menu");}
        );

        this.add(this._startButton);
        this.add(this._backButton);
        this.add(this._blobCheckBox);
        this.add(this._difficultyRadios);

        this._setDifficulty(0);
    }

    private _setDifficulty(difficultyLevel: number): void {
        let items = [],
            sources = [];

        switch (difficultyLevel) {
            case 0:
                items = this._difficulties.easy.items;
                sources = this._difficulties.easy.sources;
                break;
            case 1:
                items = this._difficulties.medium.items;
                sources = this._difficulties.medium.sources;
                break;
            case 2:
                items = this._difficulties.hard.items;
                sources = this._difficulties.hard.sources;
                break;
        }

        this._settings.ITEMSOURCES = sources;
        this._settings.DESIREDITEMS = items;
    }
}