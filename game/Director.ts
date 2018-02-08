declare var globals: any;
import * as ex from "excalibur";
import {ScoreCounter, CountdownTimer} from "./Timer";
import {Levels} from "./config/Levels";
import {LevelScene} from "./scenes/LevelScene";
import {Cutscene} from "./scenes/Cutscene";
import {IntroDialogue, OutroDialogue} from "./ui/HTMLDialogue";

const introDlg = new IntroDialogue();
const outroDlg = new OutroDialogue();

export class Director {
    private _currentLevelName: string;
    private _levelData: any;
    private _introDlg: IntroDialogue;
    private _outroDlg: OutroDialogue;
    
    private _engine: ex.Engine;
    private _game: LevelScene;
    
    constructor(game: ex.Engine, gameScene: LevelScene) {
        this._engine = game;
        this._game = gameScene;
        this._introDlg = new IntroDialogue();
        this._outroDlg = new OutroDialogue();
    }

    loadLevelData(levelIdentifier:string): any {
        this._currentLevelName = levelIdentifier;
        this._levelData = Levels.getLevel(levelIdentifier);
        return this._levelData;
    }

    getLevelData(key?: string): any {
        if(key && this._levelData[key]) {
            return this._levelData[key];
        } else if (key) {
            return null;
        } else {
            return this._levelData;
        }
    }

    // A level set consists of an intro level, a game level and an endgame scene. The director is responsible for creating and switching between these levels.
    public loadLevelSet(mapName: string):void {
        let setup = this.loadLevelData(mapName);
        
        if (setup.INTRO) {
            this._introDlg.setup(
                setup,
                () => this.onIntroYes(),
                () => this.onIntroNope()
            );
            this._introDlg.show();
            this._engine.goToScene("loading");
        } else {
            this._game.load(setup, this.onGameDone);
            this._engine.goToScene("game");
        }
    }

    public loadCustomLevel(settings: any): void {
        this._game.load(settings, () => {
            this._engine.goToScene("menu");
        });
        this._engine.goToScene("game");
    }

    public onIntroYes():void {
        this._introDlg.hide();
        this._game.load(this._levelData, (results, passed) => this.onGameDone(results, passed));
        this._engine.goToScene("game");
    }

    public onIntroNope():void {
        this._introDlg.hide();
        this._engine.goToScene("menu");
    }
    
    /**
     * Once the game is over, open the outro dialogue and switch
     * to a loading scene so that the level scene is not active
     * anymore.
     *
     * @param result Points reached
     * @param passed Passed or not?
     */
    public onGameDone(result: number, passed: boolean): void {
        this._outroDlg.setup(
            this._levelData,
            result,
            passed,
            () => {
                if (passed) {
                    this.onContinue();
                } else {
                    this.onRetry();
                }
                this._outroDlg.hide();
            }
        );
        this._outroDlg.show();

        this._engine.goToScene("loading");
    }

    public onContinue(): void {
        if (this._levelData.NEXT) {
            globals.loadNextLevel(this._levelData.NEXT);
        } else {
            this._engine.goToScene("menu");
        }
    }

    public onRetry(): void {
        globals.loadNextLevel(this._levelData.NAME);
    }

    /**
     * Creates a new Cutscene, prepares (loads) it and goes to it.
     * Callback = going back to the parent map where the player came from.
     * 
     * @param parentMap Identifier of the parent map's scene
     * @param engine Game object
     * @param setup Setup object for the cutscene
     */
    public static loadAndCreateCutscene(parentMap: string, engine: ex.Engine, setup: any): void {
        let id = "LVL_" + (setup.TITLE).split(" ").join("_");
        let newLevel = new Cutscene(engine);
        engine.addScene(id, newLevel);
        newLevel.load(setup, () => {engine.goToScene(parentMap);});
        engine.goToScene(id);
    }

    /**
     * Loads and creates any kind of level and goes to it directly.
     * 
     * @param parentMap Identifier of the parent map's scene
     * @param engine Game object
     * @param setup Setup object for the cutscene
     */
    public static loadAndCreateLevel(parentMap: string, engine: ex.Engine, setup: any): void {
        if (setup.TYPE === Levels.TYPES.CUTSCENE) {
            Director.loadAndCreateCutscene(parentMap, engine, setup);
            return;
        }

        let id = "LVL_" + (setup.TITLE).split(" ").join("_");
        let newLevel = new LevelScene(engine);
        engine.addScene(id, newLevel);

        if (setup.INTRO) {
            introDlg.setup(setup,
                () => {
                    // Retry
                    introDlg.hide();
                    Director.createLevel(id, newLevel, setup, engine, parentMap);
                    engine.goToScene(id);
                },
                () => {
                    // Return to Map
                    introDlg.hide();
                    engine.goToScene(parentMap);
                }
            );
            introDlg.show();
            engine.goToScene("loading");
        } else {
            Director.createLevel(id, newLevel, setup, engine, parentMap);
            engine.goToScene(id);
        }
    }

    /**
     * 
     * @param id ID of the scene 
     * @param newLevel the scene itself
     * @param setup level data 
     * @param engine
     * @param parentMap identifier of the parent map's scene
     */
    public static createLevel(id: string, newLevel: LevelScene, setup: any, engine: ex.Engine, parentMap: string): void {
        newLevel.load(setup, (results: number, passed: boolean) => {

            if (setup.OUTRO) {
                outroDlg.setup(setup, results, passed, () => {
                    if (passed) {
                        engine.goToScene(parentMap);
                    } else {
                        Director.loadAndCreateLevel(parentMap, engine, setup);
                    }
                    outroDlg.hide();
                });
                outroDlg.show();
                engine.goToScene("loading");
            } else {
                engine.goToScene(parentMap);
            }

            engine.removeScene(id);
        });
    }
}
