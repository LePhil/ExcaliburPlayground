declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button, Checkbox} from "../ui/Button";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class CustomGameMenu extends ex.Scene {

    private _startButton: Button;
    private _backButton: Button;
    private _blobCheckBox: Checkbox

    private _settings: any;

    constructor(engine: ex.Engine) {
        super(engine);
        
        let buttonPos = Config.GAME.UI.BUTTONS.POSITIONS;

        this._settings = {
            IMG: "Map_01_first_day",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit", "elephant", "giraffe"],
            ITEMSOURCES: [
                {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                {X: 300, Y: 300, T: "elephant", DECAY: false},
                {X: 600, Y: 300, T: "giraffe",  DECAY: false}
            ],
            TOOLS: [
                {X: 200, Y: 200, T: "cup"},
                {X: 200, Y: 250, T: "hammer"},
                {X: 200, Y: 300, T: "bone"}
            ],
            BLOB: true,
            DURATION_S: 10
        };

        this._startButton = new Button(
            Pos.make(buttonPos.center_1),
            "Start",
            () => {globals.customGame(this._settings);}
        );

        this._blobCheckBox = new Checkbox(
            Pos.make(buttonPos.center_2),
            "Blob",
            () => { this._settings.BLOB = this._blobCheckBox.isChecked(); },
            this._settings.BLOB
        );

        this._backButton = new Button(
            Pos.make(buttonPos.center_4),
            "Back",
            () => {engine.goToScene("menu");}
        );

        this.add(this._startButton);
        this.add(this._backButton);
        this.add(this._blobCheckBox);
    }
}