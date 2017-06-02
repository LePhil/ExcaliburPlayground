declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

class InventoryItem extends ex.Actor {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
  }
}

export class Inventory extends ex.Actor {
  inventory: Food[];

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.inventory = new Array<Food>();
  }

  public addItem(newItem: Food) {
    this.inventory.push(newItem);

    // var newLI = document.createElement('li');
    // var element = newLI.appendChild(document.createTextNode(newItem.name));
    //
    // document.getElementById("inventory").appendChild(element);

    let newActor = new InventoryItem(this.inventory.length*52, 0, 50, 50, newItem.color);
    globals.game.add(newActor);
  }

}
