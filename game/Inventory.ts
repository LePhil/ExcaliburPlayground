declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

abstract class FoodInventoryWithPicture extends ex.Actor {
  private item:Food;

  constructor(x, y, item:Food) {
    super(x, y, globals.conf.INVENTORY.ITEMS.WIDTH, globals.conf.INVENTORY.ITEMS.HEIGHT);
    this.item = item;
  }

  // just debugging...
  public draw(ctx: CanvasRenderingContext2D, delta: number) {

    super.draw(ctx, delta);

    ctx.fillStyle = 'rgb(200,0,0)';
    // TODO: why is the square so big?
    ctx.fillRect(0, 0, globals.conf.INVENTORY.ITEMS.WIDTH, globals.conf.INVENTORY.ITEMS.HEIGHT);
  }


  abstract getTextureIndex(): number;

  onInitialize(engine: ex.Engine): void {

    let spriteSheet = new ex.SpriteSheet(globals.resources.TextureInventory, 2, 7, globals.conf.INVENTORY.ITEMS.SPRITE_WIDTH, globals.conf.INVENTORY.ITEMS.SPRITE_HEIGHT);
    let normalSprite = spriteSheet.getSprite(this.getTextureIndex());

    let scale_x = globals.conf.INVENTORY.ITEMS.WIDTH  / globals.conf.INVENTORY.ITEMS.SPRITE_WIDTH;
    let scale_y = globals.conf.INVENTORY.ITEMS.HEIGHT / globals.conf.INVENTORY.ITEMS.SPRITE_HEIGHT;
    normalSprite.scale.setTo(scale_x, scale_y);

    this.addDrawing("normal", normalSprite);
    this.setDrawing("normal");
  }

  public getItem() {
    return this.item;
  }
}

class ElephantFoodInventory extends FoodInventoryWithPicture {
  getTextureIndex() { return 8; }
}

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
  private _maxItems: number;

  constructor() {
    let inv = globals.conf.INVENTORY;

    super(inv.POS_X,
          inv.POS_Y,
          inv.ITEMS.WIDTH * inv.ITEMS.MAX + ((inv.ITEMS.MAX - 1) * inv.SPACING),
          inv.ITEMS.HEIGHT,
          inv.COLOR);

    this.inventory = new Array<InventoryItem>();
    this._maxItems = inv.ITEMS.MAX;
  }

  public addItem(newItem: Food) {
    if ( this.inventory.length >= this._maxItems) {
      return;
    }

    let newActor;
    let c = globals.conf.INVENTORY;
    let pos_x = c.POS_X + this.inventory.length * (c.ITEMS.WIDTH + c.SPACING);
    let pos_y = c.POS_Y;

    if ( newItem.name === globals.conf.ELEPHANTFOOD_NAME) {
      newActor = new ElephantFoodInventory(pos_x, pos_y, newItem);
    } else {
      newActor = new InventoryItem(pos_x, pos_y, 50, 50, newItem);
    }
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
