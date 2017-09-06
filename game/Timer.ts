declare var globals: any;
import * as ex from "excalibur";

export class Timer extends ex.UIActor {
  private _count:number;

  constructor(x, y, time) {
    super(x, y,
          globals.conf.TIMER.WIDTH,
          globals.conf.TIMER.HEIGHT);

    this._count = 0;
  }

  onInitialize(engine: ex.Engine): void {
    for(let i = 0; i <= 9; i++) {
      let conf = globals.conf.HUD["hud_" + i];
      let sprite = new ex.Sprite(globals.resources.HUDSpriteSheet, conf.x, conf.y, conf.w, conf.h)
      this.addDrawing(""+i, sprite);
    }

    this.setDrawing("0");

    // TODO: best name is best.
    let timerTimer = new ex.Timer(() => {
      this._updateTime()
    }, 1000, true);

    engine.add(timerTimer);
  }

  public update(engine: ex.Engine, delta: number): void {
    super.update(engine, delta);
  }

  private _updateTime():void {
    this._count++;
    this.setDrawing("" + (this._count%10));
  }
}
