declare var globals: any;
import * as ex from "excalibur";
import {ScoreCounter} from "./Timer";

export class Director {
    private _currentLevelName: string;
    private _levelData: any;
    private _dynamicData: any;
    private _currentScore: number;

    private _scoreDisplay: ScoreCounter;

    constructor(mapName: string, scoreCounter: ScoreCounter) {
        this.loadLevel(mapName);
        this._currentScore = 0;
        this._dynamicData = {};

        this._scoreDisplay = scoreCounter;
    }

    loadLevel(levelIdentifier:string) {
        this._currentLevelName = levelIdentifier;
        
        let levelArray = globals.conf.MAPS.filter(map => map.NAME === this._currentLevelName);

        if(levelArray.length === 1) {
            this._levelData = levelArray[0];
        } else {
            console.warn(`Level ${levelIdentifier} doesn't exist!`);
        }
    }

    getLevelData(): any {
        return this._levelData;
    }

    getScore(): number {
        return this._currentScore;
    }

    addPoints(points: number): number {
        this._currentScore += points;
        this._scoreDisplay.updateScore(this._currentScore);
        return this._currentScore;
    }

    getDynamicData(): any {
        return this._dynamicData;
    }

    exitLevel():void {
        this._scoreDisplay.resetState();
    }
}