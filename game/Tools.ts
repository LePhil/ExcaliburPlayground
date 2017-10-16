import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";
import {Player} from "./Player";

export class ToolFactory {
    static create(x: number, y: number, type: string, player: Player): Tool {
        if (Config.ITEMS[type].t === Config.ITEM_TYPES.CONSUMABLE) {
            return new ConsumableTool(x, y, type, player);
        } else if (Config.ITEMS[type].t === Config.ITEM_TYPES.PICKUPPABLE) {
            return new PickuppableTool(x, y, type, player);
        } else {
            console.warn(`Tool "${type}" doesn't have a type. Using "Tool".`);
            return new Tool(x, y, type, player);
        }
    }
}

export class Tool extends ex.Actor{
    private _type:string;
    private _isActive: boolean;

    constructor(x, y, type:string, player: Player) {
        let conf = Config.ITEMS.CONF;

        super(x, y, conf.W, conf.H);
        
        this.collisionType = ex.CollisionType.Passive;
        this._type = type;
    
        this.on("pointerdown", (event) => {
            this.handleClick(player);
        });
    }
    
    onInitialize(engine: ex.Engine): void {
        let conf = Config.ITEMS[this._type];
        let tex = Resources.ItemSpriteSheet;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        let scale = conf.w > conf.h ? Config.ITEMS.CONF.W / conf.w : Config.ITEMS.CONF.H / conf.h;
        sprite.scale.setTo(scale, scale);

        let darkSprite = sprite.clone();
        darkSprite.darken(.5);

        this.addDrawing("normal", sprite);
        this.addDrawing("inactive", darkSprite);

        this.setActive();
    }

    handleClick(player: Player) {
        if (this._isActive) {
            player.pickupTool(this, () => {this.handlePickup(player)} );
        }
    }
    
    getType():string { return this._type; }
    isActive():boolean { return this._isActive; }
      
    setActive() {
        this._isActive = true;
        this.setDrawing("normal");
    }

    setInactive() {
        this._isActive = false;
        this.setDrawing("inactive");
    }

    handlePickup(player: Player):void {}

    resetState(): void {
        this.setActive();
    }
}

// These tools can be picked up and get added to the inventory 
export class PickuppableTool extends Tool {

    handlePickup(player: Player):void {
        player.addToInventory(this.getType());
    }
}

// Consumable "Tools" have an effect on the player
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
