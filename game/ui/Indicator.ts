import * as ex from "excalibur";

/**
 * A simple bar, can be filled from 0% to 100%.
 * Colors can be defined, also when to change it.
 */
export class ProgressBar extends ex.Actor {
    private _currentValue: number;
    private _initialValue: number;
    private _colorRules: any;

    constructor(pos: ex.Vector,
                width = 20,
                height = 5,
                initial = 0,
                colorRules = {
                    "20": ex.Color.Red,
                    "50": ex.Color.Yellow,
                    "100": ex.Color.Green
                }) {

        super(pos.x, pos.y, width, height);

        this._currentValue = initial;
        this._initialValue = initial;
        this._colorRules = colorRules;

        this._setColor();
    }

    public set(value:number) {
        this._currentValue = value;
    }

    public update(engine: ex.Engine, delta: number): void {
        super.update(engine, delta);

        this._setColor();
    }

    private _setColor():void {
        Object.keys(this._colorRules).forEach(rule => {
            if(this._currentValue <= +rule) {
                this.color = this._colorRules[rule];
            }
        });
    }

    public reset(): void {
        this._currentValue = this._initialValue;
        this._setColor();
    }
}