import * as ex from "excalibur";

enum ProgressBarFillMode {
    FillFromLeft = "fromleft",
    FillFromRight = "fromright",
    FillFromCenter = "fromcenter",
    StayFilled = "stayfilled"
}

/**
 * A simple bar, can be filled from 0% to 100%.
 * Colors can be defined, also when to change it.
 */
export class ProgressBar extends ex.Actor {
    static Mode = ProgressBarFillMode;

    private _progressBar: ex.Actor;
    private _currentValue: number;
    private _initialValue: number;
    private _colorRules: any;
    private _fillMode: ProgressBarFillMode;

    // Maybe a object parameter would be easier with > 5 parameters...
    constructor(pos: ex.Vector,
                width = 20,
                height = 5,
                initial = 0,
                colorRules: any = {
                    "20": ex.Color.Red,
                    "50": ex.Color.Yellow,
                    "100": ex.Color.Green
                },
                backgroundColor = ex.Color.White,
                fillMode = ProgressBar.Mode.FillFromLeft ) {

        super(pos.x, pos.y, width, height, backgroundColor);

        this._currentValue = initial;
        this._initialValue = initial;
        this._colorRules = colorRules;
        this._fillMode = fillMode;

        this._progressBar = new ex.Actor(-width/2, 0, 0, height, ex.Color.Transparent );

        // TODO: fillmodes don't work as intended yet.
        switch (fillMode) {
            case ProgressBar.Mode.FillFromRight:
                this._progressBar.pos.x = width/2;
                this._progressBar.anchor.setTo(1, .5);
                break;
            case ProgressBar.Mode.FillFromCenter:
                this._progressBar.pos.x = 0;
                this._progressBar.anchor.setTo(.5, .5);
                break;
            case ProgressBar.Mode.StayFilled:
                this._progressBar.setWidth(width);
                break;
            case ProgressBar.Mode.FillFromLeft:
            default:
                this._progressBar.anchor.setTo(0, .5);
                break;
        }
        this.add(this._progressBar);
        
        this._setColor();
    }

    public set(newPercentage:number) {
        this._currentValue = newPercentage;

        if (this._fillMode !== ProgressBarFillMode.StayFilled) {
            this._progressBar.setWidth(newPercentage/100 * this.getWidth());
        }
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