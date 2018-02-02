declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {Config} from "../config/Config";
import {Graphics} from "../config/Graphics";
import {Resources} from "../config/Resources";
import {Levels} from "../config/Levels";
import {AudioManager} from "../AudioManager";
import {LevelMap} from "../LevelMap";
import {EffectTypes, EffectFactory, Effect} from "../Effects";

export interface AreaSetupObject {
    TITLE: string,
    BACKGROUND: any,
    EFFECT: EffectTypes,
    AUDIO: any,
    LEVELS: Array<MapSetupObject>
}

interface MapSetupObject {
    // determine how the setup object should look
    TITLE: string,
    TYPE: string,
    CONF: {
        IMG: string,
        W: number,
        H: number
    },
    CASSA: {
        X: number,
        Y: number
    },
    DOOR: {
        X: number,
        Y: number,
        SPAWN_TIME_S ?: number
    },
    DESIREDITEMS: Array<string>,
    ITEMSOURCES: Array<any>,
    TOOLS: Array<any>,
    BLOB ?: false,
    TIME ?: any,
    INTRO: Array<string>,
    OUTRO: Array<string>
}

const MAP_AUDIO = "Sound_Intro";

export class MapScene extends ex.Scene {
    private _effect: Effect;
    private _background: LevelMap;
    private _audio: ex.Sound;
    private _buttons: Array<Button>;

    constructor(setup: AreaSetupObject, engine: ex.Engine) {
        super(engine);
        this._buttons = [];

        this._audio = setup.AUDIO;

        if (setup.LEVELS) {
            setup.LEVELS.forEach((level, index) => {
                let lvlBtn = new LevelButton(new ex.Vector(200 + index*100, 200), this._getBtnConf(index+1), () => {
                    console.log(level.TITLE);
                });
                this.add(lvlBtn);
            });
        }
    }

    private _getBtnConf(index): any {
        let nrStr = index.toString();

        if (index <  10) {
            nrStr = "0" + nrStr;
        }

        if (Graphics.MAP["level_" + nrStr]) {
            return Graphics.MAP["level_" + nrStr];
        } else {
            return Graphics.MAP.level_empty;
        }
    }

    onActivate () {
        AudioManager.playAudio(this._audio, true);
    }

    onDeactivate () {
        AudioManager.stopAudio(this._audio);
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

class LevelButton extends ex.UIActor {
    constructor(position: Pos, conf: any,  action: () => void) {
        super(position.x, position.y, conf.w, conf.h);

        let tex = Resources.MapSpriteSheet;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        this.anchor.setTo(.5, .5);
        this.addDrawing(sprite);

        this.on("pointerup", () => action());
    }
}