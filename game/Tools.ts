declare var globals: any;
import * as ex from "excalibur";

import {Player} from "./Player";

// maybe in Inventory as an InventoryItem? --> can be picked up and gets consumed by station on fixing..?
export class Tool extends ex.Actor{
    private _type:string;
    private _isActive: boolean;

    constructor(x, y, type:string) {
        let conf = globals.conf.ITEMS.CONF;

        super(x, y, conf.W, conf.H);
        
        this.collisionType = ex.CollisionType.Passive;
        this._type = type;
        this._isActive = true;
    
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

        let darkSprite = sprite.clone();
        darkSprite.darken(.5);

        this.addDrawing("normal", sprite);
        this.addDrawing("inactive", darkSprite);

        this.setDrawing("normal");
    }

    getType():string {
        return this._type;
    }

    handleClick(player: Player) {
        if (this._isActive) {
            player.pickupTool(this, () => {this.handlePickup(player)} );
        }
    }

    isActive():boolean {
        return this._isActive;
    }
      
    setActive() {
        this._isActive = true;
        this.setDrawing("normal");
    }

    setInactive() {
        this._isActive = false;
        this.setDrawing("inactive");
    }

    handlePickup(player: Player):void {}
}

export class PickuppableTool extends Tool {

    handlePickup(player: Player):void {
        switch (this.getType()) {
            case "hammer":
            case "bone":
            default:
                player.addTool(this.getType());
                break;
        }
    }
}

export class ConsumableTool extends Tool {
    
    handlePickup(player: Player):void {
        // Only handle pickup if active
        if(!this.isActive()) { return; }

        let effectDuration = 5;        
        this.setInactive();

        setTimeout(() => {
            this.setActive();
        }, effectDuration * 1000);

        switch (this.getType()) {
            case "cup":
                player.adjustSpeed(1.5, effectDuration);
                break;
        }
    }
}
