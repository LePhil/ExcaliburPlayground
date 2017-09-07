declare var globals: any;
import * as ex from "excalibur";

// TODO: extract digits + digit-changing-logic from here and Timer to Parent class...
export class ScoreCounter extends ex.UIActor {
  private _score:number;
  private _digits:Array<Digit>;

  constructor(x, y) {
    super(x, y);

    this._score = 0;
    this._digits = [];
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = globals.conf.HUD.hud_coins;
    let sprite = new ex.Sprite(globals.resources.HUDSpriteSheet, conf.x, conf.y, conf.w, conf.h);
    this.addDrawing("coin", sprite);
    this.setDrawing("coin");

    // TODO to config as DigitWidth
    let xOffset = 50;

    for(let i = 0; i < globals.conf.SCORE.NROFDIGITS; i++ ) {
      let digit = new Digit(this.pos.x + (i+1) * xOffset, this.pos.y);
      this._digits.push( digit );
      this.scene.add( digit );
    }

    this._updateDigits()
  }

  public updateScore(points:number):void {
    // TODO make sure it's not longer than the maximum amount of digits now!
    this._score += points;
    this._updateDigits();
  }

  private _updateDigits():void {

    // Left-Pad with zeros.
    let pad = Array(this._digits.length+1).join("0");
    let timeString = pad.substring(0, pad.length - (""+this._score).length) + this._score;

    this._digits.forEach((digit, i) => {
      digit.setDrawing( ""+timeString[i] );
    });
  }
}

class Digit extends ex.UIActor {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    for(let i = 0; i <= 9; i++) {
      let conf = globals.conf.HUD["hud_" + i];
      let sprite = new ex.Sprite(globals.resources.HUDSpriteSheet, conf.x, conf.y, conf.w, conf.h);
      this.addDrawing(""+i, sprite);
    }

    this.setDrawing("0");
  }
}
