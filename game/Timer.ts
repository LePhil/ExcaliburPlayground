declare var globals: any;
import * as ex from "excalibur";
import {Digit} from "./Digit";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";

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
      let xPos = this.pos.x + Config.TIMER.CLOCK.OFFSET_X + i * Config.DIGIT_WIDTH;
      let yPos = this.pos.y + Config.TIMER.CLOCK.OFFSET_Y;
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
  private _targetTime:number;
  private _timer:ex.Timer;
  private _callback: () => void;

  constructor(time = 999) {
    super(Config.TIMER.X,
          Config.TIMER.Y,
          Config.TIMER.NROFDIGITS);

    if (time) {
      this._targetTime = time;
    }
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = Config.TIMER;
    let sprite = Resources.ImgClock.asSprite();
    sprite.scale.setTo(conf.CLOCK.W / 70, conf.CLOCK.H / 70);
    this.addDrawing(sprite);
  }

  setTimer(time, callback: () => void):void {
    this._targetTime = time;
    this._callback = callback;
  }

  pause(): void {
    // this._timer.pause();
  }

  unpause(): void {
    // this._timer.unpause();
  }

  public resetState():void {
    this._display = 0;
    this.scene.cancelTimer(this._timer);
    this._timer = new ex.Timer(() => {
      this._display++;
      
      if(this._display >= this._targetTime) {
        this._callback();
        this._display = this._targetTime;
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
    super(Config.SCORECOUNTER.X,
          Config.SCORECOUNTER.Y,
          Config.SCORECOUNTER.NROFDIGITS);
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = Config.HUD.hud_coins;
    let sprite = new ex.Sprite(Resources.HUDSpriteSheet, conf.x, conf.y, conf.w, conf.h);
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

class Time {
  h: number;
  m: number;

  // "12:34" --> 12 hours 43 minutes
  constructor(timeString: string) {
    this.h = +timeString.substr(0, 2);
    this.m = +timeString.substr(3, 2);
  }

  static convert(timeString) {
    return new Time(timeString);
  }
}

export class Clock extends ex.UIActor {
  private _startTime:Time;
  private _endTime: Time;
  private _currentTime: Time;

  private _timeFactor: number;
  private _digits:Array<Digit>;

  private _timer:ex.Timer;
  private _callback: () => void;

  constructor(start = "08:00", end = "17:00", callback: () => void) {
    super(Config.TIMER.X,
          Config.TIMER.Y);

    this._startTime = Time.convert(start);
    this._currentTime = Time.convert(start);
    this._endTime = Time.convert(end);
    this._callback = callback;
    this._digits = new Array<Digit>();
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    for(let i = 0; i < 4; i++ ) {
      let xPos = this.pos.x + Config.TIMER.CLOCK.OFFSET_X + i * Config.DIGIT_WIDTH;
      let yPos = this.pos.y + Config.TIMER.CLOCK.OFFSET_Y;

      if(i >= 2) {
        xPos += 20; // ":" between 2nd and 3rd digit
      }

      let digit = new Digit(xPos, yPos);
      this._digits.push( digit );
      this.scene.add( digit );
    }

    // TODO: add ":" between 2nd and 3rd digit
  }
}