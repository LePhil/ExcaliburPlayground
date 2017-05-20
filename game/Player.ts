import * as ex from "excalibur";

const PLAYER_SPEED = 100;

export class Player extends ex.Actor {

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);

    this.collisionType = ex.CollisionType.Active;
  }

  public goTo(evt: PointerEvent) {
     // this.actions.clearActions();
     this.actions.moveTo(evt.x, evt.y, 200).callMethod(()=> {
       console.log("Done");
     });
  }
}
