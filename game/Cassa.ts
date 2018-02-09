import * as ex from "excalibur";
import {Customer} from "./Customer";
import {Player} from "./Player";
import {EffectFactory} from "./Effects";
import {Resources} from "./config/Resources";
import {Config} from "./config/Config";

export class Cassa extends ex.Actor {
    public queue:Customer[];

    constructor(x, y, player: Player) {
        super(x, y, Config.CASSA.W, Config.CASSA.H);

        this.anchor.setTo(.5, .5);

        this.on("pointerdown", (event) => {
            this.handleClick(player);
        });
    }

    onInitialize(engine: ex.Engine): void {
        this._setup();

        let tex  = Resources.Cassa;
        this.addDrawing(new ex.Sprite(tex, 0, 0, 70, 70));
    }

    /**
     * Sligthly delayed, each customer should move up in the queue
     */
    public adjustQueue() {
        this.queue.forEach((cust, index) => {
            setTimeout(() => {
                cust.moveInQueue(new ex.Vector(
                    this.pos.x + (index+1) * (Config.PLAYER.WIDTH + 2),
                    this.pos.y
                ));
            }, index * 200);
        });
    }

    /**
     * The player should move to the cassa, spend some time there (and do
     * things), then be off on their merry way.
     *
     * @param  {ex.Actor} player [description]
     */
    public handleClick(player: Player) {
        player.sendToCassa(this, () => {
            let customersToRemove = player.serveItems(this.queue);

            // remove all customers that were served with a small delay
            customersToRemove.forEach((customerToRemove, index) => {
                setTimeout(() => {
                customerToRemove.giveItem();
                this._removeFromQueue(customerToRemove);
                }, index * 500);
            });

        });
    }

    public getTargetLocation(): ex.Vector {
        return new ex.Vector(
            this.pos.x - Config.PLAYER.WIDTH,
            this.pos.y
        );
    }

    private _removeFromQueue(customerToRemove: Customer):void {
        this.queue.splice( this.queue.indexOf(customerToRemove), 1 );
        this.adjustQueue();
    }

    public ranOutOfPatience(customer: Customer):void {
        this._removeFromQueue(customer);
    }

    private _setup():void {
        this.queue = new Array<Customer>();
    }

    public isQueueFull():boolean {
        return this.queue.length >= Config.CUSTOMER.QUEUE_LENGTH;
    }

    public getLastPositionInQueue():ex.Vector {
        return new ex.Vector(
            this.pos.x + (this.queue.length + 1) * (Config.PLAYER.WIDTH + 2),
            this.pos.y
        );
    }

    public addToQueue(newCustomer: Customer):boolean {
        if(!this.isQueueFull()) {
            this.queue.push(newCustomer);
            this.adjustQueue();
            return true;
        }
        return false;
    }

    public makeCustomersHappy(duration: number): void {
        this.scene.add(EffectFactory.Make(EffectFactory.Type.Firework, this.pos, duration));
        this.queue.forEach((customer) => {
            customer.resetPatience(duration);
        });
    }
}
