declare var globals: any;
import * as ex from "excalibur";
import {Player} from "./Player";
import {Food} from "./Item";

export class FoodStation extends ex.Actor {
  public name: string;
  private food: Food;

  constructor(name, x, y, w, h, color: ex.Color, food: Food) {
    super(x, y, w, h, color);
    this.name = name;
    this.food = food;

    this.on("pointerdown", (event) => {
      this.handleClick(globals.player);
    });
  }

  public handleClick(player: Player) {
    player.sendToFoodStation(this);
  }

  public getFood() {
    return this.food;
  }
}
