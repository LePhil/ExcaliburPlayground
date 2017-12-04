declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../config/Config";
import {AbstractPlayer} from "../AbstractPlayer";
import {LevelMap} from "../LevelMap";
import {Storage} from "../Storage";
import {Levels} from "../config/Levels";
import {Resources} from "../config/Resources";

export class Cutscene extends ex.Scene {
    private cutSceneDirector:CutSceneDirector;
    private _levelName: string = "";
    private _game: ex.Engine;
    private _textDisplay: TextDisplay;

    constructor(engine: ex.Engine) {
        super(engine);
        this._game = engine;
        this._textDisplay = new TextDisplay();
    }

    public loadLevelData(levelName: string): void {
        if(this._levelName !== levelName && this.cutSceneDirector) {
            // new level to be loaded! Discard of all actors for now
            this.cutSceneDirector.kill();
        }

        let setup = Levels.getLevel(levelName);
        
        this.add( new LevelMap(setup) );

        let locations = {};
        setup.LOCATIONS.forEach(locationSetup => {
            locations[locationSetup.Name] = new Location(
                locationSetup.X,
                locationSetup.Y);
        });

        let props = {};
        setup.PROPS.forEach(propSetup => {
            // make sure the spawn location exists
            if (!locations[propSetup.Initial]) {
                console.warn(`Location ${propSetup.Initial} doesn't exist!`);
                return;
            }
            props[propSetup.Id] = new Prop(
                locations[propSetup.Initial],
                propSetup.Type,
                locations,
                propSetup.Opacity);
        });

        let characters = {};
        setup.CHARACTERS.forEach(characterSetup => {
            // make sure the spawn location exists
            if (!locations[characterSetup.Initial]) {
                console.warn(`Location ${characterSetup.Initial} doesn't exist!`);
                return;
            }
            characters[characterSetup.Id] = new Character(
                locations[characterSetup.Initial],
                characterSetup.Name,
                characterSetup.Color,
                locations,
                characterSetup.Opacity,
                this._textDisplay
            );
        });

        let actions = [];
        setup.SCRIPT.forEach(action => {
            // make sure the character or prop exists
            if (!characters[action.S] && !props[action.S]) {
                console.warn(`Character/Prop ${action.S} doesn't exist!`);
                return;
            }
            let subject = characters[action.S] ? characters[action.S] : props[action.S];

            actions.push( new Action(action.T, subject, action.A, action.O) );
        });

        this.cutSceneDirector = new CutSceneDirector(setup, locations, characters, actions, props, this._game);
        this.add(this.cutSceneDirector);
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
            engine.goToScene("menu");
        }
    }

    onInitialize(engine: ex.Engine) {
    }

    onActivate () {
        this.cutSceneDirector.startScript();
    }

    onDeactivate () {
        this.cutSceneDirector.resetScene();
        this._textDisplay.reset();
    }
}

class TextDisplay extends ex.UIActor {
    private _label: ex.Label;

    constructor() {
        let x = Config.GAME.WIDTH / 2;
        let y = Config.GAME.HEIGHT - 100;

        super(x, y);

        this.anchor.setTo(.5, .5);

        let label = new ex.Label("", 0, 0);
        label.anchor.setTo(.5, .5);
        label.fontSize = 24;
        this.add(label);
        this._label = label;
    }

    public say(name: string, text: string, duration: number): void {
        this._label.text = `${name}: "${text}"`;

        if (duration > 0) {
            // if a manual (and def. optional) duration was set, remove text after said duration
            // otherwise, the label stays until the next one comes along!
            setTimeout(() => {
                this._label.text = "";
            }, duration * 1000);
        }
    }

    public reset(): void {
        this._label.text = "";
    }
}

interface Subject {
    action_move(to: string);
    action_talk(text: string, duration: number);
    action_show();
    action_hide();
    reset();
}

class Character extends AbstractPlayer implements Subject {
    private name: string;
    private _locations:any;
    private _charColor:string;
    private _initialLocation: Location;
    private _initialOpacity: number;
    private _textDisplay: TextDisplay;

    constructor(initialLocation: Location,
                name: string,
                color: string,
                locations: any,
                initialOpacity = 1,
                textDisplay: TextDisplay) {
        super(initialLocation.x, initialLocation.y);

        this._initialLocation = initialLocation;
        this._initialOpacity = initialOpacity;
        this._charColor = color;
        this.name = name;
        this._locations = locations;
        this._textDisplay = textDisplay;
        this.opacity = initialOpacity;        
    }

    action_move(to: string) {
        if (!this._locations[to]) {
            console.warn(`Location ${to} doesn't exist!`);
            return;
        }
        let to_loc:Location = this._locations[to];
        console.log(`${this.name} moves to ${to_loc.x} / ${to_loc.y}`);
        this.actions.moveTo(to_loc.x, to_loc.y, this._speed);
    }

    action_talk(text: string, duration = 0) {
        this._textDisplay.say(this.name, text, duration);
    }

