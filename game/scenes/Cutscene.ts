declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../config/Config";
import {AbstractPlayer} from "../AbstractPlayer";
import {LevelMap} from "../LevelMap";
import {Storage} from "../Storage";
import {EffectTypes, EffectFactory} from "../Effects";
import {ActionType, Levels} from "../config/Levels";
import {Resources} from "../config/Resources";

export class Cutscene extends ex.Scene {
    private cutSceneDirector:CutSceneDirector;
    private _levelName: string = "";
    private _game: ex.Engine;
    private _textLabel: ex.Label;

    constructor(engine: ex.Engine) {
        super(engine);
        this._game = engine;

        this._textLabel = new ex.Label("", Config.GAME.WIDTH/2, Config.GAME.HEIGHT - 50);
        this._textLabel.anchor.setTo(.5, .5);
        this._textLabel.fontSize = 24;
        this._textLabel.color = ex.Color.White;
        this._textLabel.textAlign = ex.TextAlign.Center;        
        this.add(this._textLabel);
    }

    public load(setup: any, callback: () => void): void {
        this.add( new LevelMap(setup.CONF) );

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
                characterSetup.Char.Name,
                characterSetup.Char.Type,
                characterSetup.Char.Color,
                locations,
                characterSetup.Opacity,
                this._textLabel,
                this
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

        this.cutSceneDirector = new CutSceneDirector(setup, locations, characters, actions, props, this._game, callback);
        this.add(this.cutSceneDirector);
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
            engine.goToScene("menu");
        }
    }

    onActivate () {
        this.cutSceneDirector.startScript();
    }
}

interface Subject {
    action_move(to: string);
    action_talk(text: string, duration: number);
    action_show();
    action_hide();
    action_effect(type: EffectTypes, at: string);
    reset();
}

class Character extends AbstractPlayer implements Subject {
    private name: string;
    private _locations:any;
    private _charType:string;    
    private _charColor:ex.Color;
    private _initialLocation: Location;
    private _initialOpacity: number;
    private _label: ex.Label;
    private _scene: ex.Scene;

    constructor(initialLocation: Location,
                name: string,
                type: string,
                color: ex.Color,
                locations: any,
                initialOpacity = 1,
                label: ex.Label,
                scene: ex.Scene) {
        super(initialLocation.x, initialLocation.y);

        this._initialLocation = initialLocation;
        this._initialOpacity = initialOpacity;
        this._charType = type;
        this._charColor = color;
        this.name = name;
        this._locations = locations;
        this.opacity = initialOpacity;
        this._label = label;
        this._scene = scene;
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
        console.log(`${this.name} says ${text} for ${duration} seconds`);

        this._label.color = this._charColor;
        this._label.text = `${text}`;
        
        if (duration > 0) {
            // if a manual (and def. optional) duration was set, remove text after said duration
            // otherwise, the label stays until the next one comes along!
            setTimeout(() => {
                this._label.text = "";
                this._label.color = ex.Color.White;
            }, duration * 1000);
        }
    }

    action_effect(type: EffectTypes, at: string) {
        if (!this._locations[at]) {
            console.warn(`Location ${at} doesn't exist!`);
            return;
        }
        let at_loc:Location = this._locations[at];
        console.log(`Creating ${type} effect at ${at_loc.x} / ${at_loc.y}`);

        this._scene.add(EffectFactory.Make(type, new ex.Vector(at_loc.x, at_loc.y)));
    }

    action_show() {
        console.log(`Showing ${this.name}`);
        this.opacity = 1;
    }

    action_hide() {
        console.log(`Hiding ${this.name}`);
        this.opacity = 0;
    }

    getPlayerColor(): string {
        return this._charType;
    }

    reset(): void {
        this._setup();
        this.actions.clearActions();
        this.pos.x = this._initialLocation.x;
        this.pos.y = this._initialLocation.y;
        this.opacity = this._initialOpacity;
        this._handleIdlePlayer();
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
        if (conf.scale) {
            scale = conf.scale;
        }

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

    action_effect(type: EffectTypes, at: string) {}

    reset(): void {
        this.actions.clearActions();
        this.setDrawing("normal");
        this.opacity = this._initialOpacity;
        this.pos.x = this._initialLocation.x;
        this.pos.y = this._initialLocation.y;
    }
}

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
            case ActionType.Effect:
                this.subject.action_effect(this.options.type, this.options.at);
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
    private _sceneDoneCallback: () => void;    

    constructor(setup, locations, characters, actions, props, game, callback: () => void) {
        super(0,0, Config.GAME.HEIGHT);

        this._sceneDoneCallback = callback;        
        this._setup = setup;
        this._locations = locations;
        this._characters = characters;
        this._actions = actions;
        this._props = props;
        this._game = game;
    }

    // TODO: remove, probably
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

        // Have an extra 3 seconds to not end too abruptly
        this.actions.delay(3000);
    
        this.actions.callMethod(() => {
            if (this._sceneDoneCallback) {
                this._sceneDoneCallback();
            } else {
                this._game.goToScene("menu");
            }
        });
    }
}