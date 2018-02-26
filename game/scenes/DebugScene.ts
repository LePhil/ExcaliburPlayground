import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";
import {AnimalSprite, Graphics} from "../config/Graphics";
import {ProgressBar, FancyProgressBar} from "../ui/Indicator";
import {EffectFactory} from "../Effects";
import {Inventory} from "../Inventory";
import {Player} from "../Player";
import {Button, Pos} from "../ui/Button";
import {IntroDialogue} from "../ui/HTMLDialogue";

export class DebugScene extends ex.Scene {

    constructor(engine: ex.Engine) {
        super(engine);
    }

    onInitialize(engine: ex.Engine): void {
        this.testProgressBars();
        this.testEffects();
        this.testPlayerPlacement();
        this.testColors();
        this.testAquarium();
        this.testHTMLDialogue();
        this.testAnimals();
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

    testHTMLDialogue() {
        let dlg = new IntroDialogue();
        let btn = new Button(Pos.make(800, 200), "Test Dlg", () => {
            dlg.setup({
                TITLE: "Test Dialogue"
            }, () => {
                dlg.hide();
            });
            dlg.show();
        });
        this.add(btn);
    }

    testAquarium() {
        let aqConf = Graphics.AQUARIUM.BIG;
        let aquarium = new ex.Actor(700, 500, aqConf.w, aqConf.h);
        aquarium.addDrawing(Resources.AquariumBig);
        aquarium.anchor.setTo(.5, .5);
        this.add(aquarium);

        let waterbubbles = EffectFactory.Make(
            EffectFactory.Type.Water,
            new ex.Vector(700, 500),
            0,
            false
        );
        this.add(waterbubbles);
        waterbubbles.pause();

        let animalArray = [Config.ANIMALS.WHALE, Config.ANIMALS.NARWHAL, Config.ANIMALS.PENGUIN];
        
        let waterdweller = new ex.UIActor(700, 500, 40, 40);
        waterdweller.anchor.setTo(.5, .5);
        animalArray.forEach(animalName => {
            let animalsprite = AnimalSprite.getRoundOutlineDetails(animalName, 40, 40);
            waterdweller.addDrawing(animalName, animalsprite);
        });
        waterdweller.opacity = 0;
        this.add(waterdweller);

        let getRandomAnimal = () => {
            return animalArray[ex.Util.randomIntInRange(0, animalArray.length - 1)];
        }
        let currentAnimal = "";
        let interactionOpen = false;
        // until https://github.com/excaliburjs/Excalibur/issues/912 is done
        let justcought = false;

        let changeAnimalTimer = new ex.Timer(() => {
            currentAnimal = getRandomAnimal();
            waterdweller.setDrawing(currentAnimal);
        }, 1000, true);

        this.addTimer(changeAnimalTimer);
        changeAnimalTimer.pause();

        aquarium.on("pointerdown", (event) => {
            if(justcought) {
                justcought = false;
                return;
            }
            if (interactionOpen) {
                return;
            } else {
                interactionOpen = true;
            }

            waterbubbles.play();

            currentAnimal = getRandomAnimal();
            waterdweller.setDrawing(currentAnimal);
            waterdweller.opacity = 1;
            changeAnimalTimer.unpause();
        });

        waterdweller.on("pointerdown", (event) => {
            if (!interactionOpen) {
                return;
            }
            // add currently shown animal to inventory :)
            console.log("Cought a ", currentAnimal);
            interactionOpen = false;
            waterdweller.opacity = 0;
            waterbubbles.pause();
            changeAnimalTimer.pause();
            justcought = true;
        });
    }

    testAnimals() {
        let animals = Object.keys(Config.ANIMALS);

        animals.forEach((key, index) => {
            let animal = new ex.UIActor(10 + index*33, 25, 40, 40);
            animal.addDrawing(AnimalSprite.getRoundOutlineDetails(Config.ANIMALS[key], 40, 40));
            this.add(animal);
        });
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
            engine.goToScene("menu");
        }
    }
}
