declare var globals: any;
import * as ex from "excalibur";
import {Player} from "./Player";
import {Inventory} from "./Inventory";
import {CustomerSpawner} from "./CustomerSpawner";
import {Timer} from "./Timer";
import {ScoreCounter} from "./ScoreCounter";
// TODO: inheritance yo
import {RabbitFoodStation} from "./RabbitFoodStation";
import {ElephantFoodStation} from "./ElephantFoodStation";
import {Blob} from "./Blob";
import {FoodStation} from "./FoodStation";
import {Food} from "./Item";
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
  private _customerSpawner:CustomerSpawner;
  private _door:Door;
  private _cassa:Cassa;

  constructor(engine: ex.Engine) {
    super(engine);

    let conf = globals.conf.MAPS[0];

    this.add(new LevelMap(conf));

    this._cassa = new Cassa(250, 500);
    this.add(this._cassa);

    this._door = new Door(conf.DOOR_X, conf.DOOR_Y, this._cassa);
    this.add(this._door);

    //TODO merge this with map conf
    globals.currentLevelOptions = {};

    let elephantFoodStation = new ElephantFoodStation(300, 300, new Food(globals.conf.ELEPHANTFOOD_NAME, globals.conf.ELEPHANTFOOD_COLOR));
    this.add(elephantFoodStation);

    let rabbitFoodStation = new RabbitFoodStation(600, 300, new Food(globals.conf.RABBITFOOD_NAME, globals.conf.RABBITFOOD_COLOR));
    this.add(rabbitFoodStation);

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

    //this._customerSpawner = new CustomerSpawner(500, 520, 200, 20, ex.Color.White);
    //this.add(this._customerSpawner);

    this.add(new Blob(550, 50));

    this._timer = new Timer(700, 30, globals.conf.GAME.LEVEL_TIME_S);
    this.add(this._timer);
  }

  onInitialize(engine: ex.Engine) {
    globals.currentLevelOptions = {};
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
}
