import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Resources} from "./config/Resources";
import {Player} from "./Player";
import {ProgressBar} from "./ui/Indicator";
import {EffectFactory} from "./Effects"

enum TaskTypes {
    SingleUse = "singleuse",
    MultiUse = "multiuse"
};

enum ItemMobility {
    Stationary = "stationary",
    Random = "random",
    Path = "path"
};

enum SpawnBehaviour {
    AllAtOnce = "allatonce",
    Random = "random",
    EveryXSeconds = "everyxseconds"
};

// TODO
export class TaskIndicator {}

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

    public setZIndex(newIndex: number): void {}

    protected _generateSpawnPoint(setup: any, index?: number): ex.Vector {
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
}

class SingleUseTask extends Task {
    // Place X items of type Y on placements Z (random for now)

    protected taskItems: Array<TaskItem>;
    protected _player: Player;
    protected _callback: () => void;

    constructor(scene: ex.Scene, player: Player, setup: any, callback: () => void) {
        super(scene, player, setup, callback);
        
        let itemTypes = setup.ITEMS;
        let amount = setup.AMOUNT;

        this.taskItems = [];
        this._player = player;
        this._callback = callback;

        for(let i = 0; i < amount; i++) {
            let position = this._generateSpawnPoint(setup, i);
            let itemType = itemTypes[ex.Util.randomIntInRange(0, itemTypes.length-1)];

            let newItem = new SingleUseItem(position, itemType, this.onTaskItemClicked);
            this.taskItems.push(newItem);
            scene.add(newItem);
        }
    }
    
    public cleanup(): void {
        if(this.taskItems && this.taskItems.length > 0) {
            this.taskItems.forEach(taskItem => {
                taskItem.kill();
                this._removeTaskItem(taskItem);
            });
        }
    }

    public setZIndex(newIndex: number): void {
        this.taskItems.forEach(item => {
            item.setZIndex(newIndex);
        });
    }

    /**
     * Make the player go to the clicked-on item and interact with it.
     * Afterwards remove the item from the list and if there's no
     * more left, the task is done.
     * 
     * @param taskItem 
     */
    protected onTaskItemClicked = (taskItem: TaskItem) => {
        this._player.goTo(taskItem.pos, () => {
            taskItem.onPlayerDone();

            this._removeTaskItem(taskItem);

            if (this.taskItems.length === 0) {
                this._callback();
            }
        });
    }

    private _removeTaskItem(taskItem: TaskItem): void {
        let indexOfItem = this.taskItems.indexOf(taskItem);
        this.taskItems.splice(indexOfItem, 1);
    }
}

class MultiUseTask extends Task {
    // Difference between "having to do an action exactly X times"
    // and "having to do an action for X seconds in total in as many parts as you want"?
    // latter: with/without the "progress bar" going "down", as in "having to constantly be on it"???

    protected taskItem: TaskItem;
    protected _player: Player;
    protected _callback: () => void;

    private _nrOfInteractions: number;
    private _requiredNrOfInteractions: number;

    constructor(scene: ex.Scene, player: Player, setup: any, callback: () => void) {
        super(scene, player, setup, callback);

        let itemTypes = setup.ITEMS;
        
        this._nrOfInteractions = 0;
        this._requiredNrOfInteractions = setup.REQUIRED_INTERACTIONS ? setup.REQUIRED_INTERACTIONS : 5;

        this._player = player;
        this._callback = callback;

        let position = this._generateSpawnPoint(setup);
        let itemType = itemTypes[ex.Util.randomIntInRange(0, itemTypes.length-1)];

        this.taskItem = new MultiUseItem(position, itemType, this.onTaskItemClicked);
        scene.add(this.taskItem);
    }

    protected onTaskItemClicked = (taskItem: TaskItem) => {
        this._player.goTo(taskItem.pos, () => {
            this._nrOfInteractions++;

            taskItem.onPlayerProgress(this._nrOfInteractions / this._requiredNrOfInteractions * 100);

            if (this._nrOfInteractions >= this._requiredNrOfInteractions) {
                taskItem.onPlayerDone();
                this.taskItem = null;
                this._callback();
            }
        });
    }
    
    public setZIndex(newIndex: number): void {
        this.taskItem.setZIndex(newIndex);
    }
}


export class TaskItem extends ex.Actor {
    static Mobility = ItemMobility;
    static SpawnBehaviour = SpawnBehaviour;

    protected _type: string;

    constructor(position: ex.Vector,
                type: string,
                callback: (t: TaskItem) => void) {
        let conf = Config.ITEMS[type];

        super(position.x, position.y, conf.w, conf.h);
        this._type = type;

        this.on("pointerdown", (event) => {
            callback(this);
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

    public onPlayerProgress(progress: number): void {}
    public onPlayerDone(): void {}
}

class SingleUseItem extends TaskItem {
    // Click = Item disappears (?), idea is that there are multiple of them

    public onPlayerDone(): void {
        this.kill();
    }
}

// Click = Player should be busy until new target or until a certain amount of time has passed
class MultiUseItem extends TaskItem {
    private _bar: ProgressBar;

    onInitialize(engine: ex.Engine): void {
        super.onInitialize(engine);

        this._bar = new ProgressBar(this.pos, 50, 5);
        engine.add(this._bar);
    }

    public onPlayerProgress(percentageDone: number): void {
        this._bar.set(percentageDone);
    }

    public onPlayerDone(): void {
        this.scene.add(EffectFactory.Make(EffectFactory.Type.Heart, this.pos));
        this._bar.kill();
        this.kill();
    }
}