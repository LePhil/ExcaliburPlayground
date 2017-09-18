declare var globals: any;
import * as ex from "excalibur";

import {Player} from "./Player";

// maybe in Inventory as an InventoryItem? --> can be picked up and gets consumed by station on fixing..?
export class Tool extends ex.Actor{
    private _type:string;

    constructor(x, y, type:string) {
        let conf = globals.conf.ITEMS.CONF;

        super(x, y, conf.W, conf.H);
        
        this.collisionType = ex.CollisionType.Passive;
        this._type = type;
    
        this.on("pointerdown", (event) => {
            this.handleClick(globals.player);
        });
      }
    
      onInitialize(engine: ex.Engine): void {
        let conf = globals.conf.ITEMS[this._type];
        let tex = globals.resources.ItemSpriteSheet;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        let scale = conf.w > conf.h ? globals.conf.ITEMS.CONF.W / conf.w : globals.conf.ITEMS.CONF.H / conf.h;
        sprite.scale.setTo(scale, scale);
        this.addDrawing(sprite);
      }

      getType():string {
        return this._type;
      }

      handleClick(player: Player) {
          player.pickupTool(this, () => {
              // Depending on the type, decide what to do.
              // Cup --> increase speed for X seconds
              // Default: Add to inventory
              switch (this._type) {
                  case "cup":
                      player.adjustSpeed(1.5, 5);                  
                      break;
                  case "hammer":
                  case "bone":
                  default:
                      player.addTool(this._type);
                      break;
              }
          });
      }
}