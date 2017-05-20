import * as ex from "excalibur";
import {Player} from "./Player";

export class FoodStation extends ex.Actor {
  public name: string;

  constructor(name, x, y, w, h, color) {
    super(x, y, w, h, color);
    this.name = name;
  }

  /**
   * The player should move to the station, spend some time there (and do
   * things), then be off on their merry way.
   *
   * @param  {ex.Actor} player [description]
   */
  public handleClick(player: ex.Actor) {
    player.actions.moveTo(this.pos.x, this.pos.y, 200)
                  .delay(1000);
  }
}
