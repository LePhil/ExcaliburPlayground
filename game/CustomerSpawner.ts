declare var globals: any;
import * as ex from "excalibur";
import {Customer} from "./Customer";
import {Food} from "./Item";
import {Player} from "./Player";

export class CustomerSpawner extends ex.Actor {
  public queue:Customer[];

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);

    this.collisionType = ex.CollisionType.Passive;

    this.queue = new Array<Customer>();
  }

  public spawn() {
    let newPosX = this.pos.x + this.queue.length * (globals.conf.CUSTOMER_WIDTH + 2)
    let newCustomer = new Customer(newPosX,
                                   this.pos.y,
                                   this.getRandomFood());
    this.queue.push(newCustomer);
    globals.game.add(newCustomer);
  }

  private getRandomFood():Food {
    let foods = ["cat", "dog"];
    let randomFood = foods[Math.floor(Math.random()*foods.length)];

    if (randomFood === "cat") {
      return new Food(globals.conf.CATFOOD_NAME, globals.conf.CATFOOD_COLOR);
    } else {
      return new Food(globals.conf.DOGFOOD_NAME, globals.conf.DOGFOOD_COLOR);
    }
  }

  /**
   * The player should move to the cassa, spend some time there (and do
   * things), then be off on their merry way.
   *
   * @param  {ex.Actor} player [description]
   */
  public handleClick(player: Player) {
    console.log( this.queue );
    player.actions.moveTo(this.pos.x, this.pos.y, 200)
                  .delay(1000)
                  .callMethod(()=> {
                    let customersToRemove = player.serveItems(this.queue);

                    // remove all customers that were served
                    for (let customerToRemove of customersToRemove) {
                      this.queue.splice( this.queue.indexOf(customerToRemove), 1 );

                      customerToRemove.actions.moveTo(
                        globals.game.getDrawWidth()/2,
                        globals.game.getDrawHeight(),
                        200).callMethod(()=> {

                        console.log("Bye bye " + customerToRemove.name);
                        customerToRemove.kill();
                      });
                    }
                  });
  }

}