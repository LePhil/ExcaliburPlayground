declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";

export abstract class AbstractPlayer extends ex.Actor {
  _speed: number;
  private _lastPosX: number;
  private _lastPosY: number;
  private _characterColor: string;

  constructor(x = Config.PLAYER.STARTX,
              y = Config.PLAYER.STARTY,
              w = Config.PLAYER.WIDTH,
              h = Config.PLAYER.HEIGHT,
              s = Config.PLAYER.SPEED) {
    super(x, y, w, h);

    this._speed = s;

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(Resources.TexturePlayers, 7, 8, 128, 256);

    let playerColor = this.getPlayerColor();
    let colorIndex = Config.PLAYER.TYPES.indexOf(Config.PLAYER.TYPES.filter( type => type.color === playerColor )[0]);
    let scale = Config.PLAYER.SPRITE_SCALE;
    let speed = Config.PLAYER.SPRITE_ANIM_SPEED;
    let coords = Config.PLAYER.TYPES[colorIndex].coords;

    let walkRightAnim = spriteSheet.getAnimationByIndices(engine, coords.walkR, speed);
    walkRightAnim.loop = true;
    walkRightAnim.scale.setTo(scale, scale);
    this.addDrawing("walkRight", walkRightAnim);

    let walkLeftAnim = spriteSheet.getAnimationByIndices(engine, coords.walkR, speed);
    walkLeftAnim.loop = true;
    walkLeftAnim.flipHorizontal = true;
    walkLeftAnim.scale.setTo(scale, scale);
    this.addDrawing("walkLeft", walkLeftAnim);

    let idleSprite = spriteSheet.getSprite(coords.idle);
    idleSprite.scale.setTo(scale, scale);
    this.addDrawing("idle", idleSprite);

    let walkUpAnim = spriteSheet.getAnimationByIndices(engine, coords.walkUp, speed);
    walkUpAnim.loop = true;
    walkUpAnim.scale.setTo(scale, scale);
    this.addDrawing("walkUp", walkUpAnim);

    let pickUpSprite = spriteSheet.getSprite(coords.pick);
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
      this._handleIdlePlayer();
    } else {
      this._updateChildren();
    }

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;
  }

  abstract getPlayerColor ():string

  abstract _updateChildren():void

  abstract _handleIdlePlayer():void
}
