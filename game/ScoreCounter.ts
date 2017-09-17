declare var globals: any;
import * as ex from "excalibur";
import {Digit} from "./Digit";

// TODO: extract digit-changing-logic from here and Timer to Parent class...
export class ScoreCounter extends ex.UIActor {
  private _score:number;
  private _digits:Array<Digit>;

  constructor() {
    super(globals.conf.SCORECOUNTER.X, globals.conf.SCORECOUNTER.Y);

    this._score = 0;
    this._digits = [];
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = globals.conf.HUD.hud_coins;
    let sprite = new ex.Sprite(globals.resources.HUDSpriteSheet, conf.x, conf.y, conf.w, conf.h);
    this.addDrawing(sprite);

    for(let i = 0; i < globals.conf.SCORE.NROFDIGITS; i++ ) {
      let xPos = this.pos.x + globals.conf.TIMER.CLOCK.OFFSET_X + i * globals.conf.DIGIT_WIDTH;
      let yPos = this.pos.y + globals.conf.TIMER.CLOCK.OFFSET_Y;
      let digit = new Digit(xPos, yPos);
      this._digits.push( digit );
      this.scene.add( digit );
    }

    this._updateDigits()
  }

  public getScore():number {
    return this._score;
  }

  public updateScore(points:number):void {
    this._score += points;
    
    // Make sure it's not longer than the maximum amount of digits - if so, make it into a bunch of 9s
    if (("" + this._score).length > this._digits.length) {
      this._score = +(Array(this._digits.length+1).join("9"));
    }

    globals.currentLevelOptions.score = this._score;
    
    this._updateDigits();
  }

  private _updateDigits():void {
    // Left-Pad with zeros.
    let pad = Array(this._digits.length+1).join("0");
    let timeString = pad.substring(0, pad.length - (""+this._score).length) + this._score;

    this._digits.forEach((digit, i) => {
      digit.setDigit(+timeString[i]);
    });
  }

  public resetState():void {
    this._score = 0;
    this._updateDigits();
  }
}
