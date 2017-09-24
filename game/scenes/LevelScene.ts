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
import {Director} from "../Director";

export class LevelScene extends ex.Scene {
  // crude object to represent some major properties of the level
  public levelOptions:object;

  public director: Director;

  private _player:Player;
  private _timer:Timer;
  private _scoreCounter:ScoreCounter;
  private _door:Door;
  private _cassa:Cassa;

  constructor(engine: ex.Engine, director: Director) {
    super(engine);

    this._scoreCounter = new ScoreCounter();
    this.add(this._scoreCounter);

    this._timer = new Timer();
    this.add(this._timer);

    this.director = director;
    director.loadLevelData("Map_00");
    director.addDisplays(this._scoreCounter, this._timer);
    let setup = this.director.getLevelData();

    this.add( new LevelMap(setup) );

    this._cassa = new Cassa(setup.CASSA.X, setup.CASSA.Y);
    this.add(this._cassa);

    this._door = new Door(setup.DOOR.X, setup.DOOR.Y, this._cassa, setup.DOOR.SPAWN_TIME_S, this.director);
    this.add(this._door);

    // Food Stations
    setup.STATIONS.PLACEMENTS.forEach(placement => {
      let foodStation = new FoodStation(placement.X, placement.Y, placement.T);
      this.add(foodStation);

      if (setup.STATIONS.DECAY) {
        this.director.addStation(foodStation);
      }
    });

    let inv = new Inventory();
    this.add(inv);
    
    // TODO: director should spawn blob/start the timer
    // Add a blob after a random time, the latest at half of the game time is over
    if (setup.BLOB) {
      setTimeout(() => {
        this.add(new Blob(this.director));
      }, ex.Util.randomIntInRange(0, setup.DURATION_S*1000/2));
    }
    
    this.add(new ConsumableTool(200, 200, "cup"));
    this.add(new PickuppableTool(200, 250, "hammer"));
    this.add(new PickuppableTool(200, 300, "bone"));
    
    this._player = new Player(inv);
    globals.player = this._player;
    this.add(this._player);
    
  }

  onInitialize(engine: ex.Engine) {
  }
  
  onActivate () {
    this.director.loadLevelData("Map_00");
    this._player.resetState();
    this.director.startLevel();
  }
  
  onDeactivate () {
    this._door.close();
    this._cassa.resetState();
  }

  private _gatherLevelOptions():any {
    let conf = Levels.MAPS[0];
    return {setup: conf};
  }

  update(engine: ex.Engine, delta: number) {
    super.update(engine, delta);

    if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
      globals.startMenu();
    }
  }
}
