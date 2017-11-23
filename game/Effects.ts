import * as ex from "excalibur";
import {AudioManager} from "./AudioManager";
import {Resources} from "./config/Resources";
import {Config} from "./config/Config";

enum EffectTypes {
    Heart = "heart",
    Money = "money",
    Firework = "firework"
}

export class EffectFactory {
    static Type = EffectTypes;

    static Make(type: EffectTypes,
                pos: ex.Vector,
                duration_s = 1): Effect {

        switch (type) {
            case EffectTypes.Heart:
                return new HeartEffect(pos, duration_s);
            case EffectTypes.Firework:
                return new FireworkEffect(pos, duration_s);
            case EffectTypes.Money:
            default:
                return new MoneyEffect(pos, duration_s);
        }
    }
}

export class Effect extends ex.Actor {
    protected _duration: number;

    constructor(pos: ex.Vector, duration: number) {
        super(pos.x, pos.y, 0, 0);
        this._duration = duration;
    }
}

class HeartEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        let tex  = Resources.HUDSpriteSheet;
        let conf = Config.HUD.hud_heartFull;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        let emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);

        emitter.particleSprite = sprite;
        emitter.radius = 60;        
        emitter.minVel = 30;
        emitter.maxVel = 50;
        emitter.minAngle = 3.6;
        emitter.maxAngle = 5.9;
        emitter.isEmitting = true;
        emitter.emitRate = 10;
        emitter.opacity = 0.4;
        emitter.fadeFlag = true;
        emitter.particleLife = 1000;
        emitter.maxSize = .6;
        emitter.minSize = .3;
        emitter.acceleration = new ex.Vector(0, 0);

        // TODO: some kind of bubbly sound for the hearts?
        //AudioManager.play("Sound_Fireworks");

        emitter.isEmitting = true;
        this.scene.add(emitter);

        setTimeout(() => {
            emitter.isEmitting = false;
            emitter.kill();
            this.kill();
        }, this._duration * 1000);
    }
}

class MoneyEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        let tex  = Resources.HUDSpriteSheet;
        let conf = Config.HUD.hud_coins;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        let emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);

        emitter.particleSprite = sprite;
        emitter.emitterType = ex.EmitterType.Circle;
        emitter.radius = 60;        
        emitter.minVel = 20;
        emitter.maxVel = 60;
        emitter.minAngle = 3.6;
        emitter.maxAngle = 5.9;
        emitter.isEmitting = true;
        emitter.emitRate = 15;
        emitter.opacity = 0.4;
        emitter.fadeFlag = true;
        emitter.particleLife = 1000;
        emitter.maxSize = .6;
        emitter.minSize = .3;
        emitter.acceleration = new ex.Vector(0, 0);

        emitter.isEmitting = true;
        this.scene.add(emitter);

        AudioManager.play("Sound_ChaChing");

        setTimeout(() => {
            emitter.kill();
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
    
    constructor(pos: ex.Vector, duration: number, size: FireworkSize = FireworkSize.Big) {
        super(pos, duration);
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

        let emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y);
        emitter.emitterType = ex.EmitterType.Circle;

        if (this._size === FireworkSize.Big) {
            emitter.radius = 6;
            emitter.minVel = 90;
            emitter.maxVel = 200;
            emitter.maxSize = 9;
            emitter.minSize = 3;
            emitter.startSize = 9;
            emitter.endSize = 8;
            emitter.emitRate = 179;
        } else {
            emitter.radius = 3;
            emitter.minVel = 60;
            emitter.maxVel = 170;
            emitter.maxSize = 7;
            emitter.minSize = 2;
            emitter.startSize = 7;
            emitter.endSize = 6;
            emitter.emitRate = 150;
        }

        emitter.minAngle = 0;
        emitter.maxAngle = 6.2;
        emitter.isEmitting = true;
        emitter.opacity = 0.5;
        emitter.fadeFlag = true;
        emitter.particleLife = 1000;
        emitter.acceleration = new ex.Vector(0, 0);
        emitter.beginColor = colors[ex.Util.randomIntInRange(0, colors.length - 1)];
        emitter.endColor = ex.Color.Transparent;
        
        this.scene.add(emitter);
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
                        FireworkSize.Small
                    );
                    this.scene.add(tinyOne);
                }, randomStart * 1000);
            }
        }

        setTimeout(() => {
            emitter.kill();
            this.kill();
        }, this._duration * 1000);
    }
}