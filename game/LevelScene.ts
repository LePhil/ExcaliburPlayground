declare var globals: any;
import * as ex from "excalibur";
import {Player} from "./Player";
import {Inventory} from "./Inventory";
import {Timer, ScoreCounter} from "./Timer";
import {Blob} from "./Blob";
import {FoodStation} from "./FoodStation";
import {Food} from "./Food";
import {Customer} from "./Customer";
import {LevelMap} from "./LevelMap";
import {Door} from "./Door";
import {Cassa} from "./Cassa";

export class LevelScene extends ex.Scene {
  // crude object to represent some major properties of the level
  public levelOptions:object;

  private _player:Player;
  private _timer:Timer;
  private _scoreCounter:ScoreCounter;
  private _door:Door;
  private _cassa:Cassa;

  constructor(engine: ex.Engine) {
    super(engine);

    // LEVELS! \o/
    globals.currentLevelOptions = this._gatherLevelOptions();
    let setup = this._gatherLevelOptions().setup;

    this.add( new LevelMap(setup) );

    this._cassa = new Cassa(setup.CASSA.X, setup.CASSA.Y);
    this.add(this._cassa);

    this._door = new Door(setup.DOOR.X, setup.DOOR.Y, this._cassa, setup.DOOR.SPAWN_TIME_S);
    this.add(this._door);

    // Food Stations
    setup.STATION_PLACEMENTS.forEach(placement => {
      this.add(new FoodStation(placement.X, placement.Y, placement.T));
    });

    let inv = new Inventory();
    this.add(inv);

    this._scoreCounter = new ScoreCounter();
    globals.scoreCounter = this._scoreCounter;
    this.add(this._scoreCounter);

    this._player = new Player(inv);
    globals.player = this._player;
    this.add(this._player);

    if (setup.BLOB) {
      this.add(new Blob(550, 50));
    }

    this._timer = new Timer(setup.DURATION_S);
    this.add(this._timer);
  }

  onInitialize(engine: ex.Engine) {
    globals.currentLevelOptions = this._gatherLevelOptions();
    globals.currentLevelOptions.score = 0;
    globals.currentLevelOptions.playerColor = this._player.getPlayerColor();
  }

  onActivate () {
    this._player.resetState();
    this._timer.resetState();
    this._scoreCounter.resetState();
  }
  
  onDeactivate () {
    this._door.close();
    this._cassa.resetState();
  }

  private _gatherLevelOptions():any {
    let conf = globals.conf.MAPS[0];
    return {setup: conf};
  }
}
