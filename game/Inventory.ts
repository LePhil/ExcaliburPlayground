import * as ex from "excalibur";
import { Config } from "./config/Config";
import { Resources } from "./config/Resources";
import { AnimalSprite } from "./config/Graphics";

export class InventoryItem extends ex.Actor {
  _inv: Inventory;
  _type: string;

  constructor(x, y, type: string, inv: Inventory) {
    super(x, y, Config.INVENTORY.ITEMS.WIDTH, Config.INVENTORY.ITEMS.HEIGHT);

    this._type = type;
    this._inv = inv;

    this.on("pointerdown", (event) => {
      this._inv.removeItem(this);
    });
  }

  onInitialize(engine: ex.Engine): void {
    
    if (Config.ANIMALS[this._type.toUpperCase()]) {
      this.addDrawing(
        AnimalSprite.getSquareOutlineNoDetails(
          this._type,
          Config.INVENTORY.ITEMS.WIDTH,
          Config.INVENTORY.ITEMS.HEIGHT
        )
      );
    } else {
      // TODO: Unify all items in the Config...
      let conf = Config.ITEMS[this._type];
      let tex = Resources.ItemSpriteSheet;

      let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

      let scale_x = Config.INVENTORY.ITEMS.WIDTH / conf.w;
      let scale_y = Config.INVENTORY.ITEMS.HEIGHT / conf.h;

      sprite.scale.setTo(Config.STATIONS.CONF.SCALE, Config.STATIONS.CONF.SCALE);
      this.addDrawing(sprite);
    }
  }

  public getType() {
    return this._type;
  }
}

class InventoryToolItem extends InventoryItem {
  // e.g. wrench to fix Station

  onInitialize(engine: ex.Engine): void {
    let conf = Config.ITEMS[this._type];
    let tex = Resources.ItemSpriteSheet;
    let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

    let scale_x = Config.INVENTORY.ITEMS.WIDTH / conf.w;
    let scale_y = Config.INVENTORY.ITEMS.HEIGHT / conf.h;

    sprite.scale.setTo(Config.STATIONS.CONF.SCALE, Config.STATIONS.CONF.SCALE);
    this.addDrawing(sprite);
  }
}

export class Inventory extends ex.Actor {
  public inventory: InventoryItem[];
  private _initialSlots: number;
  private _slots: Array<InventorySlot>;

  constructor() {
    let conf = Config.INVENTORY;

    super(conf.POS_X,
      conf.POS_Y,
      conf.ITEMS.WIDTH * conf.ITEMS.MAX + ((conf.ITEMS.MAX - 1) * conf.SPACING),
      conf.ITEMS.HEIGHT);

    this.inventory = new Array<InventoryItem>();
    this._initialSlots = conf.ITEMS.MAX;
    this._slots = [];
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    for (let i = 0; i < this._initialSlots; i++) {
      this._addSlot();
    }
  }

  private _addSlot() {
    let index = this._slots.length;
    let conf = Config.INVENTORY;
    let xPos = this.pos.x + index * (conf.ITEMS.WIDTH + conf.SPACING) - conf.ITEMS.WIDTH / 2;
    let yPos = this.pos.y - conf.ITEMS.HEIGHT / 2;

    let slot = new InventorySlot(xPos, yPos);
    this.add(slot);
    this._slots.push(slot);
  }

  public addItem(type: string) {
    if (this.isFull()) {
      return;
    }

    let c = Config.INVENTORY;
    let pos_x = this.pos.x + this.inventory.length * (c.ITEMS.WIDTH + c.SPACING);
    let pos_y = this.pos.y;

    let itemToAdd = new InventoryItem(pos_x, pos_y, type, this);

    this.inventory.push(itemToAdd);
    this.add(itemToAdd);
  }

  public hasItem(itemType: string): boolean {
    return this.inventory.filter(item => item.getType() === itemType).length > 0;
  }

  public checkAndRemoveItem(itemType: string) {
    let itemToRemove = null;

    for (let inventoryItem of this.inventory) {
      if (inventoryItem.getType() === itemType) {
        itemToRemove = inventoryItem;
        break;
      }
    }

    if (itemToRemove) {
      this.removeItem(itemToRemove);
      return true;
    }
    return false;
  }

  public removeItem(itemToRemove: InventoryItem) {
    this.inventory.splice(this.inventory.indexOf(itemToRemove), 1);
    this.remove(itemToRemove);

    // Update remaining items' positions ("float" to the left)
    this.inventory.forEach((item, index) => {
      item.pos.x = Config.INVENTORY.POS_X + index * (Config.INVENTORY.ITEMS.WIDTH + Config.INVENTORY.SPACING);
    });
  }

  public changeSlotNumber(count: number): void {
    while (this._slots.length > count) {
      this.remove(this._slots.pop());
    }

    while (this._slots.length < count) {
      this._addSlot();
    }
  }

  public isFull(): boolean {
    return this.inventory.length >= this._initialSlots;
  }

  public isEmpty(): boolean {
    return this.inventory.length === 0;
  }
}

/**
 * Graphical indicator of an available or occupied slot in the inventory.
 */
class InventorySlot extends ex.UIActor {
  constructor(x, y) {
    super(x, y);
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    let conf = Config.INVENTORY;
    let sprite = Resources.ImgInventorySlot.asSprite();
    sprite.scale.setTo(conf.ITEMS.WIDTH / conf.SLOT.W, conf.ITEMS.HEIGHT / conf.SLOT.H);
    this.addDrawing(sprite);
  }
}