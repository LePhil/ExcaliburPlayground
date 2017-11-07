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

    addMin(nrOfMinutes: number): void {
        this.m += nrOfMinutes;
        
        if (this.m >= 60) {
            this.addHrs((this.m - (this.m % 60) ) / 60);
            this.m %= 60;
        }
    }

    addHrs(nrOfHours: number): void {
        this.h += nrOfHours;

        if (this.h >= 24) {
            this.h %= 24;
        }
    }

    getString(): string {
        return (this.h < 10 ? "0" : "") + this.h + (this.m < 10 ? "0" : "") + this.m;
    }

    isGreaterOrEqual(other: Time): boolean {
        return this.h > other.h || (this.h === other.h && this.m >= other.m);
    }

    inMinutes(): number {
        return this.h * 60 + this.m;
    }
}

export class Clock extends ex.UIActor {
    private _startTime:Time;
    private _endTime: Time;
    private _currentTime: Time;
    private _interval: number;

    private _digits:Array<Digit>;
    private _internalTimer: ex.Timer;
    private _callback: () => void;

    constructor(start = "08:00",
                end = "17:00",
                duration = 60,
                callback?: () => void ) {

        super(Config.TIMER.X,
              Config.TIMER.Y);

        this.setTimer(start, end, duration, callback);
        this._digits = new Array<Digit>();
    }

    onInitialize(engine: ex.Engine): void {
        super.onInitialize(engine);

        // :
        let colonX = this.pos.x + Config.TIMER.CLOCK.OFFSET_X + 1.65 * Config.DIGIT_WIDTH;
        let colonY = this.pos.y + Config.TIMER.CLOCK.OFFSET_Y;
        let colon = new ex.UIActor(colonX, colonY);
        let colonConf = Config.HUD.hud_colon;
        colon.addDrawing(new ex.Sprite(Resources.HUDSpriteSheet, colonConf.x, colonConf.y, colonConf.w, colonConf.h));
        this.scene.add(colon);

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

        this.updateDisplay();
    }

    updateDisplay(): void {
        let timeStr = this._currentTime.getString();

        this._digits.forEach((digit, i) => {
            digit.setDigit( +(timeStr.charAt(i)) );
        });
    }

    resetState(): void {
        this._currentTime = this._startTime;

        if (this._internalTimer) {
            this._internalTimer.reset(this._interval);
        } else {
            this._internalTimer = new ex.Timer(() => {
                this._currentTime.addMin(1);
                if (this._currentTime.isGreaterOrEqual(this._endTime)) {
                    if (this._callback) {
                      this._callback();
                    }
                }
                this.updateDisplay();
          }, this._interval, true);

          this.scene.add(this._internalTimer);
        }
    }

    setTimer(start = "08:00",
             end = "17:00",
             duration = 60,
             callback?: () => void): void {

        this._startTime = Time.convert(start);
        this._currentTime = Time.convert(start);
        this._endTime = Time.convert(end);
        this._interval = this._calculateInterval(duration, this._startTime, this._endTime);
        this._callback = callback;
    }

    /**
     * Calculate the interval needed for the timer in ms from the provided
     * start and end time and the duration.
     * Example: Start = 08:00, End = 12:00
     * --> 4 hours in total = 240 minutes in game-time.
     * With a duration of 60 seconds real time that means every real second (240/60) = 4 minutes should pass 
     * OR we have to update the minute display 240 times in 60 seconds = every 250ms --> interval = 250
     * 
     * Quick check:
     * 240 Game Minutes in 60 Seconds
     * 240 Updates,       once a second => 240 real seconds (Interval = 1000)
     * 240 Updates,      twice a second => 120 real seconds (Interval = 500)
     * 240 Updates, four times a second =>  60 real seconds (Interval = 250) Correct.
     * @param duration 
     * @param start 
     * @param end 
     */
    _calculateInterval(duration: number, start: Time, end: Time): number {
        let gameMinutes = end.inMinutes() - start.inMinutes();
        return duration / gameMinutes * 1000;
    }
}