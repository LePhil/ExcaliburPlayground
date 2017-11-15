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

    static Make(type: EffectTypes, pos: ex.Vector): Effect {
        switch (type) {
            case EffectTypes.Heart:
                return new HeartEffect(pos);
            case EffectTypes.Money:
            default:
                return new MoneyEffect(pos);
        }
    }
}

export class Effect extends ex.Actor {
    constructor(pos: ex.Vector) {
        super(pos.x, pos.y, 0, 0);
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
        }, 1500);
    }
}

class MoneyEffect extends Effect {
    onInitialize(engine: ex.Engine): void {
        let emitter = new ex.ParticleEmitter(this.pos.x, this.pos.y, 0, 0);
        emitter.emitterType = ex.EmitterType.Circle;
        emitter.radius = 34;
        emitter.minVel = 41;
        emitter.maxVel = 42;
        emitter.minAngle = 3.6;
        emitter.maxAngle = 5.9;
        emitter.isEmitting = true;
        emitter.emitRate = 10;
        emitter.opacity = 0.4;
        emitter.fadeFlag = true;
        emitter.particleLife = 869;
        emitter.maxSize = 8;
        emitter.minSize = 6;
        emitter.acceleration = new ex.Vector(0, 0);
        emitter.beginColor = ex.Color.Yellow;
        emitter.endColor = ex.Color.Yellow;

        emitter.isEmitting = true;
        this.scene.add(emitter);

        AudioManager.play("Sound_ChaChing");

        setTimeout(() => {
            emitter.kill();
            this.kill();
        }, 500);
    }
}
