import * as ex from "excalibur";
import {Player} from "./Player";

export class ItemFactory {
    static create(setup: any, player: Player): Item {
        return new Item("TODO");
    }
}

export class Item {
    private _type: string;

    constructor(type: string) {
        this._type = type;
    }

    public getType(): string {
        return this._type;
    }
}