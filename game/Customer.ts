import * as ex from "excalibur";
import {Item} from "./Item";
import {AbstractPlayer} from "./AbstractPlayer";
import {Cassa} from "./Cassa";
import {MoneyEffect} from "./Effects";
import {Storage} from "./Storage";
import {Config} from "./config/Config";
import {Graphics} from "./config/Graphics";
import {Resources} from "./config/Resources";

export class Customer extends AbstractPlayer {
    public desiredItem: Item;
    public name: string;
    private _hasDecided: boolean;
    private _hasReceivedItem: boolean;
    private _thinkBubble: ThinkBubble;
    private _cassa: Cassa;
    private _patience: number;
    private _patienceDecreaseTimer: ex.Timer;
    private _patienceIndicator: PatienceIndicator;
    private _initialX:number;
    private _initialY:number;
    private _setup: any;
    private _onGetServedCallback: (results:number) => void

    constructor(x, y, cassa: Cassa, setup: any, onGetServedCallback: (results:number) => void) {
        super(x, y,
            Config.CUSTOMER.WIDTH,
            Config.CUSTOMER.HEIGHT,
            Config.CUSTOMER.SPEED);

        this._initialX = x;
        this._initialY = y;
        this._onGetServedCallback = onGetServedCallback;

        this.name = Config.CUSTOMER.NAMES[Math.floor(Math.random() * Config.CUSTOMER.NAMES.length)];
        this._hasDecided = false;
        this._hasReceivedItem = false;
        this._setup = setup;
        this._cassa = cassa;
        this._patience = Config.CUSTOMER.INITIAL_PATIENCE;
        
        this.collisionType = ex.CollisionType.Passive;
        
        let goal = this._cassa.getLastPositionInQueue();
        
        this.actions
            .moveTo(goal.x, goal.y, this._speed)
            .callMethod(() => {
                // Leave Queue if it's full
                if (this._cassa.addToQueue(this)) {
                    this._decideOnProduct();
                } else {
                    this.leaveStore();
                }
            });
    }
    
    private _decideOnProduct(): void {
        this.desiredItem = this._getRandomItem();
        this._hasDecided = true;
        let conf = Config.CUSTOMER.THINKBUBBLE;
        
        this._patienceIndicator = new PatienceIndicator(0, 0, this._patience);
        this._thinkBubble = new ThinkBubble(conf.OFFSET_X, conf.OFFSET_Y, this.desiredItem);

        this.add(this._patienceIndicator);
        this.add(this._thinkBubble);

        this._startPatienceTimer();
    }

    public kill(): void {
        if (this._patienceDecreaseTimer) {
            this._patienceDecreaseTimer.cancel();
        }
        super.kill();
    }

    public giveItem():void {
        this._hasReceivedItem = true;
        this.leaveStore();
    }

    public moveInQueue(goal:ex.Vector):void {
        this.actions.moveTo(goal.x, goal.y, this._speed);
    }

    /**
     * Remove the thinkBubble/timer, do the KA-CHING and move to the door and die.
     */
    public leaveStore(): void {
        if (this._thinkBubble) {
            this.remove(this._thinkBubble);
        }

        if (this._patienceIndicator) {
            this.remove(this._patienceIndicator);
        }

        if (this._patienceDecreaseTimer) {
            this._patienceDecreaseTimer.cancel();
        }

        if (this._hasReceivedItem) {
            this._moneymoneymoney();
        }

        this.actions
            .moveTo(this._initialX, this._initialY, this._speed)
            .callMethod(this.kill);
    }

    private _moneymoneymoney(): void {
        if (this._patience === 0) {
            return;
        }

        // earned score per customer depends on the patience they had left
        this._onGetServedCallback(Config.SCORE.VALUE_OF_SERVING * this._patience / Config.CUSTOMER.INITIAL_PATIENCE);

        // Some fancy KA-CHING stuff
        this.scene.add(new MoneyEffect(this.pos.x, this.pos.y));
    }

    getPlayerColor(): string {
        // Disallow chosen player color for customers
        let availablePlayers = Config.PLAYER.TYPES.filter(type => type.color !== Storage.get("playerColor"));
        let randomIndex = ex.Util.randomIntInRange(0, availablePlayers.length - 1);

        return availablePlayers[randomIndex].color;
    }

    _handleIdlePlayer(): void {
        this.setDrawing("idle");
    }

    private _getRandomItem(): Item {
        let potentialItems = this._setup.DESIREDITEMS,
            randomIndex = ex.Util.randomIntInRange(0, potentialItems.length - 1);
        
        return new Item(potentialItems[randomIndex]);
    }

    // TODO: only start timer again after X seconds
    public resetPatience(duration: number): void {
        this._patienceDecreaseTimer.cancel();
        this._patience = Config.CUSTOMER.INITIAL_PATIENCE;

        this._startPatienceTimer();
    }

    private _startPatienceTimer(): void {
        if (this._patienceDecreaseTimer) {
            this._patienceDecreaseTimer.cancel();
            this.scene.removeTimer(this._patienceDecreaseTimer);
        }

        this._patienceDecreaseTimer = new ex.Timer(() => {
            this._patience -= Config.CUSTOMER.PATIENCE_DELTA;
            if (this._patience <= 0) {
                this._cassa.ranOutOfPatience(this);
                this.leaveStore();
            } else {
                this._patienceIndicator.setPatience(this._patience);
            }
        }, Config.CUSTOMER.PATIENCE_DECREASE_INTERVAL, true);

        this.scene.add(this._patienceDecreaseTimer);
    }
}

class ThinkBubble extends ex.Actor {
    private _desiredItem: Item;

    constructor(x, y, wants: Item) {
        super(x, y, Config.CUSTOMER.THINKBUBBLE.WIDTH, Config.CUSTOMER.THINKBUBBLE.HEIGHT);
        this._desiredItem = wants;
    }

    onInitialize(engine: ex.Engine): void {
        super.onInitialize(engine);

        let conf = Graphics.ANIMALS.ROUND[this._desiredItem.getType()];
        let tex = Resources.TextureBubbles;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        let scale_x = Config.CUSTOMER.THINKBUBBLE.WIDTH  / conf.w;
        let scale_y = Config.CUSTOMER.THINKBUBBLE.HEIGHT / conf.h;

        sprite.scale.setTo(scale_x, scale_y);
        this.addDrawing( sprite );
    }
}

class PatienceIndicator extends ex.Actor {
    private _patience: number;
    private _patienceInitial: number;
    private _colors: any;

    constructor(x, y, initialPatience: number) {
        super(x, y, 20, 5);

        this._patience = initialPatience;
        this._patienceInitial = initialPatience;

        this._setColor();
    }

    public setPatience(patience:number) {
        this._patience = patience;
    }

    public update(engine: ex.Engine, delta: number): void {
        super.update(engine, delta);

        this._setColor();
    }

    private _setColor():void {
        // 50%+ Green
        // 25%+ Orange
        //  0%+ Red
        if (this._patience >= this._patienceInitial/2) {
            this.color = ex.Color.Green;
        } else if (this._patience >= this._patienceInitial/4) {
            this.color = ex.Color.Orange;
        } else {
            this.color = ex.Color.Red;
        }
    }
}