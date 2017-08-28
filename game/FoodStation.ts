declare var globals: any;
import * as ex from "excalibur";
import {Player} from "./Player";
import {Food} from "./Item";

export class FoodStation extends ex.Actor {
  public name: string;
  private food: Food;

  constructor(name, x, y, w, h, color, food) {
    super(x, y, w, h, color);
    this.name = name;
    this.food = food;
  }

  /**
   * The player should move to the station, spend some time there (and do
   * things), then be off on their merry way.
   *
   * @param  {ex.Actor} player [description]
   */
  public handleClick(player: Player) {
    player.sendToFoodStation(this);
  }

  public getFood() {
    return this.food;
  }
}
