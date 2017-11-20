declare var globals: any;
import * as ex from "excalibur";
import {ScoreCounter, CountdownTimer} from "./Timer";
import {Levels} from "./config/Levels";

import {PreGameScene} from "./scenes/PreGameScene";
import {LevelScene} from "./scenes/LevelScene";
import {EndGameScene} from "./scenes/EndGameScene";


export class Director {
    private _currentLevelName: string;
    private _levelData: any;

    private _engine: ex.Engine;
    private _intro: PreGameScene;
    private _game: LevelScene;
    private _outro: EndGameScene;

    constructor(game: ex.Engine, introScene: PreGameScene, gameScene: LevelScene, outroScene: EndGameScene) {
        this._engine = game;
        this._intro = introScene;
        this._game = gameScene;
        this._outro = outroScene;
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

    endLevel():void {
        this._engine.goToScene("end");
    }

    onTimeLimitReached() {
        this.endLevel();
    }

    // A level set consists of an intro level, a game level and an endgame scene. The director is responsible for creating and switching between these levels.
    public loadLevelSet(mapName: string):void {
        let setup = this.loadLevelData(mapName);

        if (setup.INTRO) {
            this._intro.load(setup, () => this.onIntroDone());
            this._engine.goToScene("pre");
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

    public onIntroDone():void {
        this._game.load(this._levelData, results => this.onGameDone(results));
        this._engine.goToScene("game");
    }
    
    public onGameDone(result): void {
        this._outro.load(this._levelData, result, () => this.onEndSceneDone());
        this._engine.goToScene("end");
    }

    public onEndSceneDone(): void {
        if (this._levelData.NEXT) {
            globals.loadNextLevel(this._levelData.NEXT);
        } else {
            this._engine.goToScene("menu");
        }
    }


}