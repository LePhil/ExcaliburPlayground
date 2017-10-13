import * as ex from "excalibur";
import {Levels} from "../config/Levels";
import {Player} from "../Player";
import {Inventory} from "../Inventory";
import {Clock, Timer, ScoreCounter} from "../Timer";
import {Blob} from "../Blob";
import {FoodStation} from "../FoodStation";
import {Food} from "../Food";
import {Customer} from "../Customer";
import {LevelMap} from "../LevelMap";
import {Door} from "../Door";
import {Cassa} from "../Cassa";
import {ToolFactory, Tool, ConsumableTool, PickuppableTool} from "../Tools";
import {Config} from "../config/Config";

export class LevelScene extends ex.Scene {
    private _setup: any;
    private _currentScore: number = 0;
    private _player:Player;
    private _timeDisplay:Clock;
    private _scoreDisplay:ScoreCounter;
    private _door:Door;
    private _cassa:Cassa;
    private _tools: Array<Tool> = [];
    private _stations: Array<FoodStation> = [];
    private _decayTimer: ex.Timer;
    private _callbackOnTimerEnded: (results: number) => void;

    private _levelMap: LevelMap;

    constructor(engine: ex.Engine) {
        super(engine);

        this._scoreDisplay = new ScoreCounter();
        this.add(this._scoreDisplay);

        // TODO: countdown-style timer or Clock-style timer? depends on level config, of course!
        //this._timeDisplay = new Timer();
        this._timeDisplay = new Clock();
        this.add(this._timeDisplay);

        let inv = new Inventory();
        this.add(inv);
        
        this._player = new Player(inv);
        
        this.add(this._player);
    }

    onInitialize(engine: ex.Engine) {}
    
    onActivate () {
        this._currentScore = 0;

        if (this._player) {
           this._player.checkDrawings();
        }

        if (this._timeDisplay) {
            //this._timeDisplay.setTimer(this._setup.DURATION_S, () => this.onTimerEnded());
            this._timeDisplay.setTimer("08:00", "17:00", () => this.onTimerEnded());
            this._timeDisplay.resetState();
        }
    }
    
    onDeactivate () {
        this._player.resetState();
        this._door.close();
        this._cassa.resetState();

        if (this._decayTimer) {
            this._decayTimer.cancel();
            this.removeTimer(this._decayTimer);
            this._decayTimer = null;
        }
    }

    addPoints(points: number): number {
        this._currentScore += points;

        if (this._scoreDisplay) {
            this._scoreDisplay.updateScore(this._currentScore);
        }

        return this._currentScore;
    }

    private _setupLevelMap(setup: any) {
        if (this._levelMap) {
            this.remove(this._levelMap);
        }

        if (setup.IMG) {
          this._levelMap = new LevelMap(setup);
          this.add( this._levelMap );
        }
    }

    private _setupTools(setup: any): void {
        this._tools.forEach(tool => {
            this.remove(tool);
        });

        this._tools = [];

        if (!setup.TOOLS || !setup.TOOLS.PLACEMENTS) {
            return;
        }

        setup.TOOLS.PLACEMENTS.forEach(placement => {
            let tool = ToolFactory.create(placement.X, placement.Y, placement.T, this._player);
            this.add(tool);
            this._tools.push(tool);
        });
    }

    private _setupStations(setup: any): void {
        this._stations.forEach(station => {
            this.remove(station);
        });

        this._stations = [];

        if (!setup.STATIONS || !setup.STATIONS.PLACEMENTS) {
            return;
        }

        setup.STATIONS.PLACEMENTS.forEach(placement => {
            let foodStation = new FoodStation(placement.X, placement.Y, placement.T, this._player);
            this.add(foodStation);
            this._stations.push(foodStation);
        });

        if (setup.STATIONS.DECAY && this._stations) {
            let decayTimer = new ex.Timer(() => {
                let randomStation = this._stations[ex.Util.randomIntInRange(0, this._stations.length - 1)];
                randomStation.breakDown();
            }, 10000, true);
            this.add(decayTimer);
            this._decayTimer = decayTimer;
        }
    }

    /**
     * If there's a level map, the z index has to be
     * fixed after each game because new actors are
     * spawned on top of it.
     */
    private _setupZIndex() {
        let mapZIndex = 1;

        if (this._levelMap) {
            mapZIndex = this._levelMap.getZIndex();
        }

        this._cassa && this._cassa.setZIndex(mapZIndex + 1);
        this._door && this._door.setZIndex(mapZIndex + 1);
        this._player && this._player.setZIndex(mapZIndex + 10);
    }

    private _setupDisplays(setup: any): void {
        if (this._scoreDisplay) {
            this._scoreDisplay.resetState();
        }
        if (this._timeDisplay) {
            this._timeDisplay.resetState();
        }
    }

    private _setupDoor(setup: any): void {
        if(!this._door) {
            this._door = new Door(setup, this._cassa, results => this.addPoints(results));
            this.add(this._door);
        } else {
            this._door.resetState(setup);
        }
    }

    private _setupCassa(setup: any): void {
        if(!this._cassa) {
            this._cassa = new Cassa(setup.CASSA.X, setup.CASSA.Y, this._player);
            this.add(this._cassa);
        } else {
            this._cassa.pos.x = setup.CASSA.X;
            this._cassa.pos.y = setup.CASSA.Y;
        }
    }

    private _setupBlob(setup: any): void {
        // Add a blob after a random time, the latest at half of the game time is over
        if (setup.BLOB) {
            setTimeout(() => {
                this.add(new Blob(setup, results => this.onBlobDied(results)));
            }, ex.Util.randomIntInRange(0, setup.DURATION_S*1000/2));
        }
    }

    public load(setup: any, callback: (results: number) => void) {
        this._setup = setup;
        this._callbackOnTimerEnded = callback;
        this._setupLevelMap(setup);
        this._setupDisplays(setup);
        this._setupCassa(setup);
        this._setupDoor(setup);
        this._setupTools(setup);
        this._setupStations(setup);
        this._setupBlob(setup);
        this._setupZIndex();
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
          // TODO: rather pause than going back to the menu, but boy is that a lot of work
            engine.goToScene("menu");
        }
    }

    private onTimerEnded() {
        this._callbackOnTimerEnded(this._currentScore);
    }

    private onBlobDied(results) {
        this.addPoints(results);
    }
}
