declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {Config} from "../config/Config";
import {Graphics} from "../config/Graphics";
import {Resources} from "../config/Resources";
import {Levels} from "../config/Levels";
import {AudioManager} from "../AudioManager";
import {LevelMap} from "../LevelMap";
import {Director} from "../Director";
import {Storage, SavedLevelData} from "../Storage";
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
    ID: string,
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
    private _buttons: Array<LevelButton>;

    public static createSceneName(setup: AreaSetupObject): string {
        return "AREA_" + setup.TITLE;
    }

    // TODO: on reactivating map scene re-check and unlock buttons that have been unlocked

    constructor(setup: AreaSetupObject, engine: ex.Engine) {
        super(engine);
        this._buttons = [];
        
        let currentMapName = MapScene.createSceneName(setup);
        this._audio = setup.AUDIO;

        if (setup.LEVELS) {
            let levelCounter = 1;
            setup.LEVELS.forEach((level, index) => {

                let lvlBtn = new LevelButton(
                    new ex.Vector(200 + index*100, 200),
                    this._getBtnConf(level.TYPE, levelCounter),
                    () => {
                        let levelData = Storage.getLevelData(level.ID);
                        if (!levelData.locked) {
                            Director.loadAndCreateLevel(engine, level, currentMapName);
                        }
                    },
                    level.ID);

                this._buttons.push(lvlBtn);

                let levelData = Storage.makeSureLevelDataExists(level.ID);
                if(!levelData.locked) {
                    lvlBtn.unlock();
                }
                
                this.add(lvlBtn);

                // Cutscenes shouldn't count towards level #
                if (level.TYPE === Levels.TYPES.NORMAL) {
                    levelCounter++;
                }
            });
        }

        this.add(new Button(
            Pos.make(Config.GAME.UI.BUTTONS.POSITIONS.bottom_r),
            "Back",
            () => { engine.goToScene("menu"); }
        ));
    }

    private _getBtnConf(type: string, index: number): any {
        if (type === Levels.TYPES.CUTSCENE) {
            return Graphics.MAP.level_empty;
        } else {
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
    }

    onActivate () {
        AudioManager.playAudio(this._audio, true);
    }

    onDeactivate () {
        AudioManager.stopAudio(this._audio);
    }
}

class LevelButton extends ex.UIActor {
    public levelId: string;

    constructor(position: Pos, conf: any,  action: () => void, levelId: string) {
        super(position.x, position.y, conf.w, conf.h);

        this.levelId = levelId;

        let tex = Resources.MapSpriteSheet;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        let brokenSprite = sprite.clone();
        brokenSprite.darken(.5);

        this.anchor.setTo(.5, .5);
        this.addDrawing("unlocked", sprite);
        this.addDrawing("locked", brokenSprite);

        this.setDrawing("locked");
        
        this.on("pointerup", () => action());
    }

    public unlock(): void {
        this.setDrawing("unlocked");
    }
}