declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

export class Customer extends ex.Actor {
  public wants:Food;
  name: string;
  private _speed: number;
  private _hasDecided: boolean;
  private _thinkBubble: ThinkBubble;

  private _lastPosX: number;
  private _lastPosY: number;

  constructor(x, y, wants = new Food()) {
    // TODO: create parent class for player and customer
    super(globals.conf.DOOR_POS_X,
          globals.conf.DOOR_POS_Y,
          globals.conf.CUSTOMER_WIDTH,
          globals.conf.CUSTOMER_HEIGHT,
          wants.color);

    this._speed = globals.conf.CUSTOMER_SPEED;
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

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;
  }

  public leaveStore() {
    this._thinkBubble.kill();

    this.actions
      .moveTo(
        globals.conf.DOOR_POS_X,
        globals.conf.DOOR_POS_Y,
        this._speed)
      .callMethod( () => { this.kill(); } );
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(globals.resources.TexturePlayers, 7, 8, 128, 256);

    let myType = globals.conf.PLAYER_TYPES[Math.floor(Math.random()*globals.conf.PLAYER_TYPES.length)];
    let scale = globals.conf.SPRITE_SCALE;
    let speed = globals.conf.SPRITE_ANIM_SPEED;

    let walkRightAnim = spriteSheet.getAnimationByIndices(engine, myType.coords.walkR, speed);
    walkRightAnim.loop = true;
    walkRightAnim.scale.setTo(scale, scale);
    this.addDrawing("walkRight", walkRightAnim);

    let walkLeftAnim = spriteSheet.getAnimationByIndices(engine, myType.coords.walkR, speed);
    walkLeftAnim.loop = true;
    walkLeftAnim.flipHorizontal = true;
    walkLeftAnim.scale.setTo(scale, scale);
    this.addDrawing("walkLeft", walkLeftAnim);

    let idleSprite = spriteSheet.getSprite(myType.coords.idle);
    idleSprite.scale.setTo(scale, scale);
    this.addDrawing("idle", idleSprite);

    let walkUpAnim = spriteSheet.getAnimationByIndices(engine, myType.coords.walkUp, speed);
    walkUpAnim.loop = true;
    walkUpAnim.scale.setTo(scale, scale);
    this.addDrawing("walkUp", walkUpAnim);

    let pickUpSprite = spriteSheet.getSprite(myType.coords.pick);
    pickUpSprite.scale.setTo(scale, scale);
    this.addDrawing("pickUp", pickUpSprite);

    // TODO: down anim not included in spritesheet :(
    this.addDrawing("walkDown", idleSprite);

    this.setDrawing("idle");
  }

  public update(engine: ex.Engine, delta: number): void {
     super.update(engine, delta);

     let xMovement = this._lastPosX - this.pos.x;
     let yMovement = this._lastPosY - this.pos.y

     if (Math.abs(xMovement) > Math.abs(yMovement) ) {
       if (xMovement > 0) {
         this.setDrawing("walkLeft");
       } else if (xMovement < 0) {
         this.setDrawing("walkRight");
       }
     } else {
       if (yMovement > 0) {
         this.setDrawing("walkUp");
       } else if (yMovement < 0) {
         this.setDrawing("walkDown");
       }
     }

     if (yMovement === 0 && xMovement === 0) {
       this.setDrawing("idle");
     } else {
       this._updateChildren();
     }

     this._lastPosX = this.pos.x;
     this._lastPosY = this.pos.y;
  }

  private _updateChildren() {
    if (this._hasDecided) {
      // update thinkBubble's position if not standing still, if it exists
      this._thinkBubble.pos.x = this.pos.x;
      this._thinkBubble.pos.y = this.pos.y;
    }
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
