declare var globals: any;
import * as ex from "excalibur";

export class Timer extends ex.UIActor {
  private _count:number;
  private _digits:Array<Digit>;
  private _time:number;

  constructor(x, y, time:number) {
    super(x, y,
          globals.conf.TIMER.WIDTH,
          globals.conf.TIMER.HEIGHT);

    this._count = 0;
    this._time = time;
    this._digits = [];
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let xOffset = 50;

    for(let i = 0; i < ("" + this._time).length; i++ ) {
      let digit = new Digit(this.pos.x + i * xOffset, this.pos.y);
      this._digits.push( digit );
      this.scene.add( digit );
    }

    // TODO: best name is best.
    let timerTimer = new ex.Timer(() => {
      this._updateDigits()
    }, 1000, true);

    engine.add(timerTimer);
  }

  // TODO: should only update digits, nothing more - remove endgame stuff
  private _updateDigits():void {
    this._count++;

    if(this._count >= this._time) {
      this._endGame();
      this._count = this._time;
    }

    // Left-Pad with zeros.
    let pad = Array(this._digits.length+1).join("0");
    let timeString = pad.substring(0, pad.length - (""+this._count).length) + this._count;

    this._digits.forEach((digit, i) => {
      digit.setDrawing( ""+timeString[i] );
    });
  }

  private _endGame():void {
    //TODO - what if the timer runs out?
    globals.endScreen();
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
