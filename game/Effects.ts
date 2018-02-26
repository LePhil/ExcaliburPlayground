import * as ex from "excalibur";
import {AudioManager} from "./AudioManager";
import {Resources} from "./config/Resources";
import {Config} from "./config/Config";

export enum EffectTypes {
    Heart = "heart",
    Money = "money",
    Firework = "firework",
    Snow = "snow",
    Rain = "rain",
    Water = "water",
    None = "none"
}

export class EffectFactory {
    static Type = EffectTypes;

    static Make(type: EffectTypes,
                pos: ex.Vector = new ex.Vector(Config.GAME.WIDTH/2, Config.GAME.HEIGHT/2),
                duration_s = 1,
                autoplay = true): Effect {

        switch (type) {
            case EffectTypes.None:
                return new NoopEffect();
            case EffectTypes.Heart:
                return new HeartEffect(pos, duration_s, autoplay);
            case EffectTypes.Firework:
                return new FireworkEffect(pos, duration_s, autoplay);
            case EffectTypes.Snow:
                return new SnowEffect(pos, duration_s, autoplay);
            case EffectTypes.Rain:
                return new RainEffect(pos, duration_s, autoplay);
            case EffectTypes.Water:
                return new WaterBubbleEffect(pos, duration_s, autoplay);
            case EffectTypes.Money:
            default:
                return new MoneyEffect(pos, duration_s, autoplay);
        }
    }
}

export class Effect extends ex.Actor {
    protected _duration: number;
    protected _autoplay: boolean;
    protected emitter: ex.ParticleEmitter;

    constructor(pos: ex.Vector, duration: number, autoplay: boolean) {
        super(pos.x, pos.y, 0, 0);
        this._duration = duration;
        this._autoplay = autoplay;
    }

    public pause():void {
        if (this.emitter) {
            this.emitter.isEmitting = false;
        }
    }

    public play():void {
        if (this.emitter) {
            this.emitter.isEmitting = true;
        }
    }
}

class NoopEffect extends Effect {
    constructor() {
        super(new ex.Vector(0,0), 0, false);
    }
    public play(): void {};
}

class WaterBubbleEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        console.log("init water effect");
        this.emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);

        this.emitter.emitterType = ex.EmitterType.Circle;
        this.emitter.radius = 14;
        this.emitter.minVel = 19;
        this.emitter.maxVel = 90;
        this.emitter.minAngle = 0;
        this.emitter.maxAngle = 6.2;
        this.emitter.emitRate = 84;
        this.emitter.opacity = 0.5;
        this.emitter.fadeFlag = false;
        this.emitter.particleLife = 1328;
        this.emitter.maxSize = 17;
        this.emitter.minSize = 1;
        this.emitter.startSize = 1;
        this.emitter.endSize = 12;
        this.emitter.acceleration = new ex.Vector(0, 0);
        this.emitter.beginColor = ex.Color.Blue;
        this.emitter.endColor = ex.Color.Transparent;
        this.emitter.isEmitting = this._autoplay;

        this.scene.add(this.emitter);

        if (this._duration > 0) {
            setTimeout(() => {
                    this.emitter.isEmitting = false;
                    this.emitter.kill();
                    this.kill();
                }, this._duration * 1000
            );
        }
    }
}

class HeartEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        let tex  = Resources.HUDSpriteSheet;
        let conf = Config.HUD.hud_heartFull;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        this.emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);

        this.emitter.particleSprite = sprite;
        this.emitter.radius = 60;        
        this.emitter.minVel = 30;
        this.emitter.maxVel = 50;
        this.emitter.minAngle = 3.6;
        this.emitter.maxAngle = 5.9;
        this.emitter.emitRate = 10;
        this.emitter.opacity = 0.4;
        this.emitter.fadeFlag = true;
        this.emitter.particleLife = 1000;
        this.emitter.maxSize = .6;
        this.emitter.minSize = .3;
        this.emitter.acceleration = new ex.Vector(0, 0);

        // TODO: some kind of bubbly sound for the hearts?
        //AudioManager.play("Sound_Fireworks");

        this.emitter.isEmitting = this._autoplay;
        this.scene.add(this.emitter);

        if (this._duration > 0) {
            setTimeout(() => {
                this.emitter.isEmitting = false;
                this.emitter.kill();
                this.kill();
            }, this._duration * 1000);
        }
    }
}

class MoneyEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        let tex  = Resources.HUDSpriteSheet;
        let conf = Config.HUD.hud_coins;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        this.emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);

        this.emitter.particleSprite = sprite;
        this.emitter.emitterType = ex.EmitterType.Circle;
        this.emitter.radius = 60;        
        this.emitter.minVel = 20;
        this.emitter.maxVel = 60;
        this.emitter.minAngle = 3.6;
        this.emitter.maxAngle = 5.9;
        this.emitter.isEmitting = true;
        this.emitter.emitRate = 15;
        this.emitter.opacity = 0.4;
        this.emitter.fadeFlag = true;
        this.emitter.particleLife = 1000;
        this.emitter.maxSize = .6;
        this.emitter.minSize = .3;
        this.emitter.acceleration = new ex.Vector(0, 0);

        this.emitter.isEmitting = true;
        this.scene.add(this.emitter);

        AudioManager.play("Sound_ChaChing");

        setTimeout(() => {
            this.emitter.kill();
            this.kill();
        }, this._duration * 1000);
    }
}

