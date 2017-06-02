declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

class InventoryItem extends ex.Actor {
  item:Food;

  constructor(x, y, w, h, item:Food) {
    super(x, y, w, h, item.color);
    this.item = item;
  }

  public getItem() {
    return this.item;
  }
}

export class Inventory extends ex.Actor {
  inventory: InventoryItem[];

  constructor(x, y, w, h, color) {
    super(x, y, w, h, color);
    this.inventory = new Array<InventoryItem>();
  }

  public addItem(newItem: Food) {
    let newActor = new InventoryItem(this.inventory.length*52, 0, 50, 50, newItem);
    this.inventory.push(newActor);
    globals.game.add(newActor);
  }

  public checkAndRemoveItem(itemToCheck: Food) {
    let itemToRemove = null;

    for (let myItem of this.inventory) {
      if (myItem.getItem().name === itemToCheck.name) { // Lazy, should do it via inheritance (TODO)
        itemToRemove = myItem;
      }
    }

    if (itemToRemove) {
      this.inventory.splice( this.inventory.indexOf(itemToRemove), 1 );
      itemToRemove.kill();
      return true;
    }
    return false;
  }

}
