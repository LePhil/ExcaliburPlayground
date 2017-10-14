import * as ex from "excalibur";
import { Food } from "./Food";
import { Config } from "./config/Config";
import { Resources } from "./config/Resources";
import { Animal } from "./AnimalCage";

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

  public draw(ctx: CanvasRenderingContext2D, delta: number) {
    super.draw(ctx, delta);
  }

  onInitialize(engine: ex.Engine): void {
    let conf = Config.INVENTORY.SPRITE[this._type];
    let tex = Resources.TextureInventory;
    let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

    let scale_x = Config.INVENTORY.ITEMS.WIDTH / conf.w;
    let scale_y = Config.INVENTORY.ITEMS.HEIGHT / conf.h;

    sprite.scale.setTo(Config.STATIONS.CONF.SCALE, Config.STATIONS.CONF.SCALE);
    this.addDrawing(sprite);
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
  inventory: InventoryItem[];
  private _maxItems: number;
  private _slots: Array<InventorySlot>;

  constructor() {
    let conf = Config.INVENTORY;

    super(conf.POS_X,
      conf.POS_Y,
      conf.ITEMS.WIDTH * conf.ITEMS.MAX + ((conf.ITEMS.MAX - 1) * conf.SPACING),
      conf.ITEMS.HEIGHT);

    this.inventory = new Array<InventoryItem>();
    this._maxItems = conf.ITEMS.MAX;
    this._slots = [];
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);

    let conf = Config.INVENTORY;

    for (let i = 0; i < this._maxItems; i++) {
      let xPos = this.pos.x + i * (conf.ITEMS.WIDTH + conf.SPACING) - conf.ITEMS.WIDTH / 2;
      let yPos = this.pos.y - conf.ITEMS.HEIGHT / 2;
      let slot = new InventorySlot(xPos, yPos);
      this.add(slot);
      this._slots.push(slot);
    }
  }

  public addItem(type: string) {
    if (this.inventory.length >= this._maxItems) {
      return;
    }

    let c = Config.INVENTORY;
    let pos_x = this.pos.x + this.inventory.length * (c.ITEMS.WIDTH + c.SPACING);
    let pos_y = this.pos.y;

    let itemToAdd = new InventoryItem(pos_x, pos_y, type, this);

    this.inventory.push(itemToAdd);
    this.add(itemToAdd);
  }

  // TODO: many similarities with addItem
  public addTool(type: string) {
    if (this.inventory.length >= this._maxItems) {
      return;
    }

    let c = Config.INVENTORY;
    let pos_x = this.pos.x + this.inventory.length * (c.ITEMS.WIDTH + c.SPACING);
    let pos_y = this.pos.y;

    let newActor = new InventoryToolItem(pos_x, pos_y, type, this);

    this.inventory.push(newActor);
    this.add(newActor);
  }

  // TODO: even more similarities...
  public addAnimal(animal: Animal) {
    if (this.inventory.length >= this._maxItems) {
      return;
    }

    let c = Config.INVENTORY;
    let pos_x = this.pos.x + this.inventory.length * (c.ITEMS.WIDTH + c.SPACING);
    let pos_y = this.pos.y;

    let newActor = new InventoryItem(pos_x, pos_y, animal.getType(), this);

    this.inventory.push(newActor);
    this.add(newActor);
  }

  public checkAndRemoveItem(itemToCheck: Food) {
    let itemToRemove = null;

    for (let inventoryItem of this.inventory) {
      if (inventoryItem.getType() === itemToCheck.name) {
        itemToRemove = inventoryItem;
      }
    }

    if (itemToRemove) {
      this.removeItem(itemToRemove);
      return true;
    }
    return false;
  }

  // TODO: ew ew ew ew
  public checkAndRemoveTool(typeToCheck: string) {
    let itemToRemove = null;

    for (let inventoryItem of this.inventory) {
      if (inventoryItem.getType() === typeToCheck) {
        itemToRemove = inventoryItem;
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

  // TODO: use this on init to keep it DRY
  public resetState(): void {
    this.inventory.forEach((item) => {
      this.remove(item);
    });
    this.inventory = new Array<InventoryItem>();

    /*
    this._slots.forEach((slot) => {
      this.remove(slot);
    });
    this._slots = [];
    */

    this._maxItems = Config.INVENTORY.ITEMS.MAX;
  }

  public changeSlotNumber(count: number): void {
    this._maxItems = count;
    //TODO: add/remove slots accordingly
  }
}

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