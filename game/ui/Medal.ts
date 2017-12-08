import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

enum MedalType {
  GOLD = "gold",
  SILVER = "silver",
  BRONZE = "bronze"
}

export class Medal extends ex.UIActor {
    static type = MedalType;

    constructor(x, y) {
        super(x, y);

        this.anchor.setTo(.5, .5);
        let conf = Config.MEDALS;
        let tex = Resources.MedalsSheet;
        let sprite = new ex.SpriteSheet(tex, 5, 2, conf.W, conf.H);

        this.addDrawing(Medal.type.GOLD,   sprite.getSprite(1));
        this.addDrawing(Medal.type.SILVER, sprite.getSprite(0));
        this.addDrawing(Medal.type.BRONZE, sprite.getSprite(3));
    }

    public setValueByNumber(value: number): void {
      switch (value) {
        case 0:
          this.setValue(MedalType.GOLD);
          break;
        case 1:
          this.setValue(MedalType.SILVER);
          break;
        case 2:
        default:
          this.setValue(MedalType.BRONZE);
          break;
      }
    }

    public setValue(value: MedalType): void {
      this.setDrawing(value);
    }

}
