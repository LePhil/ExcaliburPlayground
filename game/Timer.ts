declare var globals: any;
import * as ex from "excalibur";
import {Digit} from "./Digit";

export class Timer extends ex.UIActor {
  private _count:number;
  private _digits:Array<Digit>;
  private _time:number;
  private _timer:ex.Timer;

  constructor(time:number) {
    super(globals.conf.TIMER.X,
          globals.conf.TIMER.Y,
          globals.conf.TIMER.WIDTH,
          globals.conf.TIMER.HEIGHT);

    this._count = 0;
    this._time = time;
    this._digits = [];
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = globals.conf.TIMER;
    let sprite = globals.resources.ImgClock.asSprite();
    let scaleX = conf.CLOCK.W / 70;
    let scaleY = conf.CLOCK.H / 70;
    sprite.scale.setTo(scaleX, scaleY);
    this.addDrawing(sprite);

    for(let i = 0; i < ("" + this._time).length; i++ ) {
      let xPos = this.pos.x + conf.CLOCK.OFFSET_X + i * globals.conf.DIGIT_WIDTH;
      let yPos = this.pos.y + conf.CLOCK.OFFSET_Y;
      let digit = new Digit(xPos, yPos);
      this._digits.push( digit );
      this.scene.add( digit );
    }
  }

  private _updateDigits():void {
    // Left-Pad with zeros.
    let pad = Array(this._digits.length+1).join("0");
    let timeString = pad.substring(0, pad.length - (""+this._count).length) + this._count;

    this._digits.forEach((digit, i) => {
      digit.setDigit(+timeString[i]);
    });
  }

  private _endGame():void {
    globals.endScreen();
  }

  public resetState():void {
    this._count = 0;
    this.scene.cancelTimer(this._timer);
    this._timer = new ex.Timer(() => {
      this._count++;
      
      if(this._count >= this._time) {
        this._endGame();
        this._count = this._time;
      }
      
      this._updateDigits();
    }, 1000, true);

    // Force redraw
    this._updateDigits();

    this.scene.add(this._timer);
  }
}
