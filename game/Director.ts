declare var globals: any;
import * as ex from "excalibur";
import {ScoreCounter, Timer} from "./Timer";

export class Director {
    private _currentLevelName: string;
    private _levelData: any;
    private _dynamicData: any;
    private _currentScore: number;
    private _isTimeRunning: boolean;

    private _scoreDisplay: ScoreCounter;
    private _timer: Timer;

    constructor(mapName: string, scoreCounter: ScoreCounter, timer: Timer) {
        this.loadLevel(mapName);

        this._currentScore = 0;
        this._isTimeRunning = false;
        this._dynamicData = {};

        this._scoreDisplay = scoreCounter;
        this._timer = timer;
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
    
    startLevel() {
        this.startTime();
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

    isTimeRunning():boolean {
        return this._isTimeRunning;
    }

    startTime(): void {
        this._isTimeRunning = true;
        this._timer.setTimer(this.getLevelData().DURATION_S);
        this._timer.resetState();
    }

    continueTime(): void {
        this._isTimeRunning = true;
        this._timer.continue();
    }

    pauseTime(): void {
        this._isTimeRunning = false;
        this._timer.pause();
    }
}