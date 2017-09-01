declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

export class RabbitFoodStation extends ex.Actor {
  private width: number;
  private height: number;
  private food: Food;

  constructor(x: number, y: number, food: Food) {
    let w = globals.conf.RABBITFOOD_WIDTH * globals.conf.RABBITFOOD_SCALE_STATION;
    let h = globals.conf.RABBITFOOD_HEIGHT * globals.conf.RABBITFOOD_SCALE_STATION;

    super(x, y, w, h);

    this.width = w;
    this.height = h;
    this.food = food;

    this.on("pointerdown", (event) => {
      globals.player.sendToFoodStation(this);
    });
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(globals.resources.TextureRabbit, 1, 1, globals.conf.RABBITFOOD_WIDTH, globals.conf.RABBITFOOD_HEIGHT);
    let normalSprite = spriteSheet.getSprite(0);
    normalSprite.scale.setTo(globals.conf.RABBITFOOD_SCALE_STATION, globals.conf.RABBITFOOD_SCALE_STATION);
    this.addDrawing("normal", normalSprite);
    this.setDrawing("normal");
  }

  public getFood() {
    return this.food;
  }
}
