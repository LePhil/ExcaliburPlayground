import * as ex from "excalibur";
import {Config} from "./config/Config";

enum TaskTypes {
    SingleUse = "singleuse",
    MultiUse = "multiuse"
};

export class Task {
    static Type = TaskTypes;

    protected callback: () => void;

    constructor(callback: () => void) {
        this.callback = callback;

        // create TaskItems depending on setup
    }

    public cleanup(): void {
        // remove all taskItems
    }
}

class SingleUseTask extends Task {
    // Place X items of type Y on placements Z (random for now)

    protected taskItems: Array<TaskItem>;

    constructor(setup: any, callback: () => void) {
        super(callback);
        
        let item = setup.ITEM;
        let amount = setup.AMOUNT;

        this.taskItems = [];

        for(let i = 0; i < amount; i++) {
            // TODO generate Item from setup
            this.taskItems.push(new ex.Actor());
        }
        
    }
}

class MultiUseTask extends Task {
    // Difference between "having to do an action exactly X times" and "having to do an action for X seconds in total in as many parts as you want"?
    // latter: with/without the "progress bar" going "down", as in "having to constantly be on it"???

    constructor(setup: any, callback: () => void) {
        super(callback);

        let item = setup.ITEM;
    }
}


class TaskItem extends ex.Actor {
    constructor(x, y) {
        super(x, y, Config.CASSA.W, Config.CASSA.H);
    }

    onInitialize(engine: ex.Engine): void {

    }
}

class SingleUseItem extends TaskItem {
    // Click = Item disappears (?), idea is that there are multiple of them
}

class MultiUseItem extends TaskItem {
    // Click = Player should be busy until new target or until a certain amount of time has passed
}