    action_show() {
        this.opacity = 1;
    }

    action_hide() {
        this.opacity = 0;
    }

    getPlayerColor(): string {
        return this._charColor;
    }

    reset(): void {
        this.actions.clearActions();
        this.pos.x = this._initialLocation.x;
        this.pos.y = this._initialLocation.y;
        this.opacity = this._initialOpacity;
        this.setDrawing("idle");
    }

    _handleIdlePlayer(): void {
        this.setDrawing("idle");
    }
}

// Very simple character that can basically appear and disappear.
class Prop extends ex.Actor implements Subject {
    private _type: string;
    private _locations:any;
    private _initialLocation: Location;
    private _initialOpacity: number;

    constructor(initialLocation: Location,
        type: string,
        locations: any,
        initialOpacity = 1) {

        if (!Config.ITEMS[type]) {
            console.warn(`Type ${type} doesn't exist!`);
            return;
        }

        super(initialLocation.x, initialLocation.y, Config.ITEMS.CONF.W, Config.ITEMS.CONF.H);

        this._type = type;
        this._locations = locations;
        this._initialLocation = initialLocation;
        this._initialOpacity = initialOpacity;
        this.opacity = initialOpacity;
    }

    onInitialize(engine: ex.Engine): void {
        let conf = Config.ITEMS[this._type];
        let tex = Resources.ItemSpriteSheet;
        let sprite = new ex.Sprite(tex, conf.x, conf.y, conf.w, conf.h);

        let scale = conf.w > conf.h ? Config.ITEMS.CONF.W / conf.w : Config.ITEMS.CONF.H / conf.h;
        sprite.scale.setTo(scale, scale);

        let darkSprite = sprite.clone();
        darkSprite.darken(.5);

        this.addDrawing("normal", sprite);
        this.addDrawing("inactive", darkSprite);

        this.setDrawing("normal");
    }

    action_move(to: string) {}
    action_talk(text: string, duration: number) {}
    
    action_show() {
        this.opacity = 1;
    }
    action_hide() {
        this.opacity = 0;
    }

    reset(): void {
        this.actions.clearActions();
        this.setDrawing("normal");
        this.opacity = this._initialOpacity;
        this.pos.x = this._initialLocation.x;
        this.pos.y = this._initialLocation.y;
    }
}

enum ActionType {
    Move = "move",
    Talk = "talk",
    Hide = "hide",
    Show = "show"
};

class Action {
    private timepoint: number;
    private subject: Subject;
    private type: ActionType;
    private options: any;

    constructor(timepoint: number, subject: Subject, type: ActionType, options:any) {
        this.timepoint = timepoint * 1000;
        this.subject = subject;
        this.type = type;
        this.options = options;
    }

    public execute():void {
        switch (this.type) {
            case ActionType.Move:
                this.subject.action_move(this.options.to);
                break;
            case ActionType.Talk:
                this.subject.action_talk(this.options.text, this.options.duration);
                break;
            case ActionType.Hide:
                this.subject.action_hide();
                break;
            case ActionType.Show:
                this.subject.action_show();
                break;
        }
    }
    public getTimepoint():number {
        return this.timepoint;
    }
}

class Location {
    public x:number;
    public y:number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class CutSceneDirector extends ex.Actor {
    private _setup:any;
    private _locations:any;
    private _characters:any;
    private _props:any;
    private _actions:Array<Action>;
    private _game: ex.Engine;

    constructor(setup, locations, characters, actions, props, game) {
        super(0,0, Config.GAME.HEIGHT);

        this._setup = setup;
        this._locations = locations;
        this._characters = characters;
        this._actions = actions;
        this._props = props;
        this._game = game;
    }

    resetScene(): void {
        this.actions.clearActions();

        // reset all actors that coould have changed
        Object.keys(this._characters).forEach(char => {
            this._characters[char].reset();
        });
        Object.keys(this._props).forEach(prop => {
            this._props[prop].reset();
        });
    }

    startScript():void {
        let deltaT = 0;

        // Tiny hack - loop over object's keys and access it
        // Spawn Characters
        Object.keys(this._characters).forEach(char => {
            this.add(this._characters[char]);
        });
        
        // Spawn Props
        Object.keys(this._props).forEach(prop => {
            this.add(this._props[prop]);
        });

        // execute each action
        this._actions.forEach(action => {
            this.actions
                .delay( action.getTimepoint() - deltaT )
                .callMethod( () => {
                    action.execute();
                } );

            deltaT = action.getTimepoint();
        });

        this.actions.delay(3000);
        
        if (this._setup.OUT === "fade") {
            // TODO: fade out scene, e.g. fullscreen black actor covering everything with opacity going from 0 to 1 slowly.
        }
        
        // Load next Scene/Level if applicable, otherwise back to the main menu
        this.actions.callMethod(() => {
            if (this._setup.NEXT) {
                globals.loadNextLevel(this._setup.NEXT);
            } else {
                this._game.goToScene("menu");
            }
        });
    }
}