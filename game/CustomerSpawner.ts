declare var globals: any;
import * as ex from "excalibur";
import {Customer} from "./Customer";
import {Food} from "./Item";

export class CustomerSpawner extends ex.Actor {
  public queue:Customer[];

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);

    this.collisionType = ex.CollisionType.Passive;

    this.queue = new Array<Customer>();
  }

  public spawn() {
    let newPos = this.pos.x + this.queue.length * (globals.conf.CUSTOMER_WIDTH + 2)
    let newCustomer = new Customer(newPos,
                                   this.pos.y,
                                   globals.conf.CUSTOMER_WIDTH,
                                   globals.conf.CUSTOMER_HEIGHT,
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



}
