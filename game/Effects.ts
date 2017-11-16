import * as ex from "excalibur";
import {AudioManager} from "./AudioManager";
import {Resources} from "./config/Resources";
import {Config} from "./config/Config";

enum EffectTypes {
    Heart = "heart",
    Money = "money"
}

export class EffectFactory {
    static Type = EffectTypes;

    static Make(type: EffectTypes,
                pos: ex.Vector,
                duration_s = 1): Effect {

        switch (type) {
            case EffectTypes.Heart:
                return new HeartEffect(pos, duration_s);
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
