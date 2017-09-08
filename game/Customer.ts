declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";
import {AbstractPlayer} from "./AbstractPlayer";
import {ScoreCounter} from "./ScoreCounter";
import {CustomerSpawner} from "./CustomerSpawner";

export class Customer extends AbstractPlayer {
  public wants:Food;
  public name: string;
  private _hasDecided: boolean;
  private _thinkBubble: ThinkBubble;
  private _scoreCounter: ScoreCounter;
  private _customerSpawner: CustomerSpawner;
  private _patience: number;
  private _patienceDecreaseTimer: ex.Timer;

  constructor(x, y, wants = new Food(), customerSpawner: CustomerSpawner) {
    super(globals.conf.DOOR_POS_X,
          globals.conf.DOOR_POS_Y,
          globals.conf.CUSTOMER_WIDTH,
          globals.conf.CUSTOMER_HEIGHT,
          globals.conf.CUSTOMER_SPEED);

    this.wants = wants;
    this.name = globals.conf.CUSTOMER_NAMES[Math.floor(Math.random()*globals.conf.CUSTOMER_NAMES.length)];
    this._hasDecided = false;
    // TODO: maybe via events..
    this._scoreCounter = globals.scoreCounter;
    this._customerSpawner = customerSpawner;
    this._patience = globals.conf.CUSTOMER.INITIAL_PATIENCE;

    this.collisionType = ex.CollisionType.Passive;

    this.actions
      .moveTo(globals.conf.DOOR_POS_X, globals.conf.DOOR_POS_Y - 50, this._speed)
      .moveTo(x, globals.conf.DOOR_POS_Y - 50, this._speed)
      .moveTo(x, y, this._speed)
      .callMethod(this._decideOnProduct);
  }

  private _decideOnProduct():void {
    this._thinkBubble = new ThinkBubble(this.pos.x + globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X, this.pos.y - globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X, this.wants);
    this.scene.add(this._thinkBubble);
    // TODO: maybe wait with deciding for a bit
    this._hasDecided = true;

    this._patienceDecreaseTimer = new ex.Timer(() => {
      this._patience -= globals.conf.CUSTOMER.PATIENCE_DELTA;
      if (this._patience <= 0) {
        this._customerSpawner.ranOutOfPatience(this);
      }
    }, globals.conf.CUSTOMER.PATIENCE_DECREASE_INTERVAL, true);

    this.scene.add(this._patienceDecreaseTimer);
  }

  public kill():void {
    // Because thinkBubble was added to scene we have to go and kill it. (TODO - maybe look into that... y u no "this.add()"?)
    if(this._thinkBubble) {
      this._thinkBubble.kill();
    }
    super.kill();
  }

  /**
   * Remove the thinkBubble/timer, do the KA-CHING and move to the door and die.
   */
  public leaveStore():void {
    if (this._thinkBubble) {
      this._thinkBubble.kill();
    }

    if (this._patienceDecreaseTimer) {
      this._patienceDecreaseTimer.cancel();
    }

    this._moneymoneymoney();

    this.actions
      .moveTo(
        globals.conf.DOOR_POS_X,
        globals.conf.DOOR_POS_Y,
        this._speed)
      .callMethod( this.kill );
  }

  private _moneymoneymoney():void {
    if(this._patience === 0) {
      return;
    }

    // earned score per customer depends on the patience they had left
    this._scoreCounter.updateScore( globals.conf.SCORE.VALUE_OF_SERVING * this._patience / globals.conf.CUSTOMER.INITIAL_PATIENCE );

    // Some fancy KA-CHING stuff
    // TODO: sound?
    let emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y, 0, 0);
    emitter.emitterType = ex.EmitterType.Circle;
    emitter.radius = 34;
    emitter.minVel = 41;
    emitter.maxVel = 42;
    emitter.minAngle = 3.6;
    emitter.maxAngle = 5.9;
    emitter.isEmitting = true;
    emitter.emitRate = 10;
    emitter.opacity = 0.4;
    emitter.fadeFlag = true;
    emitter.particleLife = 869;
    emitter.maxSize = 8;
    emitter.minSize = 6;
    emitter.acceleration = new ex.Vector(0, 0);
    emitter.beginColor = ex.Color.Yellow;
    emitter.endColor = ex.Color.Yellow;

    emitter.isEmitting = true;
    this.scene.add(emitter);

    setTimeout(() => {
      emitter.kill();
    }, 500);
  }

  getPlayerColor ():string {
    // Disallow chosen player color for customers
    let availablePlayers = globals.conf.PLAYER_TYPES.filter( type => type.color !== globals.currentLevelOptions.playerColor );
    let randomIndex = Math.floor(Math.random()*availablePlayers.length);

    return availablePlayers[randomIndex].color;
  }

  _updateChildren():void {
    if (this._hasDecided) {
      // update thinkBubble's position if not standing still, if it exists
      this._thinkBubble.pos.x = this.pos.x + globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X;
      this._thinkBubble.pos.y = this.pos.y - globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_Y;
    }
  }

  _handleIdlePlayer():void {
    this.setDrawing("idle");
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
    let spriteSheet = new ex.SpriteSheet(globals.resources.TextureBubbles, 2, 7, globals.conf.CUSTOMER.THINKBUBBLE.SPRITE.WIDTH, globals.conf.CUSTOMER.THINKBUBBLE.SPRITE.HEIGHT);

    // TODO: ugly ugly ugly
    let spriteIndex = 0;
    if (this._wants.name === globals.conf.ELEPHANTFOOD_NAME) {
      spriteIndex = 4;
    } else if (this._wants.name === globals.conf.RABBITFOOD_NAME) {
      spriteIndex = 10;
    }

    let _sprite = spriteSheet.getSprite( spriteIndex );
    let _scale = globals.conf.CUSTOMER.THINKBUBBLE.HEIGHT / globals.conf.CUSTOMER.THINKBUBBLE.SPRITE.HEIGHT;
    _sprite.scale.setTo(_scale, _scale);
    this.addDrawing("normal", _sprite);
    this.setDrawing("normal");
  }
}
