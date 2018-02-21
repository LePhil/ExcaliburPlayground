declare var globals: any;
import * as ex from "excalibur";
import {ScoreCounter, CountdownTimer} from "./Timer";
import {Levels} from "./config/Levels";
import {LevelScene} from "./scenes/LevelScene";
import {MapScene, MapSetupObject} from "./scenes/MapScene";
import {Cutscene} from "./scenes/Cutscene";
import {IntroDialogue, OutroDialogue} from "./ui/HTMLDialogue";
import {Storage} from "./Storage";

const introDlg = new IntroDialogue();
const outroDlg = new OutroDialogue();

export class Director {
    /**
     * Creates a new Cutscene, prepares (loads) it and goes to it.
     * Callback = going back to the parent map where the player came from.
     * 
     * @param engine Game object
     * @param setup Setup object for the cutscene
     * @param parentMap Identifier of the parent map's scene
     */
    public static loadAndCreateCutscene(engine: ex.Engine, setup: any, parentMap: string): void {
        let id = "LVL_" + setup.ID;
        let newLevel = new Cutscene(engine);
        engine.addScene(id, newLevel);

        newLevel.load(setup, () => {
            Storage.unlockNextOf(setup.ID);
            engine.goToScene(parentMap);
        });

        engine.goToScene(id);
    }

    /**
     * Loads and creates any kind of level and goes to it directly.
     * 
     * @param engine Game object
     * @param setup Setup object for the cutscene
     * @param parentMap Identifier of the parent map's scene
     */
    public static loadAndCreateLevel(engine: ex.Engine, setup: any, parentMap: string): void {
        if (setup.TYPE === Levels.TYPES.CUTSCENE) {
            Director.loadAndCreateCutscene(engine, setup, parentMap);
            return;
        }

        let sceneID = "LVL_" + setup.ID;
        let newLevel = new LevelScene(engine);
        engine.addScene(sceneID, newLevel);

        if (setup.INTRO) {
            introDlg.setup(setup,
                () => {
                    // Retry
                    introDlg.hide();
                    Director.createLevel(sceneID, newLevel, setup, engine, parentMap);
                    engine.goToScene(sceneID);
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
            Director.createLevel(sceneID, newLevel, setup, engine, parentMap);
            engine.goToScene(sceneID);
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
                    Director.onFinishLevel(engine, setup, parentMap, passed);
                    outroDlg.hide();
                });
                outroDlg.show();
                engine.goToScene("loading");
            } else {
                Director.onFinishLevel(engine, setup, parentMap, passed);
            }

            engine.removeScene(id);
        });
    }

    public static onFinishLevel(engine: ex.Engine, setup: any, parentMapSceneID: string, passed: boolean): void {
        if (passed) {
            Storage.unlockNextOf(setup.ID);
            engine.goToScene(parentMapSceneID);
        } else {
            Director.loadAndCreateLevel(engine, setup, parentMapSceneID);
        }
    }
}
