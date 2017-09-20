declare var globals: any;
import * as ex from "excalibur";
import {Digit} from "./Digit";

class DigitDisplay extends ex.UIActor {
  _digits:Array<Digit>;
  _display: number;
  _nrOfDigits: number;

  constructor(x: number, y: number, nrOfDigits: number, initial = 0) {
    super(x, y);

    this._digits = new Array<Digit>();
    this._display = initial;
    this._nrOfDigits = nrOfDigits;
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    for(let i = 0; i < this._nrOfDigits; i++ ) {
      let xPos = this.pos.x + globals.conf.TIMER.CLOCK.OFFSET_X + i * globals.conf.DIGIT_WIDTH;
      let yPos = this.pos.y + globals.conf.TIMER.CLOCK.OFFSET_Y;
      let digit = new Digit(xPos, yPos);
      this._digits.push( digit );
      this.scene.add( digit );
    }
  }

  _updateDigits():void {
    // Left-Pad with zeros.
    let pad = Array(this._nrOfDigits + 1).join("0");
    let timeString = pad.substring(0, pad.length - (""+this._display).length) + this._display;

    this._digits.forEach((digit, i) => {
      digit.setDigit(+timeString[i]);
    });
  }

  public resetState():void {
    this._display = 0;
    this._updateDigits();
  }
}

export class Timer extends DigitDisplay {
  private _time:number;
  private _timer:ex.Timer;

  constructor(time:number) {
    super(globals.conf.TIMER.X,
          globals.conf.TIMER.Y,
          globals.conf.TIMER.NROFDIGITS);

    this._time = time;
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = globals.conf.TIMER;
    let sprite = globals.resources.ImgClock.asSprite();
    sprite.scale.setTo(conf.CLOCK.W / 70, conf.CLOCK.H / 70);
    this.addDrawing(sprite);
  }

  private _endGame():void {
    globals.endScreen();
  }

  public resetState():void {
    this._display = 0;
    this.scene.cancelTimer(this._timer);
    this._timer = new ex.Timer(() => {
      this._display++;
      
      if(this._display >= this._time) {
        this._endGame();
        this._display = this._time;
      }
      
      this._updateDigits();
    }, 1000, true);

    // Force redraw
    this._updateDigits();

    this.scene.add(this._timer);
  }
}

export class ScoreCounter extends DigitDisplay {

  constructor() {
    super(globals.conf.SCORECOUNTER.X,
          globals.conf.SCORECOUNTER.Y,
          globals.conf.SCORECOUNTER.NROFDIGITS);
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = globals.conf.HUD.hud_coins;
    let sprite = new ex.Sprite(globals.resources.HUDSpriteSheet, conf.x, conf.y, conf.w, conf.h);
    this.addDrawing(sprite);

    this._updateDigits()
  }

  public getScore():number {
    return this._display;
  }

  public updateScore(points:number):void {
    this._display = points;
    
    // Make sure it's not longer than the maximum amount of digits - if so, make it into a bunch of 9s
    if (("" + this._display).length > this._digits.length) {
      this._display = +(Array(this._digits.length+1).join("9"));
    }

    this._updateDigits();
  }
}
