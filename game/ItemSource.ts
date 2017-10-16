import * as ex from "excalibur";
import {Player} from "./Player";
import {Item} from "./Item";
import {Resources} from "./config/Resources";
import {Config} from "./config/Config";


enum ItemSourceState {
    Normal = "normal",
    Broken = "broken"
};
  
export class ItemSource extends ex.Actor {
    protected _type: string;
    protected _conf: any;
    private _duration: number;
    private _state: ItemSourceState;
  
    constructor(x: number, y: number, type: string, player: Player, conf?: any, scale?: number) {
        // TODO: unify all possible ItemSources (Stations, Cages, ...) in Config.
        conf = conf || Config.STATIONS[type];
        scale = scale || Config.STATIONS.CONF.SCALE;
        let w = conf.w * scale;
        let h = conf.h * scale;
    
        super(x, y, w, h);
    
        this._conf = conf;
        this._type = type;
        this._state = ItemSourceState.Normal,
        this._duration = conf.duration;
    
        this.on("pointerdown", (event) => {
            player.goToItemSource(this, this.onPlayerReached );
        });
    }
    
    // TODO: effects or something.
    onPlayerReached(): void {}
  
    onInitialize(engine: ex.Engine): void {
        let tex = Resources.TextureStations;
        let sprite = new ex.Sprite(tex, this._conf.x, this._conf.y, this._conf.w, this._conf.h);
        sprite.scale.setTo(Config.STATIONS.CONF.SCALE, Config.STATIONS.CONF.SCALE);
    
        let brokenSprite = sprite.clone();
        brokenSprite.darken(.5);
    
        this.addDrawing("normal", sprite);
        this.addDrawing("broken", brokenSprite);
    
        this.setDrawing("normal");
    }
  
    public getContent(): string {
        return this._type;
    }
  
    /**
     * How long (ms) it should take to remove an animal from this cage. Less time for small/simple animals, more for bigger or more dangerous ones.
     */
    public getDuration():number {
        return this._duration;
    }
  
    public breakDown(): void {
        this._state = ItemSourceState.Broken;
        this.setDrawing("broken");
    }
  
    public fix(): void {
        this._state = ItemSourceState.Normal;
        this.setDrawing("normal");
    }
  
    public isBroken(): boolean {
        return this._state === ItemSourceState.Broken;
    }
  
    public isReady(): boolean {
        return this._state === ItemSourceState.Normal;
    }

    public getPositionToStand(): ex.Vector {
        return new ex.Vector(this.pos.x - 70, this.pos.y - 20);
    }

    public reset(): void {
        this._state = ItemSourceState.Normal;
        this.setDrawing("normal");
    }
}

export class Animal extends ex.Actor {
    public name: string;
    private _type: string;

    constructor(x: number, y: number, type: string) {
        let conf = Config.ANIMALS.SPRITE[type];
        let scale = Config.ANIMALS.SCALE;

        let w = conf.w * scale;
        let h = conf.h * scale;

        super(x, y, w, h);

        this._type = type;

        for (let i = 0; i < 5; i++) {
            this.actions
                .moveTo(
                ex.Util.randomIntInRange(x - 35, x + 35),
                ex.Util.randomIntInRange(y - 35, y + 35),
                ex.Util.randomIntInRange(10, 20)
                )
                .delay(ex.Util.randomIntInRange(200, 700));
        }
        // Move back to original 
        this.actions.moveTo(x, y, ex.Util.randomIntInRange(10, 20)).delay(ex.Util.randomIntInRange(200, 700));
        this.actions.repeatForever();
    }

    onInitialize(engine: ex.Engine): void {
        let conf = Config.ANIMALS.SPRITE[this._type];
        let tex = Resources.AnimalsSprites;

        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        sprite.scale.setTo(Config.ANIMALS.SCALE, Config.ANIMALS.SCALE);

        this.addDrawing(sprite);
    }

    getType(): string {
        return this._type;
    }
}

export class AnimalCage extends ItemSource {
    private _animals: Array<Animal>;
    private _initialAmount: number;

    constructor(x: number, y: number, type: string, amount: number, player: Player) {
        let conf = Config.TILES.fence;

        super(x, y, type, player, conf, 1);

        this._conf = conf;

        this._animals = [];
        this._initialAmount = amount;
    }

    onInitialize(engine: ex.Engine): void {
        let conf = Config.TILES.fence;
        let tex = Resources.TextureTiles;

        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        this.addDrawing(sprite);

        for (var i = 0; i < this._initialAmount; i++) {
            let animal = new Animal(this.pos.x, this.pos.y, this._type);
            this.scene.add(animal);
            this._animals.push(animal);
            animal.setZIndex(this.getZIndex() - 1 - i);
        }
    }

    isEmpty(): boolean {
        return this._animals.length === 0;
    }

    getContent(): string {
        if (this.isEmpty()) {
            console.warn("Cage is empty, can't get another Animal from here!");
            return "";
        }

        this._animals.pop().kill();

        return super.getContent();
    }

    // TODO: define in config!
    public getDuration():number {
        return 1000;
    }

    reset(): void {
        super.reset();

        for (var i = this._animals.length-1; i < this._initialAmount; i++) {
            let animal = new Animal(this.pos.x, this.pos.y, this._type);
            this.scene.add(animal);
            this._animals.push(animal);
            animal.setZIndex(this.getZIndex() - 1 - i);
        }
    }
}