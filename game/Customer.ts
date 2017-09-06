declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";
import {AbstractPlayer} from "./AbstractPlayer";

export class Customer extends AbstractPlayer {
  public wants:Food;
  public name: string;
  private _hasDecided: boolean;
  private _thinkBubble: ThinkBubble;

  constructor(x, y, wants = new Food()) {
    super(globals.conf.DOOR_POS_X,
          globals.conf.DOOR_POS_Y,
          globals.conf.CUSTOMER_WIDTH,
          globals.conf.CUSTOMER_HEIGHT,
          globals.conf.CUSTOMER_SPEED);

    this.wants = wants;
    this.name = globals.conf.CUSTOMER_NAMES[Math.floor(Math.random()*globals.conf.CUSTOMER_NAMES.length)];
    this._hasDecided = false;

    this.collisionType = ex.CollisionType.Passive;

    this.actions
      .moveTo(globals.conf.DOOR_POS_X, globals.conf.DOOR_POS_Y - 50, this._speed)
      .moveTo(x, globals.conf.DOOR_POS_Y - 50, this._speed)
      .moveTo(x, y, this._speed)
      .callMethod(() => {
        this._thinkBubble = new ThinkBubble(this.pos.x + globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X, this.pos.y - globals.conf.CUSTOMER.THINKBUBBLE.OFFSET_X, this.wants);
        globals.game.add(this._thinkBubble);
        this._hasDecided = true;
      });
  }

  /**
   * Remove the thinkBubble, move to the door and die.
   */
  public leaveStore():void {
    if(this._thinkBubble) {
      this._thinkBubble.kill();
    }

    this._moneymoneymoney();

    this.actions
      .moveTo(
        globals.conf.DOOR_POS_X,
        globals.conf.DOOR_POS_Y,
        this._speed)
      .callMethod( () => { this.kill(); } );
  }

  private _moneymoneymoney():void {
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
    globals.game.add(emitter);

    setTimeout(() => {
      emitter.kill();
    }, 500);
  }

  _getPlayerColorIndex ():number {
    // TODO: maybe disallow chosen player color for customers?
    return Math.floor(Math.random()*globals.conf.PLAYER_TYPES.length);
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
