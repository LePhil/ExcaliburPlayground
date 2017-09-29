declare var globals: any;
import * as ex from "excalibur";
import {Resources} from "./config/Resources";

export class MoneyEffect extends ex.Actor {
    constructor(x, y) {
        super(x, y, 0, 0);
    }

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

        Resources.Sound_ChaChing.play();

        setTimeout(() => {
            emitter.kill();
            this.kill();
        }, 500);
    }
}
