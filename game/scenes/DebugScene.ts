import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";
import {ProgressBar, FancyProgressBar} from "../ui/Indicator";
import {EffectFactory} from "../Effects";

export class DebugScene extends ex.Scene {

    constructor(engine: ex.Engine) {
        super(engine);
    }

    onInitialize(engine: ex.Engine): void {
        this.testProgressBars();
        this.testEffects();
    }

    testProgressBars() {
        let colorRules = {
            "20": ex.Color.Red,
            "50": ex.Color.Yellow,
            "100": ex.Color.Green
        };

        let left   = new ProgressBar( new ex.Vector(200, 100), 100, 10, 0, colorRules, ex.Color.White, ProgressBar.Mode.FillFromLeft);
        let right  = new ProgressBar( new ex.Vector(200, 200), 100, 10, 0, colorRules, ex.Color.White, ProgressBar.Mode.FillFromRight);
        let center = new ProgressBar( new ex.Vector(200, 300), 100, 10, 0, colorRules, ex.Color.White, ProgressBar.Mode.FillFromCenter);
        let filled = new ProgressBar( new ex.Vector(200, 400), 100, 10, 0, colorRules, ex.Color.White, ProgressBar.Mode.StayFilled);
        let fancy  = new FancyProgressBar(new ex.Vector(200, 500), 100, 10, 10);

        this.add(left);
        this.add(right);
        this.add(center);
        this.add(filled);
        this.add(fancy);

        let val = 0;
        let timer = new ex.Timer(() => {
            left.set(val);
            right.set(val);
            center.set(val);
            filled.set(val);
            fancy.set(val);

            val += 10;
            if(val > 100) {
                val = 0;
            }
        }, 1000, true);

        this.addTimer(timer);
    }

    testEffects() {
        this.add(EffectFactory.Make(
            EffectFactory.Type.Money,
            new ex.Vector(400, 300),
            10
        ));

        this.add(EffectFactory.Make(
            EffectFactory.Type.Heart,
            new ex.Vector(400, 500),
            10
        ));
    }
}