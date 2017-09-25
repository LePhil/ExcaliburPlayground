declare var globals: any;
import * as ex from "excalibur";
import {ScoreCounter, Timer} from "./Timer";
import {FoodStation} from "./FoodStation";
import {Levels} from "./config/Levels";

export class Director {
    private _currentLevelName: string;
    private _levelData: any;
    private _dynamicData: any;
    private _currentScore: number;
    private _isTimeRunning: boolean;
    private _stations: Array<FoodStation>;

    private _scoreDisplay: ScoreCounter;
    private _timer: Timer;

    constructor() {        
        this._currentScore = 0;
        this._isTimeRunning = false;
        this._dynamicData = {};
    }

    loadLevelData(levelIdentifier:string): any {
        this._currentLevelName = levelIdentifier;
        this._levelData = Levels.getLevel(levelIdentifier);
        return this._levelData;
    }

    addDisplays(scoreCounter: ScoreCounter, timer: Timer) {
        this._scoreDisplay = scoreCounter;
        this._timer = timer;
    }
    
    startLevel() {
        this.startTime();

        if(this.getLevelData().STATIONS.DECAY && this._stations) {
            //let decayTimer = new ex.Timer(() => {
            // TODO: ewwwwwwww
            setTimeout(() => {
                let randomStation = this._stations[ex.Util.randomIntInRange(0, this._stations.length - 1)];
                randomStation.breakDown();
            }, 10000);
            //}, 10000, false);
        }
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

    getScore(): number {
        return this._currentScore;
    }

    addPoints(points: number): number {
        this._currentScore += points;

        if (this._scoreDisplay) {
            this._scoreDisplay.updateScore(this._currentScore);
        }

        return this._currentScore;
    }

    getDynamicData(): any {
        return this._dynamicData;
    }

    exitLevel():void {
        if (this._scoreDisplay) {
            this._scoreDisplay.resetState();
        }
        if (this._timer) {
            this._timer.resetState();
        }
    }

    isTimeRunning():boolean {
        return this._isTimeRunning;
    }

    startTime(): void {
        this._isTimeRunning = true;

        if (this._timer) {
            this._timer.setTimer(this.getLevelData("DURATION_S"), () => { this.onTimeLimitReached(); });
            this._timer.resetState();
        }
    }

    continueTime(): void {
        this._isTimeRunning = true;

        if (this._timer) {
            this._timer.unpause();
        }
    }

    pauseTime(): void {
        this._isTimeRunning = false;

        if (this._timer) {
            this._timer.pause();
        }
    }

    endLevel():void {
        // TODO: eww!
        globals.endScreen();
    }

    onTimeLimitReached() {
        this.endLevel();
    }

    addStation(station: FoodStation): void {
        if (!this._stations) {
            this._stations = [];
        }

        this._stations.push(station);
    }
}