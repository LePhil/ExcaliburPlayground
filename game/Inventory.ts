import * as ex from "excalibur";
import {Food} from "./Item";

export class Inventory extends ex.Actor {
  inventory: Food[];

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.inventory = new Array<Food>();
  }

  public addItem(newItem: Food) {
    debugger;
    this.inventory.push(newItem);

    var newLI = document.createElement('li');
    var element = newLI.appendChild(document.createTextNode(newItem.name));

    document.getElementById("inventory").appendChild(element);
  }

}
