declare var globals: any;
import * as ex from "excalibur";
import {Customer} from "./Customer";
import {Cassa} from "./Cassa";
import {Director} from "./Director";
import {Resources} from "./config/Resources";

export class Door extends ex.Actor {
    private _open:boolean;

    private _top:ex.Actor;
    private _mid:ex.Actor;

    private _spawnTime: number;
    private _cassa:Cassa;
    private _customerSpawnerTimer: ex.Timer;

    private _director: Director;

    constructor(x, y, cassa:Cassa, spawnTime: number, director: Director) {
        super(x, y,
            globals.conf.DOOR.W,
            globals.conf.DOOR.H);

        this._cassa = cassa;
        this._open = false;
        this._spawnTime = spawnTime;
        this._director = director;

        this.on("pointerdown", this.open);
    }

    onInitialize(engine: ex.Engine): void {
        let conf = globals.conf.TILES;
        let tex  = Resources.TextureTiles;
        let s = conf.door_openTop.w;

        this._top = new ex.Actor(-s/2, -s/2, s, s);
        this._mid = new ex.Actor(-s/2,  s/2, s, s);

        this._top.addDrawing("open",   new ex.Sprite(tex, conf.door_openTop.x, conf.door_openTop.y, conf.door_openTop.w, conf.door_openTop.h));
        this._top.addDrawing("closed", new ex.Sprite(tex, conf.door_closedTop.x, conf.door_closedTop.y, conf.door_closedTop.w, conf.door_closedTop.h));
        
        this._mid.addDrawing("open",   new ex.Sprite(tex, conf.door_openMid.x, conf.door_openMid.y, conf.door_openMid.w, conf.door_openMid.h));
        this._mid.addDrawing("closed", new ex.Sprite(tex, conf.door_closedMid.x, conf.door_closedMid.y, conf.door_closedMid.w, conf.door_closedMid.h));
        
        this.add(this._top);
        this.add(this._mid);

        this._updateChildren();
    }

    private _updateChildren():void {
        this._top.setDrawing(this._open ? "open" : "closed");
        this._mid.setDrawing(this._open ? "open" : "closed");
    }

    public close():void {
        this.setState(false);
        if(this._customerSpawnerTimer) {
            this._customerSpawnerTimer.cancel();
        }
    }

    public open():void {
        this.setState(true);

        // Only add one timer. Otherwise multi-click is possible and it is NOT hilarious.
        if (!this._customerSpawnerTimer) {
            this._customerSpawnerTimer = new ex.Timer(() => {
                this.spawn();
            }, this._spawnTime * 1000, true);
            
            this.scene.add(this._customerSpawnerTimer);
        }
    }

    public setState(isOpen:boolean):void {
        this._open = isOpen;
        this._updateChildren();
    }

    public spawn():void {
        let newCustomer = new Customer(
            this.pos.x,
            this.pos.y,
            this._cassa,
            this._director);
        this.scene.add(newCustomer);
    }
}