enum FireworkSize {
    Big = "big",
    Small = "small"
};
// One big "explosion" on the original position and some minor ones on random positions
class FireworkEffect extends Effect {
    protected _duration: number;
    protected _size: FireworkSize;
    
    constructor(pos: ex.Vector, duration: number, autoplay: boolean,  size: FireworkSize = FireworkSize.Big) {
        super(pos, duration, autoplay);
        this._duration = duration;
        this._size = size;
    }

    onInitialize(engine: ex.Engine): void {
        let colors = [
            ex.Color.Red,
            ex.Color.Blue,
            ex.Color.Green,
            ex.Color.Rose,
            ex.Color.Yellow,
            ex.Color.Violet
        ];

        this.emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);
        this.emitter.emitterType = ex.EmitterType.Circle;

        if (this._size === FireworkSize.Big) {
            this.emitter.radius = 6;
            this.emitter.minVel = 90;
            this.emitter.maxVel = 200;
            this.emitter.maxSize = 9;
            this.emitter.minSize = 3;
            this.emitter.startSize = 9;
            this.emitter.endSize = 8;
            this.emitter.emitRate = 179;
        } else {
            this.emitter.radius = 3;
            this.emitter.minVel = 60;
            this.emitter.maxVel = 170;
            this.emitter.maxSize = 7;
            this.emitter.minSize = 2;
            this.emitter.startSize = 7;
            this.emitter.endSize = 6;
            this.emitter.emitRate = 150;
        }

        this.emitter.minAngle = 0;
        this.emitter.maxAngle = 6.2;
        this.emitter.isEmitting = true;
        this.emitter.opacity = 0.5;
        this.emitter.fadeFlag = true;
        this.emitter.particleLife = 1000;
        this.emitter.acceleration = new ex.Vector(0, 0);
        this.emitter.beginColor = colors[ex.Util.randomIntInRange(0, colors.length - 1)];
        this.emitter.endColor = ex.Color.Transparent;
        
        this.scene.add(this.emitter);
        this.setZIndex(Config.ZINDICES.EFFECTS);

        if (this._size === FireworkSize.Big) {
            AudioManager.play("Sound_Fireworks");

            // create a random number of smaller fireworks that get
            // created after a random delay at a random position
            // with a random duration that's short than the big ones.
            let nrOfTinyFireworks = ex.Util.randomIntInRange(3, 8);
            for(let i = 0; i < nrOfTinyFireworks; i++) {
                let randomPos = Config.GetRandomPosition();
                let randomDuration = ex.Util.randomInRange(.4 * this._duration, .8 * this._duration);
                let randomStart = ex.Util.randomInRange(0, .4 * this._duration);

                setTimeout(() => {
                    let tinyOne = new FireworkEffect(
                        randomPos,
                        randomDuration,
                        this._autoplay,
                        FireworkSize.Small
                    );
                    this.scene.add(tinyOne);
                }, randomStart * 1000);
            }
        }

        setTimeout(() => {
            this.emitter.kill();
            this.kill();
        }, this._duration * 1000);
    }
}

class SnowEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        this.emitter = new ex.ParticleEmitter(0, 0, Config.GAME.WIDTH, Config.GAME.HEIGHT);
        this.emitter.emitterType = ex.EmitterType.Rectangle;
        this.emitter.minVel = 100;
        this.emitter.maxVel = 200;
        this.emitter.minAngle = 2.6;
        this.emitter.maxAngle = 2.6;
        this.emitter.emitRate = 173;
        this.emitter.opacity = 1;
        this.emitter.fadeFlag = true;
        this.emitter.particleLife = 2617;
        this.emitter.maxSize = 7;
        this.emitter.minSize = 1;
        this.emitter.startSize = 0;
        this.emitter.endSize = 0;
        this.emitter.acceleration = new ex.Vector(0, 16);
        this.emitter.beginColor = ex.Color.White;
        this.emitter.endColor = ex.Color.Transparent;

        this.emitter.isEmitting = this._autoplay;
        this.scene.add(this.emitter);
    }
}

class RainEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        this.emitter = new ex.ParticleEmitter(0, 0, Config.GAME.WIDTH, Config.GAME.HEIGHT);
        this.emitter.emitterType = ex.EmitterType.Rectangle;
        this.emitter.radius = 167;
        this.emitter.minVel = 522;
        this.emitter.maxVel = 569;
        this.emitter.minAngle = 0.9;
        this.emitter.maxAngle = 0.9;
        this.emitter.emitRate = 173;
        this.emitter.opacity = 1;
        this.emitter.fadeFlag = true;
        this.emitter.particleLife = 2617;
        this.emitter.maxSize = 4;
        this.emitter.minSize = 1;
        this.emitter.startSize = 2;
        this.emitter.endSize = 2;
        this.emitter.acceleration = new ex.Vector(0, 37);
        this.emitter.beginColor = ex.Color.Blue;
        this.emitter.endColor = ex.Color.Transparent;

        this.emitter.isEmitting = this._autoplay;
        this.scene.add(this.emitter);
    }
}
