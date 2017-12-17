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

enum ProgressBarColors {
    Blue    = "Blue",
    Green   = "Green",
    Red     = "Red",
    Yellow  = "Yellow",
}

export class FancyProgressBar extends ex.Actor {
    static Color = ProgressBarColors;
    private _colorRules: any;
    
    private _leftPartBG: ex.Actor;
    private _progressBarBG: ex.Actor;
    private _rightPartBG: ex.Actor;

    private _leftPart: ex.Actor;
    private _progressBar: ex.Actor;
    private _rightPart: ex.Actor;

    private _currentValue: number;
    private _initialValue: number;

    // Maybe a object parameter would be easier with > 5 parameters...
    constructor(pos: ex.Vector,
                width = 20,
                height = 5,
                initialPercentage = 0,
                colorRules: any = {
                    "20": ProgressBarColors.Red,
                    "50": ProgressBarColors.Yellow,
                    "100": ProgressBarColors.Green
                }) {

        super(pos.x, pos.y, width, height);

        this._currentValue = initialPercentage;
        this._initialValue = initialPercentage;
        this._colorRules = colorRules;

        this.anchor.setTo(.5, .5);

        let leftPosX = -width/2;
        let rightPosX =  width/2;
        let barPartEndWidth = height/2;
        let midPosX = 0;
        let posY = 0;

        this._progressBarBG = this.createMiddleBG(midPosX, posY, width, height);
        this._leftPartBG = this.createLeftBG(leftPosX, posY, barPartEndWidth, height);
        this._rightPartBG = this.createRightBG(rightPosX, posY, barPartEndWidth, height);

        this._progressBar = this.createMiddleBar(leftPosX, posY, width, height);
        this._leftPart = this.createLeftBar(leftPosX, posY, barPartEndWidth, height);
        this._rightPart = this.createRightBar(this.calcXfromPercentage(initialPercentage), posY, width, height);

        this.add(this._progressBarBG);
        this.add(this._leftPartBG);
        this.add(this._rightPartBG);

        this.add(this._progressBar);
        this.add(this._leftPart);
        this.add(this._rightPart);

        this.set(initialPercentage);
    }

    calcXfromPercentage(newPercentage: number): number {
        return (newPercentage/100 * this.getWidth()) - this.getWidth()/2;
    }

    calcWidthFromPercentage(newPercentage: number): number {
        return (newPercentage/100 * this.getWidth());
    }

    createLeftBG(x, y, w, h): ex.Actor {
        let conf = Graphics.UI.barBack_horizontalLeft;
        let tex = Resources.UIRPGSpriteSheet;

        let elem = new ex.Actor(x, y, w, h);

        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        let scale = h/conf.h;
        sprite.scale.setTo(scale, scale);
        elem.addDrawing(sprite);
        elem.anchor.setTo(1, .5);
        return elem;
    }
    createMiddleBG(x, y, w, h): ex.Actor {
        let conf = Graphics.UI.barBack_horizontalMid;
        let tex = Resources.UIRPGSpriteSheet;

        let elem = new ex.Actor(x, y, w, h);

        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        let scaleX = w/conf.w;
        let scaleY = h/conf.h;
        sprite.scale.setTo(scaleX, scaleY);
        elem.addDrawing(sprite);
        elem.anchor.setTo(.5, .5);
        return elem;
    }
    createRightBG(x, y, w, h): ex.Actor {
        let conf = Graphics.UI.barBack_horizontalRight;
        let tex = Resources.UIRPGSpriteSheet;

        let elem = new ex.Actor(x, y, w, h);

        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        let scale = h/conf.h;
        sprite.scale.setTo(scale, scale);
        elem.addDrawing(sprite);
        elem.anchor.setTo(0, .5);
        return elem;
    }

    addDrawingByColorAndPart(elem: ex.Actor, colorName: string, partName: string, h: number, w?: number): void {
        let conf = Graphics.UI[`bar${colorName}_horizontal${partName}`];
        let tex = Resources.UIRPGSpriteSheet;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);
        let scaleY = h/conf.h;
        let scaleX = scaleY;
        if (w) {
            scaleX = w/conf.w;
        }
        sprite.scale.setTo(scaleX, scaleY);
        elem.addDrawing(colorName, sprite);
    }

    createLeftBar(x, y, w, h): ex.Actor {
        let elem = new ex.Actor(x, y, w, h);
        elem.anchor.setTo(1, .5);
        
        for (let colorName in ProgressBarColors) {
            this.addDrawingByColorAndPart(elem, colorName, "Left", h);
        }

        return elem;
    }
    createMiddleBar(x, y, w, h): ex.Actor {
        let elem = new ex.Actor(x, y, w, h);
        elem.anchor.setTo(0, .5);

        for (let colorName in ProgressBarColors) {
            this.addDrawingByColorAndPart(elem, colorName, "Mid", h, w);
        }
        return elem;
    }
    createRightBar(x, y, w, h): ex.Actor {
        let elem = new ex.Actor(x, y, w, h);
        elem.anchor.setTo(0, .5);
        
        for (let colorName in ProgressBarColors) {
            this.addDrawingByColorAndPart(elem, colorName, "Right", h);
        }

        return elem;
    }

    public set(newPercentage:number) {
        this._currentValue = newPercentage;
        this._setColor();

        let width = this.getWidth();

        this._progressBar.setWidth(this.calcWidthFromPercentage(newPercentage));
        let scaleY = this._progressBar.currentDrawing.scale.y;
        this._progressBar.currentDrawing.scale.setTo(this.calcWidthFromPercentage(newPercentage)/18, scaleY);
        this._rightPart.pos.x = this.calcXfromPercentage(newPercentage);

    }

    private _setColor():void {
        let fittingColorRules = Object.keys(this._colorRules).filter(rule => this._currentValue <= +rule);

        if (fittingColorRules.length > 0) {
            this._leftPart.setDrawing(this._colorRules[fittingColorRules[0]]);
            this._progressBar.setDrawing(this._colorRules[fittingColorRules[0]]);
            this._rightPart.setDrawing(this._colorRules[fittingColorRules[0]]);
        }
    }
    
    public reset(): void {
        this._currentValue = this._initialValue;
        this._setColor();
    }

    public setZIndex(newIndex: number): void {
        this._progressBarBG.setZIndex(newIndex);
        this._leftPartBG.setZIndex(newIndex);
        this._rightPartBG.setZIndex(newIndex);

        this._progressBar.setZIndex(newIndex+1);
        this._leftPart.setZIndex(newIndex+1);
        this._rightPart.setZIndex(newIndex+1);
    }
}