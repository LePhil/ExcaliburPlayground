import * as ex from "excalibur";
import {Item} from "./Item";
import {AbstractPlayer} from "./AbstractPlayer";
import {Cassa} from "./Cassa";
import {EffectFactory} from "./Effects";
import {FancyProgressBar} from "./ui/Indicator";
import {Storage} from "./Storage";
import {Config} from "./config/Config";
import {Graphics} from "./config/Graphics";
import {Resources} from "./config/Resources";

export class Customer extends AbstractPlayer {
    public desiredItems: Array<Item>;
    private _hasDecided: boolean;
    private _hasReceivedItem: boolean;
    private _thinkBubbles: Array<ThinkBubble>;
    private _cassa: Cassa;
    private _patience: number;
    private _patienceDecreaseTimer: ex.Timer;
    private _patienceIndicator: FancyProgressBar;
    private _initialX:number;
    private _initialY:number;
    private _setup: any;
    private _onGetServedCallback: (results:number) => void

    constructor(x, y, cassa: Cassa, setup: any, onGetServedCallback: (results:number) => void) {
        super(x, y,
            Config.PLAYER.WIDTH,
            Config.PLAYER.HEIGHT,
            Config.CUSTOMER.SPEED);

        this._initialX = x;
        this._initialY = y;
        this._onGetServedCallback = onGetServedCallback;

        this._thinkBubbles = [];
        this.desiredItems = [];
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
                    this._decideOnProducts();
                } else {
                    this.leaveStore();
                }
            });
    }
    
    private _getNrOfDesiredProducts(): number {
        let randomNr = Math.random();

        if(randomNr <= 0.8) {
            return 1;
        } else if (randomNr <= 0.95) {
            return 2;
        } else {
            return 3;
        }
    }

    private _decideOnProducts(): void {
        let nrOfItems = this._getNrOfDesiredProducts();
        let conf = Config.CUSTOMER.THINKBUBBLE;

        for(let i = 0; i < nrOfItems; i++) {
            let desiredItem = this._getRandomItem()
            this.desiredItems.push(desiredItem);

            let thinkBubble = new ThinkBubble(conf.OFFSET_X + (i*conf.WIDTH), conf.OFFSET_Y, desiredItem);
            this._thinkBubbles.push(thinkBubble)

            this.add(thinkBubble);
        }

        this._hasDecided = true;
        
        this._patienceIndicator = new FancyProgressBar(
            new ex.Vector(0,-this.getWidth()/2),
            30,
            9,
            100,
            {
                "15": FancyProgressBar.Color.Red,
                "30": FancyProgressBar.Color.Yellow,
                "100": FancyProgressBar.Color.Green
            });

        this.add(this._patienceIndicator);

        this._startPatienceTimer();
    }

    private adjustBubblePositions(): void {
        let conf = Config.CUSTOMER.THINKBUBBLE;

        this._thinkBubbles.forEach((bubble, index) => {
            bubble.pos.setTo(conf.OFFSET_X + (index*conf.WIDTH), conf.OFFSET_Y);
        })
    }

    /**
     * Removes a number of items from the customers desired items
     * and removes the thinkbubbles as well.
     * 
     * @param itemsToRemove 
     */
    public removeItems(itemsToRemove: Array<Item>): void {
        itemsToRemove.forEach(itemToRemove => {
            let foundItemIndex = this.desiredItems.findIndex(item => item.getType() === itemToRemove.getType());
            
            if (foundItemIndex >= 0) {
                this.desiredItems.splice(foundItemIndex, 1);
                let bubbleToKill = this._thinkBubbles.splice(foundItemIndex, 1);

                this.remove(bubbleToKill[0]);
            }
        });

        this.adjustBubblePositions();
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
        if (this._thinkBubbles) {
            this._thinkBubbles.forEach(bubble => {
                this.remove(bubble);
            });
            this._thinkBubbles = [];
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
        this.scene.add(EffectFactory.Make(EffectFactory.Type.Money, this.pos));
    }

    _handleIdlePlayer(): void {
        this.setDrawing("idle");
    }

    private _getRandomItem(): Item {
        let potentialItems = this._setup.DESIREDITEMS,
            randomIndex = ex.Util.randomIntInRange(0, potentialItems.length - 1);
        
        return new Item(potentialItems[randomIndex]);
    }

    public resetPatience(duration: number): void {
        this._patienceDecreaseTimer.cancel();
        this._patience = Config.CUSTOMER.INITIAL_PATIENCE;
        
        // only start timer again after X seconds
        new ex.Timer(() => {
            this._startPatienceTimer();
        }, Config.CUSTOMER.PATIENCE_RESUME_TIMER);
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
                this._patienceIndicator.set(this._patience);
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
