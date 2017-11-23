import * as ex from "excalibur";
import {Resources} from "../config/Resources";
import {Graphics} from "../config/Graphics";
import {Config} from "../config/Config";

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
                backgroundColor = ex.Color.Transparent,
                fillMode = ProgressBar.Mode.FillFromLeft ) {

        super(pos.x, pos.y, width, height, backgroundColor);

        this._currentValue = initial;
        this._initialValue = initial;
        this._colorRules = colorRules;
        this._fillMode = fillMode;
        this.color = backgroundColor;

        this._progressBar = new ex.Actor(-width/2, 0, 0, height, ex.Color.White );

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
                this._progressBar.pos.x = 0;
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

export class FancyProgressBar extends ex.Actor {
    static Mode = ProgressBarFillMode;
    
        private _leftPart: ex.Actor;
        private _middlePart: ex.Actor;
        private _rightPart: ex.Actor;

        private _currentValue: number;
        private _initialValue: number;
        private _fillMode: ProgressBarFillMode;
    
        // Maybe a object parameter would be easier with > 5 parameters...
        constructor(pos: ex.Vector,
                    width = 20,
                    height = 5,
                    initial = 0) {
    
            super(pos.x, pos.y, width, height);

            this._currentValue = initial;
            this._initialValue = initial;

            this.anchor.setTo(.5, .5);

            let leftPosX = -width/2;
            let rightPosX =  width/2;
            let midPosX = 0;
            let posY = 0;
    
            this.add(this.createMiddleBG(midPosX, posY, width));
            this.add(this.createLeftBG(leftPosX, posY));
            this.add(this.createRightBG(rightPosX, posY));
    

            this._middlePart = this.createMiddleBar(midPosX, posY, this.calcWidthFromValue(initial), width);
            this._leftPart = this.createLeftBar(leftPosX, posY);
            this._rightPart = this.createRightBar(this.calcXfromValue(initial), posY);

            this.add(this._middlePart);
            this.add(this._leftPart);
            this.add(this._rightPart);
        }

        calcXfromValue(newPercentage: number): number {
            return (newPercentage/100 * this.getWidth()) - this.getWidth()/2;
        }

        calcWidthFromValue(newPercentage: number): number {
            return (newPercentage/100 * this.getWidth());
        }

        onInitialize(engine: ex.Engine): void {
        }

        createLeftBG(x, y): ex.Actor {
            let conf = Graphics.UI.barBack_horizontalLeft;
            let tex = Resources.UIRPGSpriteSheet;

            let elem = new ex.Actor(x, y, conf.w, conf.h);
    
            let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
            elem.addDrawing(sprite);
            elem.anchor.setTo(1, .5);
            return elem;
        }
        createMiddleBG(x, y, w): ex.Actor {
            let conf = Graphics.UI.barBack_horizontalMid;
            let tex = Resources.UIRPGSpriteSheet;

            let elem = new ex.Actor(x, y, w, conf.h);
    
            let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
            let scaleX = w/conf.w;
            sprite.scale.setTo(scaleX, 1);
            elem.addDrawing(sprite);
            elem.anchor.setTo(.5, .5);
            return elem;
        }
        createRightBG(x, y): ex.Actor {
            let conf = Graphics.UI.barBack_horizontalRight;
            let tex = Resources.UIRPGSpriteSheet;

            let elem = new ex.Actor(x, y, conf.w, conf.h);
    
            let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
            elem.addDrawing(sprite);
            elem.anchor.setTo(0, .5);
            return elem;
        }

        createLeftBar(x, y): ex.Actor {
            let conf = Graphics.UI.barRed_horizontalLeft;
            let tex = Resources.UIRPGSpriteSheet;

            let elem = new ex.Actor(x, y, conf.w, conf.h);
    
            let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
            elem.addDrawing(sprite);
            elem.anchor.setTo(1, .5);
            return elem;
        }
        createMiddleBar(x, y, initialWidth, maxWidth): ex.Actor {
            let conf = Graphics.UI.barRed_horizontalMid;
            let tex = Resources.UIRPGSpriteSheet;

            let elem = new ex.Actor(x, y, initialWidth, conf.h);
    
            let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
            let scaleX = maxWidth/conf.w;
            sprite.scale.setTo(scaleX, 1);
            elem.addDrawing(sprite);
            elem.anchor.setTo(0, .5);
            return elem;
        }
        createRightBar(x, y): ex.Actor {
            let conf = Graphics.UI.barRed_horizontalRight;
            let tex = Resources.UIRPGSpriteSheet;

            let elem = new ex.Actor(x, y, conf.w, conf.h);
    
            let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
            elem.addDrawing(sprite);
            elem.anchor.setTo(0, .5);
            return elem;
        }
    
        public set(newPercentage:number) {
            this._currentValue = newPercentage;
   
            let width = this.getWidth();

            this._middlePart.setWidth(this.calcWidthFromValue(newPercentage));
            this._middlePart.currentDrawing.scale.setTo(this.calcWidthFromValue(newPercentage)/18, 1);
            this._rightPart.pos.x = this.calcXfromValue(newPercentage);
        }
    
        public reset(): void {
            this._currentValue = this._initialValue;

        }
}