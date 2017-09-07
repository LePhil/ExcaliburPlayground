declare var globals: any;
import * as ex from "excalibur";
import {Customer} from "./Customer";
import {Food} from "./Item";
import {Player} from "./Player";

// TODO: is that really the best name?
export class CustomerSpawner extends ex.Actor {
  public queue:Customer[];
  private _customerSpawnerTimer: ex.Timer;

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);

    this.collisionType = ex.CollisionType.Passive;

    this.queue = new Array<Customer>();

    this.on("pointerdown", (event) => {
      this.handleClick(globals.player);
    });
  }

  onInitialize(engine: ex.Engine): void {
    this.spawn();

    this._customerSpawnerTimer = new ex.Timer(() => {
      this.spawn();
    }, globals.conf.GAME.SPAWN_TIME, true);

    engine.add(this._customerSpawnerTimer);
  }

  public spawn() {
    if (this.queue.length >= globals.conf.CUSTOMER.QUEUE_LENGTH) {
      return;
    }

    let newPosX = this.pos.x + this.queue.length * (globals.conf.CUSTOMER_WIDTH + 2)
    let newCustomer = new Customer(newPosX,
                                   this.pos.y,
                                   this.getRandomFood(),
                                   this);
    this.queue.push(newCustomer);
    this.scene.add(newCustomer);
  }

  private getRandomFood():Food {
    let foods = ["elephant", "rabbit"];
    let randomFood = foods[Math.floor(Math.random()*foods.length)];

    // TODO: it's so ugly I can barely look at it!
    if (randomFood === "elephant") {
      return new Food(globals.conf.ELEPHANTFOOD_NAME, globals.conf.ELEPHANTFOOD_COLOR);
    } else {
      return new Food(globals.conf.RABBITFOOD_NAME, globals.conf.RABBITFOOD_COLOR);
    }
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
    player.sendToCassa(this, () => {
      let customersToRemove = player.serveItems(this.queue);

      // remove all customers that were served with a small delay
      customersToRemove.forEach((customerToRemove, index) => {
        setTimeout(() => {
          this._removeFromQueue(customerToRemove);
        }, index * 500);
      });

    });
  }

  private _removeFromQueue(customerToRemove: Customer):void {
    this.queue.splice( this.queue.indexOf(customerToRemove), 1 );
    customerToRemove.leaveStore();
    this.adjustQueue();
  }

  public ranOutOfPatience(customer: Customer):void {
    this._removeFromQueue(customer);
  }
}
