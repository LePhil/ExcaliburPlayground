declare var globals: any;
import * as ex from "excalibur";
import {Levels} from "../config/Levels";
import {Player} from "../Player";
import {Inventory} from "../Inventory";
import {Timer, ScoreCounter} from "../Timer";
import {Blob} from "../Blob";
import {FoodStation} from "../FoodStation";
import {Food} from "../Food";
import {Customer} from "../Customer";
import {LevelMap} from "../LevelMap";
import {Door} from "../Door";
import {Cassa} from "../Cassa";
import {Tool, ConsumableTool, PickuppableTool} from "../Tools";
import {Config} from "../config/Config";

export class LevelScene extends ex.Scene {
    private _setup: any;
    private _currentScore: number;
    private _player:Player;
    private _timer:Timer;
    private _scoreDisplay:ScoreCounter;
    private _door:Door;
    private _cassa:Cassa;
    private _stations: Array<FoodStation>;
    private _callbackOnTimerEnded: (results: number) => void;

    private _levelMap: LevelMap;

    constructor(engine: ex.Engine) {
      super(engine);

      this._scoreDisplay = new ScoreCounter();
      this.add(this._scoreDisplay);

      this._timer = new Timer();
      this.add(this._timer);

      this._currentScore = 0;

      let inv = new Inventory();
      this.add(inv);

      this._stations = [];
      
      // TODO: set up tools via Level Setup
      this.add(new ConsumableTool(200, 200, "cup"));
      this.add(new PickuppableTool(200, 250, "hammer"));
      this.add(new PickuppableTool(200, 300, "bone"));
      
      this._player = new Player(inv);
      globals.player = this._player;
      this.add(this._player);
    }

    onInitialize(engine: ex.Engine) {}
    
    onActivate () {
      this._currentScore = 0;

      if (this._timer) {
        this._timer.setTimer(this._setup.DURATION_S, () => this.onTimerEnded());
        this._timer.resetState();
      }
    }
    
    onDeactivate () {
      this._player.resetState();
      this._door.close();
      this._cassa.resetState();
    }

    addPoints(points: number): number {
        this._currentScore += points;

        if (this._scoreDisplay) {
            this._scoreDisplay.updateScore(this._currentScore);
        }

        return this._currentScore;
    } 

    public load(setup: any, callback: (results: number) => void) {
      this._setup = setup;
      this._callbackOnTimerEnded = callback;

      if (this._levelMap) {
        this.remove(this._levelMap);
      }
      this._levelMap = new LevelMap(setup);
      this.add( this._levelMap );

      let mapZIndex = this._levelMap.getZIndex();
      
      if(!this._cassa) {
        this._cassa = new Cassa(setup.CASSA.X, setup.CASSA.Y);
        this.add(this._cassa);
      } else {
        this._cassa.pos.x = setup.CASSA.X;
        this._cassa.pos.y = setup.CASSA.Y;
        this._cassa.setZIndex(mapZIndex + 1);
      }

      if(!this._door) {
        this._door = new Door(setup, this._cassa, results => this.addPoints(results));
        this.add(this._door);
      } else {
        this._door.resetState(setup);
        this._door.setZIndex(mapZIndex + 1);
      }

      this._player.setZIndex(mapZIndex + 10);

      if (this._scoreDisplay) {
          this._scoreDisplay.resetState();
      }
      if (this._timer) {
          this._timer.resetState();
      }

      // Food Stations
      this._stations.forEach(station => {
        this.remove(station);
      });
      this._stations = [];
      setup.STATIONS.PLACEMENTS.forEach(placement => {
        let foodStation = new FoodStation(placement.X, placement.Y, placement.T);
        this.add(foodStation);

        if (setup.STATIONS.DECAY) {
          this._stations.push(foodStation);
        }
      });
      
      // Add a blob after a random time, the latest at half of the game time is over
      if (setup.BLOB) {
        setTimeout(() => {
          this.add(new Blob(setup, results => this.onBlobDied(results)));
        }, ex.Util.randomIntInRange(0, setup.DURATION_S*1000/2));
      }
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
          // TODO: rather pause than going back to the menu, but boy is that a lot of work
            globals.startMenu();
        }
    }

    private onTimerEnded() {
      this._callbackOnTimerEnded(this._currentScore);
    }

    private onBlobDied(results) {
      this.addPoints(results);
    }
}
