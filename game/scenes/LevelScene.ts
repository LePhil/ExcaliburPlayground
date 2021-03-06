import * as ex from "excalibur";
import { Levels } from "../config/Levels";
import { Player } from "../Player";
import { Inventory } from "../Inventory";
import { Clock, ScoreCounter } from "../Timer";
import { Blob } from "../Blob";
import { ItemSourceFactory, ItemSource, AnimalCage } from "../ItemSource";
import { Customer } from "../Customer";
import { LevelMap } from "../LevelMap";
import { Door } from "../Door";
import { Cassa } from "../Cassa";
import { Task } from "../Task";
import { ToolFactory, Tool, ConsumableTool, PickuppableTool } from "../Tools";
import { Config } from "../config/Config";

export class LevelScene extends ex.Scene {
    private _setup: any;
    private _currentScore: number = 0;
    private _player: Player;
    private _timeDisplay: Clock;
    private _scoreDisplay: ScoreCounter;
    private _door: Door;
    private _cassa: Cassa;
    private _task: Task;
    private _tools: Array<Tool> = [];
    private _itemSources: Array<ItemSource> = [];
    private _decayTimer: ex.Timer;
    private _gameDoneCallback: (results: number, passed: boolean) => void;
    private _passed: boolean;

    private _levelMap: LevelMap;

    constructor(engine: ex.Engine) {
        super(engine);
    }

    onActivate() {
        this._currentScore = 0;

        this._timeDisplay.setTimer(this._setup.TIME, () => this.onTimerEnded());
    }

    addPoints(points: number): number {
        this._currentScore += points;
        this._scoreDisplay.updateScore(this._currentScore);

        return this._currentScore;
    }

    private _setupLevelMap(setup: any) {
        if (setup.CONF) {
            this._levelMap = new LevelMap(setup.CONF);
            this.add(this._levelMap);
        }
    }

    private _setupTools(setup: any): void {
        this._tools = [];

        if (!setup.TOOLS) {
            return;
        }

        setup.TOOLS.forEach(placement => {
            let tool = ToolFactory.create(
                placement.X,
                placement.Y,
                placement.T,
                this._player,
                this._cassa
            );
            this.add(tool);
            this._tools.push(tool);
        });
    }

    private _setupItemSources(setup: any): void {
        this._itemSources = [];

        if (!setup.ITEMSOURCES) {
            return;
        }
        let breakableSources = [];

        setup.ITEMSOURCES.forEach(placement => {
            let itemSource = ItemSourceFactory.make(placement, this._player);
            this.add(itemSource);
            this._itemSources.push(itemSource);

            if (itemSource.isBreakable()) {
                breakableSources.push(itemSource);
            }
        });

        if (breakableSources.length > 0) {
            let decayTimer = new ex.Timer(() => {
                let randomStation = breakableSources[ex.Util.randomIntInRange(0, breakableSources.length - 1)];
                randomStation.breakDown();
            }, 10000, true);
            this.add(decayTimer);
            this._decayTimer = decayTimer;
        }
    }

    private _setupDoor(setup: any): void {
        this._door = new Door(setup, this._cassa, results => this.addPoints(results));
        this.add(this._door);
    }

    private _setupCassa(setup: any): void {
        this._cassa = new Cassa(setup.CASSA.X, setup.CASSA.Y, this._player);
        this.add(this._cassa);
    }

    /**
     * Add a blob after a random time, the latest at half of the game time is over.
     *
     * @param setup 
     */
    private _setupBlob(setup: any): void {
        if (setup.BLOB) {
            setTimeout(() => {
                this.add(new Blob(setup, results => this.onBlobDied(results)));
            }, ex.Util.randomIntInRange(0, setup.TIME.DURATION_S * 1000 / 2));
        }
    }

    private _setupTask(setup: any): void {
        if (setup.TASK) {
            this._passed = false;
            this._task = Task.Make(this, this._player, setup.TASK, () => this.onTaskCompleted());
        } else {
            this._passed = true;    // generally, always pass a level. If there's a task --> only passed when task completed.
        }
    }

    public load(setup: any, callback: (results: number, passed: boolean) => void) {
        this._setup = setup;
        this._gameDoneCallback = callback;
        this._setupLevelMap(setup);
        
        this._scoreDisplay = new ScoreCounter();
        this.add(this._scoreDisplay);
        
        this._timeDisplay = new Clock();
        this.add(this._timeDisplay);
        
        let inv = new Inventory();
        this.add(inv);
        
        this._player = new Player(inv);
        this.add(this._player);

        this._setupCassa(setup);
        this._setupDoor(setup);
        this._setupTools(setup);
        this._setupItemSources(setup);
        this._setupBlob(setup);
        this._setupTask(setup);
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if (engine.input.keyboard.wasReleased(ex.Input.Keys.Esc)) {
            engine.goToScene("menu");
        }
    }

    private onTaskCompleted() {
        this._passed = true;
    }

    private onTimerEnded() {
        this._gameDoneCallback(this._currentScore, this._passed);
    }

    private onBlobDied(results) {
        this.addPoints(results);
    }

    public getPlayer(): Player {
        return this._player;
    }
}
