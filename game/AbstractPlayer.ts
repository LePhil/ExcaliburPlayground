declare var globals: any;
import * as ex from "excalibur";

export abstract class AbstractPlayer extends ex.Actor {
  _speed: number;
  private _lastPosX: number;
  private _lastPosY: number;
  private _characterColor: string;

  constructor(x = globals.conf.PLAYER.STARTX,
              y = globals.conf.PLAYER.STARTY,
              w = globals.conf.PLAYER.WIDTH,
              h = globals.conf.PLAYER.HEIGHT,
              s = globals.conf.PLAYER.SPEED) {
    super(x, y, w, h);

    this._speed = s;

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(globals.resources.TexturePlayers, 7, 8, 128, 256);

    let playerColor = this.getPlayerColor();
    let colorIndex = globals.conf.PLAYER.TYPES.indexOf(globals.conf.PLAYER.TYPES.filter( type => type.color === playerColor )[0]);
    let scale = globals.conf.PLAYER.SPRITE_SCALE;
    let speed = globals.conf.PLAYER.SPRITE_ANIM_SPEED;
    let coords = globals.conf.PLAYER.TYPES[colorIndex].coords;

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
