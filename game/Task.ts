import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";
import {Player} from "./Player";

enum TaskTypes {
    SingleUse = "singleuse",
    MultiUse = "multiuse"
};

enum ItemMobility {
    Stationary = "stationary",
    Mobile = "mobile"
};

export class Task {
    static Type = TaskTypes;
    static Make(scene: ex.Scene,
                player: Player,
                setup: any,
                callback: () => void): Task {

        switch (setup.TYPE) {
            case Task.Type.SingleUse:
                return new SingleUseTask(scene, player, setup, callback);
            case Task.Type.MultiUse:
                return new MultiUseTask(scene, player, setup, callback);
            default:
                return new Task(scene, player, setup, callback);
        }
    }

    protected setup: any;
    protected callback: () => void;

    constructor(scene: ex.Scene, player: Player, setup: any, callback: () => void) {
        this.resetState(setup, callback);
        // create TaskItems depending on setup
    }

    public cleanup(): void {
        // remove all TaskItems
    }

    public resetState(setup: any, callback: () => void) {
        this.setup = setup;
        this.callback = callback;
    }
}

class SingleUseTask extends Task {
    // Place X items of type Y on placements Z (random for now)

    protected taskItems: Array<TaskItem>;
    protected _player: Player;

    constructor(scene: ex.Scene, player: Player, setup: any, callback: () => void) {
        super(scene, player, setup, callback);
        
        let itemType = setup.ITEM;
        let amount = setup.AMOUNT;

        this.taskItems = [];
        this._player = player;

        for(let i = 0; i < amount; i++) {
            let position = this._generateSpawnPoint(setup, i);

            // TODO generate Item from setup
            let newItem = new SingleUseItem(position, itemType, this.onTaskItemClicked);
            this.taskItems.push(newItem);
            scene.add(newItem);
        }
        
    }

    private _generateSpawnPoint(setup: any, index: number): ex.Vector {
        let getRandomX = () => {
            let minX = (Config.GAME.WIDTH - Config.GAME.DEFAULTMAP.W) / 2;
            let maxX = Config.GAME.WIDTH - minX;
            return ex.Util.randomIntInRange(minX, maxX);
        };
        let getRandomY = () => {
            let minY = (Config.GAME.HEIGHT - Config.GAME.DEFAULTMAP.H) / 2;
            let maxY = Config.GAME.HEIGHT - minY;
            return ex.Util.randomIntInRange(minY, maxY);
        };

        if (index && setup.LOCATIONS && setup.LOCATIONS.length >= index) {
            return new ex.Vector(setup.LOCATIONS[index].X, setup.LOCATIONS[index].Y);
        } else if (setup.LOCATIONS && setup.LOCATIONS.length === 1) {
            return new ex.Vector(setup.LOCATIONS[0].X, setup.LOCATIONS[0].Y);
        } else {
            return new ex.Vector( getRandomX(), getRandomY());
        }
    }

    protected onTaskItemClicked() {
        console.log("CLICK!");
    }
}

class MultiUseTask extends Task {
    // Difference between "having to do an action exactly X times" and "having to do an action for X seconds in total in as many parts as you want"?
    // latter: with/without the "progress bar" going "down", as in "having to constantly be on it"???

    constructor(scene: ex.Scene, player: Player, setup: any, callback: () => void) {
        super(scene, player, setup, callback);

        let item = setup.ITEM;
    }
}


export class TaskItem extends ex.Actor {
    static Mobility = ItemMobility;

    protected _type: string;

    constructor(position: ex.Vector, type: string, callback: () => void) {
        let conf = Config.ITEMS[type];

        super(position.x, position.y, conf.w, conf.h);

        this._type = type;

        this.on("pointerdown", (event) => {
            callback();
        });
    }

    onInitialize(engine: ex.Engine): void {
        let conf = Config.ITEMS[this._type];
        let tex = Resources.ItemSpriteSheet;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        let scale = conf.w > conf.h ? Config.ITEMS.CONF.W / conf.w : Config.ITEMS.CONF.H / conf.h;
        sprite.scale.setTo(scale, scale);

        this.addDrawing(sprite);
      }
}

class SingleUseItem extends TaskItem {
    // Click = Item disappears (?), idea is that there are multiple of them
}

class MultiUseItem extends TaskItem {
    // Click = Player should be busy until new target or until a certain amount of time has passed
}