declare var globals: any;
import * as ex from "excalibur";
import {Food} from "./Item";
import {Inventory} from "./Inventory";
import {Customer} from "./Customer";


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

  constructor(color, inventory: Inventory) {
    super(globals.conf.PLAYER_STARTX,
          globals.conf.PLAYER_STARTY,
          globals.conf.PLAYER_WIDTH,
          globals.conf.PLAYER_HEIGHT,
          color);
    this.inventory = inventory;
    this._speed =  globals.conf.PLAYER_SPEED;

    this._lastPosX = this.pos.x;
    this._lastPosY = this.pos.y;

    this.collisionType = ex.CollisionType.Active;
  }

  onInitialize(engine: ex.Engine): void {
      let downSpriteSheet = new ex.SpriteSheet(globals.resources.TextureMonsterDown, 14, 1, 96, 96);
      let rightSpriteSheet = new ex.SpriteSheet(globals.resources.TextureMonsterRight, 14, 1, 96, 96);
      let upSpriteSheet = new ex.SpriteSheet(globals.resources.TextureMonsterUp, 14, 1, 96, 96);

      let walkDownAnim = downSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5, 6, 7], globals.conf.MonsterWalkFrameSpeed);
      walkDownAnim.scale.setTo(2, 2);
      walkDownAnim.loop = true;
      this.addDrawing("walkDown", walkDownAnim);

      let walkUpAnim = upSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5, 6, 7], globals.conf.MonsterWalkFrameSpeed);
      walkUpAnim.scale.setTo(2, 2);
      walkUpAnim.loop = true;
      this.addDrawing("walkUp", walkUpAnim);

      let walkRightAnim = rightSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5, 6, 7], globals.conf.MonsterWalkFrameSpeed);
      walkRightAnim.scale.setTo(2, 2);
      walkRightAnim.loop = true;
      this.addDrawing("walkRight", walkRightAnim);

      let walkLeftAnim = rightSpriteSheet.getAnimationByIndices(engine, [2, 3, 4, 5, 6, 7], globals.conf.MonsterWalkFrameSpeed);
      walkLeftAnim.flipHorizontal = true;
      walkLeftAnim.scale.setTo(2, 2);
      walkLeftAnim.loop = true;
      this.addDrawing("walkLeft", walkLeftAnim);

      let idleAnim = downSpriteSheet.getAnimationBetween(engine, 0, 2, 400);
      idleAnim.loop = true;
      idleAnim.scale.setTo(2, 2);
      this.addDrawing("idleDown", idleAnim);

      let idleUpAnim = upSpriteSheet.getAnimationBetween(engine, 0, 2, 400);
      idleUpAnim.loop = true;
      idleUpAnim.scale.setTo(2, 2);
      this.addDrawing("idleUp", idleUpAnim);

      let idleRightAnim = rightSpriteSheet.getAnimationBetween(engine, 0, 2, 400);
      idleRightAnim.scale.setTo(2, 2);
      idleRightAnim.loop = true;
      this.addDrawing("idleRight", idleRightAnim);

      let idleLeftAnim = rightSpriteSheet.getAnimationBetween(engine, 0, 2, 400);
      idleLeftAnim.flipHorizontal = true;
      idleLeftAnim.scale.setTo(2, 2);
      idleLeftAnim.loop = true;
      this.addDrawing("idleLeft", idleLeftAnim);

      let sprite = globals.resources.TextureMonsterRight.asSprite().clone();
      sprite.scale.setTo(2, 2);
      this.addDrawing("idleRight", sprite);

      this.setDrawing("idleDown");
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
       this.setDrawing("idleDown");
     }

     this._lastPosX = this.pos.x;
     this._lastPosY = this.pos.y;
  }


  public goTo(evt: PointerEvent) {
     this.actions.moveTo(evt.x, evt.y, this._speed)
                 .callMethod(()=> {
                   console.log("Done");
                 });
  }

  public receiveFood(food: Food) {
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
