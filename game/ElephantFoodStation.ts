declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

export class ElephantFoodStation extends ex.Actor {
  private food: Food;

  constructor(x: number, y: number, w: number, h: number, food: Food) {
    super(x, y, w, h);
    this.food = food;
  }

  onInitialize(engine: ex.Engine): void {
    let spriteSheet = new ex.SpriteSheet(globals.resources.TextureElephant, 1, 1, 284, 414);
    let normalSprite = spriteSheet.getSprite(0);
    normalSprite.scale.setTo(.2, .2);
    this.addDrawing("normal", normalSprite);
  }
}
