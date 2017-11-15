import * as ex from "excalibur";

/**
 * A simple bar, can be filled from 0% to 100%.
 * Colors can be defined, also when to change it.
 */
export class ProgressBar extends ex.Actor {
    private _progressBar: ex.Actor;
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
                },
                backgroundColor = ex.Color.White) {

        super(pos.x, pos.y, width, height, backgroundColor);

        this._currentValue = initial;
        this._initialValue = initial;
        this._colorRules = colorRules;

        this._progressBar = new ex.Actor(-width/2, 0, 0, height, ex.Color.White );
        this._progressBar.anchor.setTo(0, .5);
        this.add(this._progressBar);
        
        this._setColor();
    }

    public set(newPercentage:number) {
        this._currentValue = newPercentage;
        this._progressBar.setWidth(newPercentage/100 * this.getWidth());
        this._setColor();
    }

    private _setColor():void {
        let fittingColorRules = Object.keys(this._colorRules).filter(rule => this._currentValue <= +rule);

        if (fittingColorRules.length > 0) {
            this._progressBar.color = this._colorRules[fittingColorRules[0]];
        }
    }

    public reset(): void {
        this._currentValue = this._initialValue;
        this._setColor();
    }
}