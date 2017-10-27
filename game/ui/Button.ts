import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class Pos {
    static make(obj:any, y?:number) {
        return new Pos(obj, y);
    }

    x: number;
    y: number;

    constructor(obj:any, y?:number) {
        if (typeof obj === "number" && y) {
            this.x = obj;
            this.y = y;
        } else {
            this.x = obj.X ? obj.X : obj.x;
            this.y = obj.Y ? obj.Y : obj.y;
        }
    }
}

export class Button extends ex.UIActor {
    constructor(position: Pos,
                public text: string,
                public action: () => void,
                w = Config.GAME.UI.BUTTON.W,
                h = Config.GAME.UI.BUTTON.H,
                sprite = Resources.ImgButton.asSprite()) {

        super(position.x, position.y, w, h);

        this.anchor.setTo(.5, .5);

        let scaleX = w/Config.GAME.UI.BUTTON.W,
            scaleY = h/Config.GAME.UI.BUTTON.H;

        // TODO: doesn't seem to work!
        sprite.scale.setTo(scaleX, scaleY);
        this.addDrawing(sprite);
        let fontSize = Config.GAME.UI.FONTSIZE;
        let label = new ex.Label(text, 0, fontSize/2);
        label.fontSize = fontSize;
        label.color = ex.Color.White;
        label.textAlign = ex.TextAlign.Center;
        label.anchor.setTo(.5, .5);
        this.add(label);
        
        this.on("pointerup", () => this.action());
    }

    public getTotalHeight(): number {
        return Config.GAME.UI.BUTTON.H;
    }
}

export class Checkbox extends ex.UIActor {
    private _isChecked: boolean;

    constructor(position: Pos,
                public text: string,
                public action: () => void,
                checked = false,
                w = Config.GAME.UI.CHECKBOX.W,
                h = Config.GAME.UI.CHECKBOX.H) {

        super(position.x, position.y, w, h);

        this._isChecked = checked;
        this.anchor.setTo(0, .5);

        let scaleX = w/Config.GAME.UI.BUTTON.W,
            scaleY = h/Config.GAME.UI.BUTTON.H;

        let spriteChecked   = Resources.ImgCheckboxChecked.asSprite()
        let spriteUnchecked = Resources.ImgCheckboxUnchecked.asSprite()

        this.addDrawing("checked", spriteChecked);
        this.addDrawing("unchecked", spriteUnchecked);

        let fontSize = Config.GAME.UI.FONTSIZE;
        let label = new ex.Label(text, w + Config.GAME.UI.GUTTER, fontSize/2);
        label.fontSize = fontSize;
        label.color = ex.Color.White;
        label.textAlign = ex.TextAlign.Left;
        label.anchor.setTo(0, .5);
        this.add(label);

        this.off("pointerup", this.action);
        this.on("pointerup", () => {
            this._isChecked = !this._isChecked;
            this._updateSprite(this._isChecked);
            this.action();
        });

        this._updateSprite(checked);

    }
    
    private _updateSprite(checked): void {
        if (checked) {
            this.setDrawing("checked");
        } else {
            this.setDrawing("unchecked");
        }
    }

    public isChecked(): boolean {
        return this._isChecked;
    }

    public getTotalHeight(): number {
        return Config.GAME.UI.CHECKBOX.H;
    }
}

/**
 * Text
 * (x) Option 1
 * ( ) Option 2
 * ( ) Option n
 */
export class RadioButtonGroup extends ex.UIActor {
    private _label: ex.Label;
    private _radios: Array<RadioButton>;
    private _selectedIndex: number;

    constructor(position: Pos,
                text: string,
                options: Array<string>,
                public action: () => void,
                selectedOption = 0) {

        super(position.x, position.y);

        this._radios = [];
        this._selectedIndex = selectedOption;

        let fontSize = Config.GAME.UI.FONTSIZE;
        let label = new ex.Label(text, 0, 0);
        label.fontSize = fontSize;
        label.color = ex.Color.White;
        label.textAlign = ex.TextAlign.Left;
        this.add(label);

        options.forEach((option, index) => {
            let newRadio = new RadioButton(Pos.make(0, index * (Config.GAME.UI.RADIO.H + Config.GAME.UI.GUTTER) + fontSize + Config.GAME.UI.GUTTER ) ,
                                           option,
                                           () => this._onChange(newRadio),
                                           index === selectedOption);

            this.add(newRadio);
            this._radios.push(newRadio);
        });
    }

    private _onChange(source: RadioButton): void {
        this._radios.forEach((option, index) => {
            option.setChecked(option === source);
            if( option === source) {
                this._selectedIndex = index;
            }
        });
        this.action();
    }

    public getSelection(): number {
        return this._selectedIndex;
    }

    public getTotalHeight(): number {
        let gutterHeight = Config.GAME.UI.GUTTER;
        let totalRadioHeight = this._radios.reduce(
            (sum, radio) => sum + radio.getTotalHeight() + gutterHeight, 0);

        return Config.GAME.UI.CHECKBOX.H + totalRadioHeight;
    }
}

// TODO: unify with Checkbox where possible
class RadioButton extends ex.UIActor {
    
    constructor(position: Pos,
        text: string,
        action: (rb: RadioButton) => void,
        checked = false,
        w = Config.GAME.UI.CHECKBOX.W,
        h = Config.GAME.UI.CHECKBOX.H) {

        super(position.x, position.y, w, h);

        this.anchor.setTo(0, .5);

        let scaleX = w/Config.GAME.UI.BUTTON.W,
            scaleY = h/Config.GAME.UI.BUTTON.H;

        let spriteChecked   = Resources.ImgRadioChecked.asSprite()
        let spriteUnchecked = Resources.ImgRadioUnchecked.asSprite()

        this.addDrawing("checked", spriteChecked);
        this.addDrawing("unchecked", spriteUnchecked);

        let fontSize = Config.GAME.UI.FONTSIZE;
        let label = new ex.Label(text, w + Config.GAME.UI.GUTTER, fontSize/2);
        label.fontSize = fontSize;
        label.color = ex.Color.White;
        label.textAlign = ex.TextAlign.Left;
        label.anchor.setTo(0, .5);
        this.add(label);

        this.on("pointerup", () => {
            action(this);
        });

        this._updateSprite(checked);
    }
    
    private _updateSprite(checked): void {
        this.setDrawing(checked ? "checked" : "unchecked");
    }

    public setChecked(newState: boolean) {
        this._updateSprite(newState);
    }

    public getTotalHeight(): number {
        return Config.GAME.UI.RADIO.H;
    }
}