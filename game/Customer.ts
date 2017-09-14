declare var globals: any;
import * as ex from "excalibur";
import { Food } from "./Food";
import { AbstractPlayer } from "./AbstractPlayer";
import { ScoreCounter } from "./ScoreCounter";
import { Cassa } from "./Cassa";
import { MoneyEffect } from "./Effects";

export class Customer extends AbstractPlayer {
  public wants: Food;
  public name: string;
  private _hasDecided: boolean;
  private _hasReceivedItem: boolean;
  private _thinkBubble: ThinkBubble;
  private _scoreCounter: ScoreCounter;
  private _cassa: Cassa;
  private _patience: number;
  private _patienceDecreaseTimer: ex.Timer;
  private _patienceIndicator: PatienceIndicator;
  private _initialX:number;
  private _initialY:number;

  constructor(x, y, cassa: Cassa) {
    super(x, y,
      globals.conf.CUSTOMER_WIDTH,
      globals.conf.CUSTOMER_HEIGHT,
      globals.conf.CUSTOMER_SPEED);

    this._initialX = x;
    this._initialY = y;

    this.name = globals.conf.CUSTOMER_NAMES[Math.floor(Math.random() * globals.conf.CUSTOMER_NAMES.length)];
    this._hasDecided = false;
    this._hasReceivedItem = false;

    // TODO: maybe via events..
    this._scoreCounter = globals.scoreCounter;

    this._cassa = cassa;

    this._patience = globals.conf.CUSTOMER.INITIAL_PATIENCE;
    
    this.collisionType = ex.CollisionType.Passive;
    
    let goal = this._cassa.getLastPositionInQueue();
    
    this.actions
    .moveTo(goal.x, goal.y, this._speed)
    .callMethod(() => {
      // Leave Queue if it's full
      if (this._cassa.addToQueue(this)) {
        this._decideOnProduct();
      } else {
        this.leaveStore();
      }
    });
  }
  
  private _decideOnProduct(): void {
    // TODO: maybe wait with deciding for a bit
    this.wants = this._getRandomFood();
    this._hasDecided = true;
    
    this._patienceIndicator = new PatienceIndicator(this.pos.x, this.pos.y, this._patience);
    this._thinkBubble = new ThinkBubble(this.pos.x + globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X, this.pos.y - globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X, this.wants);

    this.scene.add(this._patienceIndicator);
    this.scene.add(this._thinkBubble);

    this._patienceDecreaseTimer = new ex.Timer(() => {
      this._patience -= globals.conf.CUSTOMER.PATIENCE_DELTA;
      if (this._patience <= 0) {
        this._cassa.ranOutOfPatience(this);
        this.leaveStore();
      } else {
        this._patienceIndicator.setPatience(this._patience);
      }
    }, globals.conf.CUSTOMER.PATIENCE_DECREASE_INTERVAL, true);

    this.scene.add(this._patienceDecreaseTimer);
  }

  public kill(): void {
    // Because thinkBubble was added to scene we have to go and kill it. (TODO - maybe look into that... y u no "this.add()"?)
    if (this._thinkBubble) {
      this._thinkBubble.kill();
    }
    if (this._patienceDecreaseTimer) {
      this._patienceDecreaseTimer.cancel();
    }
    if (this._patienceIndicator) {
      this._patienceIndicator.kill();
    }
    super.kill();
  }

  public giveItem():void {
    this._hasReceivedItem = true;
    this.leaveStore();
  }

  public moveInQueue(goal:ex.Vector):void {
    this.actions.moveTo(goal.x, goal.y, this._speed);
  }

  /**
   * Remove the thinkBubble/timer, do the KA-CHING and move to the door and die.
   */
  public leaveStore(): void {
    if (this._thinkBubble) {
      this._thinkBubble.kill();
    }

    if (this._patienceDecreaseTimer) {
      this._patienceDecreaseTimer.cancel();
    }

    if (this._hasReceivedItem) {
      this._moneymoneymoney();
    }

    this.actions
      .moveTo(this._initialX, this._initialY, this._speed)
      .callMethod(this.kill);
  }

  private _moneymoneymoney(): void {
    if (this._patience === 0) {
      return;
    }

    // earned score per customer depends on the patience they had left
    this._scoreCounter.updateScore(globals.conf.SCORE.VALUE_OF_SERVING * this._patience / globals.conf.CUSTOMER.INITIAL_PATIENCE);

    // Some fancy KA-CHING stuff
    this.scene.add(new MoneyEffect(this.pos.x, this.pos.y));
  }

  getPlayerColor(): string {
    // Disallow chosen player color for customers
    let availablePlayers = globals.conf.PLAYER_TYPES.filter(type => type.color !== globals.currentLevelOptions.playerColor);
    let randomIndex = Math.floor(Math.random() * availablePlayers.length);

    return availablePlayers[randomIndex].color;
  }

  _updateChildren(): void {
    if (this._hasDecided) {
      // update thinkBubble's position if not standing still, if it exists
      this._thinkBubble.pos.x = this.pos.x + globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X;
      this._thinkBubble.pos.y = this.pos.y - globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_Y;
    }

    if(this._patienceIndicator) {
      this._patienceIndicator.pos = this.pos;
    }
  }

  _handleIdlePlayer(): void {
    this.setDrawing("idle");
  }

  private _getRandomFood(): Food {
    let foods = globals.currentLevelOptions.setup.FOODS;
    let randomFood = foods[Math.floor(Math.random() * foods.length)];

    return new Food(randomFood);
  }
}

class ThinkBubble extends ex.UIActor {
  private _wants: Food;
  constructor(x, y, wants: Food) {
    super(x, y, globals.conf.CUSTOMER.THINKBUBBLE.WIDTH, globals.conf.CUSTOMER.THINKBUBBLE.HEIGHT);
    this._wants = wants;
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = globals.conf.CUSTOMER.THINKBUBBLE.SPRITE[this._wants.name];
    let tex = globals.resources.TextureBubbles;
    let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

    let scale_x = globals.conf.CUSTOMER.THINKBUBBLE.WIDTH  / conf.w;
    let scale_y = globals.conf.CUSTOMER.THINKBUBBLE.HEIGHT / conf.h;

    sprite.scale.setTo(scale_x, scale_y);
    this.addDrawing( sprite );
  }
}

class PatienceIndicator extends ex.UIActor {
  private _patience: number;
  private _patienceInitial: number;
  private _colors: any;

  constructor(x, y, initialPatience: number) {
    super(x, y, 20, 5);

    this._patience = initialPatience;
    this._patienceInitial = initialPatience;

    this._setColor();
  }

  public setPatience(patience:number) {
    this._patience = patience;
  }

  public update(engine: ex.Engine, delta: number): void {
    super.update(engine, delta);

    this._setColor();
  }

  private _setColor():void {
    // 50%+ Green
    // 25%+ Orange
    //  0%+ Red
    if (this._patience >= this._patienceInitial/2) {
      this.color = ex.Color.Green;
    } else if (this._patience >= this._patienceInitial/4) {
      this.color = ex.Color.Orange;
    } else {
      this.color = ex.Color.Red;
    }
  }
}