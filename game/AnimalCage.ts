import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";

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

        for(let i = 0; i < 5; i++) {
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
}

export class AnimalCage extends ex.Actor {
    private _animals: Array<Animal>;
    private _initialAmount: number;
    private _animalType: string;

    constructor(x: number, y: number, type: string, amount: number) {
        let conf = Config.TILES.fence;

        super(x, y, conf.w, conf.h);

        this._animals = [];
        this._animalType = type;
        this._initialAmount = amount;
    }

    onInitialize(engine: ex.Engine): void {
        let conf = Config.TILES.fence;
        let tex  = Resources.TextureTiles;

        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
    
        this.addDrawing(sprite);

        for( var i = 0; i < this._initialAmount; i++) {
            let animal = new Animal(this.pos.x, this.pos.y, this._animalType);
            this.scene.add(animal);
            this._animals.push(animal);
            animal.setZIndex(this.getZIndex() - 1 - i);
        }
    }

    reset(): void {
        // TODO: restock animals
    }
}