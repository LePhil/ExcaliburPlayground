import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";
import {ProgressBar, FancyProgressBar} from "../ui/Indicator";
import {EffectFactory} from "../Effects";
import {Inventory} from "../Inventory";
import {Player} from "../Player";
import {EndGameScene} from "./EndGameScene";

export class DebugOutroScene extends ex.Scene {
    private outro: EndGameScene;

    constructor(engine: ex.Engine, outro: EndGameScene) {
        super(engine);

        this.outro = outro;
    }

    onInitialize(engine: ex.Engine): void {}

    onActivate() {
        let setup = {
            NAME: "Test",
            OUTRO: ["Well done!"],
            OUTRO_FAILED: ["You failed the Task :("]
        };
        let passed = false;

        this.outro.load(setup, 90, passed, () => {this.engine.goToScene("menu")});
        this.engine.goToScene("end");
    }
}

export class DebugScene extends ex.Scene {

    constructor(engine: ex.Engine) {
        super(engine);
    }

    onInitialize(engine: ex.Engine): void {
        this.testProgressBars();
        this.testEffects();
        this.testPlayerPlacement();
        this.testColors();
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
        let fancy  = new FancyProgressBar(new ex.Vector(200, 500), 100, 18, 0);
        let tiny   = new FancyProgressBar(new ex.Vector(200, 520), 40, 5, 0);
        let hjuge  = new FancyProgressBar(new ex.Vector(200, 560), 300, 50, 0);

        this.add(left);
        this.add(right);
        this.add(center);
        this.add(filled);
        this.add(fancy);
        this.add(tiny);
        this.add(hjuge);

        let val = 0;
        let timer = new ex.Timer(() => {
            left.set(val);
            right.set(val);
            center.set(val);
            filled.set(val);
            fancy.set(val);
            tiny.set(val);
            hjuge.set(val);

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

    testPlayerPlacement() {
        let square = new ex.Actor(500, 500, Config.PLAYER.WIDTH, Config.PLAYER.HEIGHT, ex.Color.Red);
        square.anchor.setTo(.5, .5);
        this.add(square);

        let inv = new Inventory();
        let player = new Player(inv);
        this.add(player);
        player.pos.setTo(500, 500);

    }

    testColors() {
        let colors = [
            ex.Color.Azure,
            ex.Color.Black,
            ex.Color.Blue,
            ex.Color.Chartreuse,
            ex.Color.Cyan,
            ex.Color.DarkGray,
            ex.Color.Gray,
            ex.Color.Green,
            ex.Color.LightGray,
            ex.Color.Magenta,
            ex.Color.Orange,
            ex.Color.Red,
            ex.Color.Rose,
            ex.Color.Transparent,
            ex.Color.Vermillion,
            ex.Color.Violet,
            ex.Color.Viridian,
            ex.Color.White,
            ex.Color.Yellow
        ];

        colors.forEach((color, index) => {
            let square = new ex.Actor(10 + index*10, 10, 10, 10, color);
            this.add(square);
        });
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
            engine.goToScene("menu");
        }
    }
}
