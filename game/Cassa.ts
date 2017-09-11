declare var globals: any;
import * as ex from "excalibur";
import {Customer} from "./Customer";
import {Food} from "./Item";
import {Player} from "./Player";

export class Cassa extends ex.Actor {
  public queue:Customer[];

  constructor(x, y) {
    super(x, y, globals.conf.CASSA.W, globals.conf.CASSA.H);

    this.on("pointerdown", (event) => {
      this.handleClick(globals.player);
    });
  }

  onInitialize(engine: ex.Engine): void {
      this._setup();

      let tex  = globals.resources.Cassa;
      this.addDrawing(new ex.Sprite(tex, 0, 0, 70, 70));
  }

  public adjustQueue() {
    this.queue.forEach((cust, index) => {
      let newPosX = this.pos.x + index * (globals.conf.CUSTOMER_WIDTH + 2)
      cust.actions.moveTo(newPosX, this.pos.y, globals.conf.CUSTOMER_SPEED);
    });
  }

  /**
   * The player should move to the cassa, spend some time there (and do
   * things), then be off on their merry way.
   *
   * @param  {ex.Actor} player [description]
   */
  public handleClick(player: Player) {
    /*player.sendToCassa(this, () => {
      let customersToRemove = player.serveItems(this.queue);

      // remove all customers that were served with a small delay
      customersToRemove.forEach((customerToRemove, index) => {
        setTimeout(() => {
          this._removeFromQueue(customerToRemove);
        }, index * 500);
      });

    });*/
  }

  private _removeFromQueue(customerToRemove: Customer):void {
    this.queue.splice( this.queue.indexOf(customerToRemove), 1 );
    customerToRemove.leaveStore();
    this.adjustQueue();
  }

  public ranOutOfPatience(customer: Customer):void {
    this._removeFromQueue(customer);
  }

  private _setup():void {
    this.queue = new Array<Customer>();
  }

  public resetState():void {
    this.queue.forEach((customer) => {
      customer.kill();
    });

    this._setup();
  }
}
