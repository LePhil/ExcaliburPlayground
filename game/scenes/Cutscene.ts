declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../config/Config";
import {AbstractPlayer} from "../AbstractPlayer";
import {LevelMap} from "../LevelMap";
import {Storage} from "../Storage";
import {Levels} from "../config/Levels";
import {Resources} from "../config/Resources";

export class Cutscene extends ex.Scene {
    public levelOptions:object;

    private cutSceneDirector:CutSceneDirector;

    constructor(engine: ex.Engine, levelName: string) {
        super(engine);

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
                characterSetup.Opacity
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

        this.cutSceneDirector = new CutSceneDirector(setup, locations, characters, actions, props);
        this.add(this.cutSceneDirector);
    }

    update(engine: ex.Engine, delta: number) {
        super.update(engine, delta);

        if ( engine.input.keyboard.wasReleased(ex.Input.Keys.Esc) ) {
            globals.startMenu();
        }
    }

    onInitialize(engine: ex.Engine) {
    }

    onActivate () {
        this.cutSceneDirector.startScript();
    }

    onDeactivate () {
        this.cutSceneDirector.resetScene();
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
    private _label:ex.Label;
    private _initialLocation: Location;
    private _initialOpacity: number;    

    constructor(initialLocation: Location,
                name: string,
                color: string,
                locations: any,
                initialOpacity = 1) {
        super(initialLocation.x, initialLocation.y);

        this._initialLocation = initialLocation;
        this._initialOpacity = initialOpacity;
        this.name = name;
        this._locations = locations;

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
        console.log(`${this.name}: "${text}"`);

        // TODO: for now with labels, later maybe with bigger containers for text. Maybe even html?

        if(this._label) {
           this.remove(this._label); 
        }

        let label = new ex.Label(text, 20, 0);        
        label.fontSize = 24;
        this.add(label);
        this._label = label;

        if (duration > 0) {
            // if a manual (and def. optional) duration was set, remove text after said duration
            // otherwise, the label stays until the next one comes along!
            setTimeout(() => {
                this.remove(this._label);
                this._label = null;
            }, duration * 1000);
        }
    }

    action_show() {
        this.opacity = 1;
    }

    action_hide() {
        this.opacity = 0;
    }

    getPlayerColor(): string {
        let playerColor = Config.PLAYER.INITIAL_TYPE; //start with green guy if no color was chosen
        
        if ( Storage.get("playerColor") ) {
            playerColor = Storage.get("playerColor");
        }
        
        return playerColor;
    }

    reset(): void {
        this.actions.clearActions();
        this.pos.x = this._initialLocation.x;
        this.pos.y = this._initialLocation.y;
        this.opacity = this._initialOpacity;
        this.setDrawing("idle");
        
        if(this._label) {
            this.remove(this._label); 
        }
    }

    _updateChildren(): void {}

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

    constructor(setup, locations, characters, actions, props) {
        super(0,0, Config.GAME.HEIGHT);

        this._setup = setup;
        this._locations = locations;
        this._characters = characters;
        this._actions = actions;
        this._props = props;
    }

    resetScene(): void {
        // reset all actors that coould have changed
        this._characters.each((char) => {
            char.reset();
        });

        this._props.each((prop) => {
            prop.reset();
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

        // Load next SCene/Level if applicable, otherwise back to the main menu
        this.actions
            .delay(3000)
            .callMethod(() => {
                if (this._setup.NEXT) {
                    globals.loadNextLevel(this._setup.NEXT);
                } else {
                    globals.startMenu();
                }
            });
    }
}