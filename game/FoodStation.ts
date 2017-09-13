declare var globals: any;
import * as ex from "excalibur";
import {Player} from "./Player";
import {Food} from "./Food";

export class FoodStation extends ex.Actor {
  private _food: Food;
  private _type: string;
  private _duration: number;

  constructor(x: number, y: number, type: string) {
    let conf = globals.conf.STATIONS[type];
    let scale = globals.conf.STATIONS.CONF.SCALE;
    let w = conf.w * scale;
    let h = conf.h * scale;

    super(x, y, w, h);

    this._type = type;
    this._duration = conf.duration;
    this._food = new Food(this._type, ex.Color.Red);

    this.on("pointerdown", (event) => {
      globals.player.sendToFoodStation(this);
    });
  }

  onInitialize(engine: ex.Engine): void {
    let conf = globals.conf.STATIONS[this._type];
    let tex = globals.resources.TextureStations;
    let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
    sprite.scale.setTo(globals.conf.STATIONS.CONF.SCALE, globals.conf.STATIONS.CONF.SCALE);
    this.addDrawing( sprite );
  }

  public getFood():Food {
    return this._food;
  }

  public getDuration():number {
    return this._duration;
  }
}
