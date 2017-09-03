declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";
import {FoodStation} from "./FoodStation";
import {Inventory} from "./Inventory";
import {Customer} from "./Customer";
import {CustomerSpawner} from "./CustomerSpawner";

const PLAYER_SPEED = 100;
const enum PlayerMode {
   Idle,
   Walking,
   Working
}

export class Player extends ex.Actor {
  inventory: Inventory;
  private _speed: number;

  private _lastPosX: number;
  private _lastPosY: number;

  private _currentMode: PlayerMode = PlayerMode.Idle;

  constructor(inventory: Inventory) {
    super(globals.conf.PLAYER_STARTX,
          globals.conf.PLAYER_STARTY,
          globals.conf.PLAYER_WIDTH,
          globals.conf.PLAYER_HEIGHT);

    this.inventory = inventory;
    this._speed =  globals.conf.PLAYER_SPEED;

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;

    this.collisionType = ex.CollisionType.Active;
  }

  onInitialize(engine: ex.Engine): void {
    let playerTypeIndex = 0;
    if ( globals.storage.get("playerColor") ) {
      playerTypeIndex = globals.conf.PLAYER_TYPES.indexOf(globals.conf.PLAYER_TYPES.filter( type => type.color === globals.storage.get("playerColor") )[0]);
    }

    let scale = globals.conf.SPRITE_SCALE;
    let coords = globals.conf.PLAYER_TYPES[playerTypeIndex].coords;
    let speed = globals.conf.SPRITE_ANIM_SPEED;

    let spriteSheet = new ex.SpriteSheet(globals.resources.TexturePlayers, 7, 8, 128, 256);

    let walkRightAnim = spriteSheet.getAnimationByIndices(engine, coords.walkR, speed);
    walkRightAnim.loop = true;
    walkRightAnim.scale.setTo(scale, scale);
    this.addDrawing("walkRight", walkRightAnim);

    let walkLeftAnim = spriteSheet.getAnimationByIndices(engine, coords.walkR, speed);
    walkLeftAnim.loop = true;
    walkLeftAnim.flipHorizontal = true;
    walkLeftAnim.scale.setTo(scale, scale);
    this.addDrawing("walkLeft", walkLeftAnim);

    let idleSprite = spriteSheet.getSprite(coords.idle);
    idleSprite.scale.setTo(scale, scale);
    this.addDrawing("idle", idleSprite);

    let walkUpAnim = spriteSheet.getAnimationByIndices(engine, coords.walkUp, speed);
    walkUpAnim.loop = true;
    walkUpAnim.scale.setTo(scale, scale);
    this.addDrawing("walkUp", walkUpAnim);

    let pickUpSprite = spriteSheet.getSprite(coords.pick);
    pickUpSprite.scale.setTo(scale, scale);
    this.addDrawing("pickUp", pickUpSprite);

    // TODO: down anim not included in spritesheet :(
    this.addDrawing("walkDown", idleSprite);

    this.setDrawing("idle");
  }

  public update(engine: ex.Engine, delta: number): void {
   super.update(engine, delta);

   let xMovement = this._lastPosX - this.pos.x;
   let yMovement = this._lastPosY - this.pos.y

   if (Math.abs(xMovement) > Math.abs(yMovement) ) {
     if (xMovement > 0) {
       this.setDrawing("walkLeft");
     } else if (xMovement < 0) {
       this.setDrawing("walkRight");
     }
   } else {
     if (yMovement > 0) {
       this.setDrawing("walkUp");
     } else if (yMovement < 0) {
       this.setDrawing("walkDown");
     }
   }

   if (yMovement === 0 && xMovement === 0) {
     this.setDrawing("idle");
   }

   this._lastPosX = this.pos.x;
   this._lastPosY = this.pos.y;
  }

  public goTo(evt: PointerEvent) {
   this.actions.moveTo(evt.x, evt.y, this._speed)
               .callMethod(()=> {
                 // TODO ?
               });
  }

  public sendToFoodStation(station: FoodStation) {
    this.actions
    .moveTo(station.pos.x,
            station.pos.y,
            this._speed)
    .callMethod(() => {
      console.log("pickup");
      this.setDrawing("pickUp");
    })
    .delay(globals.conf.STATION_DURATION)
    .callMethod(()=> {
      console.log("idle");
      this.addFood(station.getFood());
      this.setDrawing("idle");
    });
  }

  public sendToCassa(cassa: CustomerSpawner, callback: any) {
    this.actions
      .moveTo(cassa.pos.x, cassa.pos.y, 200)
      .delay(1000)
      .callMethod(callback);
  }

  public addFood(food: Food) {
    this.inventory.addItem(food);
  }

  /**
   * Serve items to a customer if applicable
   * @param  {Customer[]} customerQueue
   */
  public serveItems(customerQueue:Customer[]) {
    let customersToRemove = new Array<Customer>();

    // check for each customer if we have what they want
    for (let cust of customerQueue) {
      if (this.inventory.checkAndRemoveItem(cust.wants)) {
        customersToRemove.push(cust);
      }
    }

    return customersToRemove;
  }
}
