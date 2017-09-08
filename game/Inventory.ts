declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";

abstract class InventoryItem extends ex.Actor {
  private _item:Food;
  private _inv:Inventory;

  constructor(x, y, item:Food, inv: Inventory) {
    super(x, y, globals.conf.INVENTORY.ITEMS.WIDTH, globals.conf.INVENTORY.ITEMS.HEIGHT);
    this._item = item;
    this._inv = inv;

    this.on("pointerdown", (event) => {
      this._inv.removeItem(this);
    });
  }

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta);

    if(globals.conf.GAME.DEBUG) {
      ctx.fillStyle = 'rgb(200,0,0)';
      ctx.fillRect(this.pos.x, this.pos.y, globals.conf.INVENTORY.ITEMS.WIDTH, globals.conf.INVENTORY.ITEMS.HEIGHT);
    }
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
    return this._item;
  }
}

class ElephantInventoryItem extends InventoryItem {
  getTextureIndex() { return 8; }
}

class RabbitInventoryItem extends InventoryItem {
  getTextureIndex() { return 6; }
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

    //TODO: *really* lazy
    if ( newItem.name === globals.conf.ELEPHANTFOOD_NAME) {
      newActor = new ElephantInventoryItem(pos_x, pos_y, newItem, this);
    } else if ( newItem.name === globals.conf.RABBITFOOD_NAME ) {
      newActor = new RabbitInventoryItem(pos_x, pos_y, newItem, this);
    }

    this.inventory.push(newActor);
    this.scene.add(newActor);
  }

  public checkAndRemoveItem(itemToCheck: Food) {
    let itemToRemove = null;

    for (let myItem of this.inventory) {
      if (myItem.getItem().name === itemToCheck.name) { // Lazy, should do it via inheritance (TODO)
        itemToRemove = myItem;
      }
    }

    if (itemToRemove) {
      this.removeItem(itemToRemove);
      return true;
    }
    return false;
  }

  public removeItem(itemToRemove: InventoryItem) {
    this.inventory.splice( this.inventory.indexOf(itemToRemove), 1 );
    itemToRemove.kill();

    // Update remaining items' positions ("float" to the left)
    this.inventory.forEach((item, index) => {
      item.pos.x = globals.conf.INVENTORY.POS_X + index * (globals.conf.INVENTORY.ITEMS.WIDTH + globals.conf.INVENTORY.SPACING);
    });
  }

  public resetState():void {
    this.inventory.forEach((item) => {
      item.kill();
    });
    this.inventory = new Array<InventoryItem>();
  }

}
