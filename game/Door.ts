declare var globals: any;
import * as ex from "excalibur";

export class Door extends ex.Actor {
    private _open:boolean;

    private _top:ex.Actor;
    private _mid:ex.Actor;

    constructor(x, y, isOpen = false) {
        super(x, y,
            globals.conf.TILES.door_openMid.w,
            2 * globals.conf.TILES.door_openMid.w);

        this._open = isOpen;
    }

    onInitialize(engine: ex.Engine): void {
        let conf = globals.conf.TILES;
        let tex  = globals.resources.TextureTiles;
        let s = conf.door_openTop.w;

        this._top = new ex.Actor(-s/2, -s/2, s, s);
        this._mid = new ex.Actor(-s/2,  s/2, s, s);

        
        this._top.addDrawing("open",   new ex.Sprite(tex, conf.door_openTop.x, conf.door_openTop.y, conf.door_openTop.w, conf.door_openTop.h))
        this._top.addDrawing("closed", new ex.Sprite(tex, conf.door_closedTop.x, conf.door_closedTop.y, conf.door_closedTop.w, conf.door_closedTop.h))
        
        this._mid.addDrawing("open",   new ex.Sprite(tex, conf.door_openMid.x, conf.door_openMid.y, conf.door_openMid.w, conf.door_openMid.h))
        this._mid.addDrawing("closed", new ex.Sprite(tex, conf.door_closedMid.x, conf.door_closedMid.y, conf.door_closedMid.w, conf.door_closedMid.h))
        
        this.add(this._top);
        this.add(this._mid);

        this._updateChildren();

        // TODO: open only when ready or when start signal was given or when user clicked on it... or something like that.
        setTimeout(() => {
            this.open();
        }, 500);
    }

    private _updateChildren():void {
        this._top.setDrawing(this._open ? "open" : "closed");
        this._mid.setDrawing(this._open ? "open" : "closed");
    }

    public close():void {
        this.setState(false);
    }

    public open():void {
        this.setState(true);
    }

    public setState(isOpen:boolean):void {
        this._open = isOpen;
        this._updateChildren();
    }
}
