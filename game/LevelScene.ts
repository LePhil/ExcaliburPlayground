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

export class LevelScene extends ex.Scene {
  // crude object to represent some major properties of the level
  public levelOptions:object;

  private _player:Player;
  private _timer:Timer;
  private _scoreCounter:ScoreCounter;
  private _customerSpawner:CustomerSpawner;

  constructor(engine: ex.Engine) {
    super(engine);

    this.add(new LevelMap("Map_00"));

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

    this._customerSpawner = new CustomerSpawner(500, 520, 200, 20, ex.Color.White);
    this.add(this._customerSpawner);

    let blob = new Blob(550, 50);
    this.add(blob);

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
    this._customerSpawner.resetState();
  }

  onDeactivate () {
  }
}
