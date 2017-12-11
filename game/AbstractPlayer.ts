import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";
import {Graphics} from "./config/Graphics";

export abstract class AbstractPlayer extends ex.Actor {
  _speed: number;
  private _lastPosX: number;
  private _lastPosY: number;
  private _engine: ex.Engine;
  characterColor: string;

  constructor(x = Config.PLAYER.START.X,
              y = Config.PLAYER.START.Y,
              w = Config.PLAYER.WIDTH,
              h = Config.PLAYER.HEIGHT,
              s = Config.PLAYER.SPEED) {
    super(x, y, w, h);

    this._speed = s;

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;
  }

  onInitialize(engine: ex.Engine): void {
    this.characterColor = this.getPlayerColor();
    this._engine = engine;
    this.setDrawings(this.characterColor);
  }

  protected getSprite(alienType: string, spriteType: string): ex.Sprite {
    let tex = Graphics.ALIENS[alienType].spritesheet;
    let spriteConf = Graphics.ALIENS[alienType][spriteType];
    return new ex.Sprite(tex, spriteConf.x, spriteConf.y, spriteConf.w, spriteConf.h)
  }

  public setDrawings(alienType: string): void {
    if(!Graphics.ALIENS[alienType]) {
      console.warn(`No graphics available for Alien ${alienType}!`);
      return;
    }

    let conf = Graphics.ALIENS[alienType];
    let tex = conf.spritesheet;

    let idleSprite = this.getSprite(alienType, "stand");
    let pickUpSprite = this.getSprite(alienType, "duck");

    let walkRightAnim = new ex.Animation(this._engine, [this.getSprite(alienType, "walk1"), this.getSprite(alienType, "walk2")], this._speed, true);
    let walkLeftAnim = new ex.Animation(this._engine, [this.getSprite(alienType, "walk1"), this.getSprite(alienType, "walk2")], this._speed, true);
    walkLeftAnim.flipHorizontal = true;
    let walkUpAnim = new ex.Animation(this._engine, [this.getSprite(alienType, "climb1"), this.getSprite(alienType, "climb2")], this._speed, true);
    
    this.addDrawing("walkRight", walkRightAnim);
    this.addDrawing("walkLeft", walkLeftAnim);
    this.addDrawing("idle", idleSprite);
    this.addDrawing("walkUp", walkUpAnim);
    this.addDrawing("pickUp", pickUpSprite);
    this.addDrawing("walkDown", idleSprite);
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
        //this.setDrawing("walkDown");
        // Since there's no down-animation, let's use left/right.
        if (xMovement > 0) {
          this.setDrawing("walkLeft");
        } else {
          this.setDrawing("walkRight");
        }
      }
    }

    if (yMovement === 0 && xMovement === 0) {
      this._handleIdlePlayer();
    }

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;
  }

  getPlayerColor ():string {
    let types = Config.CUSTOMER.COLORS;
    let randomIndex = ex.Util.randomIntInRange(0, types.length-1);

    return types[randomIndex];
  }

  abstract _handleIdlePlayer():void
}
