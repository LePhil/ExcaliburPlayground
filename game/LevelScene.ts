declare var globals: any;
import * as ex from "excalibur";
import {Player} from "./Player";
import {Inventory} from "./Inventory";
import {Timer} from "./Timer";
import {ScoreCounter} from "./ScoreCounter";
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

    this.add(new LevelMap(globals.currentLevelOptions.setup));

    this._cassa = new Cassa(250, 500);
    this.add(this._cassa);

    this._door = new Door(globals.currentLevelOptions.setup.DOOR_X, globals.currentLevelOptions.setup.DOOR_Y, this._cassa);
    this.add(this._door);

    // Food Stations
    this.add(new FoodStation(700, 500, "giraffe"));
    this.add(new FoodStation(300, 300, "elephant"));
    this.add(new FoodStation(600, 300, "rabbit"));

    let inv = new Inventory();
    this.add(inv);

    this._scoreCounter = new ScoreCounter(300, 30);
    globals.scoreCounter = this._scoreCounter;
    this.add(this._scoreCounter);

    this._player = new Player(inv);
    globals.player = this._player;
    this.add(this._player);

    // player moves wherever is clicked - TODO: how to cancel this on "real" targets?
    //game.input.pointers.primary.on("down", (evt: PointerEvent) => {
    //  player.goTo(evt);
    //});

    this.add(new Blob(550, 50));

    this._timer = new Timer(700, 30, globals.conf.GAME.LEVEL_TIME_S);
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
