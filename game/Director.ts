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
    /**
     * Creates a new Cutscene, prepares (loads) it and goes to it.
     * Callback = going back to the parent map where the player came from.
     * 
     * @param engine Game object
     * @param setup Setup object for the cutscene
     * @param parentMap Identifier of the parent map's scene
     */
    public static loadAndCreateCutscene(engine: ex.Engine, setup: any, parentMap: string): void {
        let id = "LVL_" + (setup.TITLE).split(" ").join("_");
        let newLevel = new Cutscene(engine);
        engine.addScene(id, newLevel);
        newLevel.load(setup, () => {engine.goToScene(parentMap);});
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
                        Director.loadAndCreateLevel(engine, setup, parentMap);
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
