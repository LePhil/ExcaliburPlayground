import * as ex from "excalibur";
import {Customer} from "./Customer";
import {Cassa} from "./Cassa";
import {Resources} from "./config/Resources";
import {Config} from "./config/Config";
import {AudioManager} from "./AudioManager";

export class Door extends ex.Actor {
    private _open:boolean;

    private _top:ex.Actor;
    private _mid:ex.Actor;

    private _spawnTime: number;
    private _cassa:Cassa;
    private _customerSpawnerTimer: ex.Timer;

    private _setup: any;
    private _onGetServedCallback: (results: number) => void;

    constructor(setup: any, cassa:Cassa, onCustomerPaidCallback: (results:number) => void) {

        super(setup.DOOR.X,
            setup.DOOR.Y,
            Config.DOOR.W,
            Config.DOOR.H);

        this._cassa = cassa;
        this._open = false;
        this._spawnTime = setup.DOOR.SPAWN_TIME_S;
        this._setup = setup;
        this._onGetServedCallback = onCustomerPaidCallback;

        this.on("pointerdown", this.open);
    }

    onInitialize(engine: ex.Engine): void {
        let conf = Config.TILES;
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

        this._updateDoorParts();
    }

    private _updateDoorParts():void {
        this._top.setDrawing(this._open ? "open" : "closed");
        this._mid.setDrawing(this._open ? "open" : "closed");
    }

    public close():void {
        this.setState(false);
        if (this._customerSpawnerTimer) {
            this._customerSpawnerTimer.cancel();
            this.scene.removeTimer(this._customerSpawnerTimer);
            this._customerSpawnerTimer = null;
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
        this._updateDoorParts();
    }

    public spawn():void {
        let newCustomer = new Customer(
            this.pos.x,
            this.pos.y,
            this._cassa,
            this._setup,
            this._onGetServedCallback);
        this.scene.add(newCustomer);
        newCustomer.setZIndex(this.getZIndex() + 1);
        AudioManager.play("Sound_Doorbell");
    }

    public resetState(setup: any): void {
        this.pos.x = setup.DOOR.X;
        this.pos.y = setup.DOOR.Y;

        this.close();
    }
}
