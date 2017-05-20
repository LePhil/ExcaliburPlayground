import * as ex from "excalibur";

const PLAYER_SPEED = 100;

export class Player extends ex.Actor {
  private target: Coordinates;

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
  }

  public goTo(evt: PointerEvent) {
     this.actions.clearActions();
     this.actions.moveTo(evt.x, evt.y, 1000);
  }
}
