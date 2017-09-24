declare var globals: any;
import * as ex from "excalibur";
import {AbstractPlayer} from "../AbstractPlayer";
import {LevelMap} from "../LevelMap";

export class Cutscene extends ex.Scene {
    public levelOptions:object;

    private director:CutSceneDirector;

    constructor(engine: ex.Engine) {
        super(engine);

        let setup = this._gatherLevelOptions();

        this.add( new LevelMap(setup) );

        let locations = {};
        setup.LOCATIONS.forEach(locationSetup => {
            locations[locationSetup.Name] = new Location(locationSetup.X, locationSetup.Y);
        });

        let characters = {};
        setup.CHARACTERS.forEach(characterSetup => {
            // make sure the spawn location exists
            if (!locations[characterSetup.Initial]) {
                console.warn(`Location ${characterSetup.Initial} doesn't exist!`);
                return;
            }
            characters[characterSetup.Id] = new Character(locations[characterSetup.Initial], characterSetup.Name, characterSetup.Color, locations);
        });

        let actions = [];
        setup.SCRIPT.forEach(action => {
            // make sure the character exists
            if (!characters[action.S]) {
                console.warn(`Character ${action.S} doesn't exist!`);
                return;
            }
            actions.push( new Action(action.T, characters[action.S], action.A, action.O) );
        });

        this.director = new CutSceneDirector(locations, characters, actions);
        this.add(this.director);
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
        this.director.startScript();
    }

    onDeactivate () {
        // TODO: reset scene
    }

    private _gatherLevelOptions():any {
        return globals.conf.MAPS[1];
    }
}

class Character extends AbstractPlayer {
    private name: string;
    private _locations:any;
    private _label:ex.Label;

    constructor(initialLocation: Location,
                name: string,
                color: string,
                locations: any) {
        super(initialLocation.x, initialLocation.y);
        this.name = name;
        this._locations = locations;
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

    getPlayerColor(): string {
        let playerColor = globals.conf.PLAYER.INITIAL_TYPE; //start with green guy if no color was chosen
        
        if ( globals.storage.get("playerColor") ) {
            playerColor = globals.storage.get("playerColor");
        }
        
        return playerColor;
    }

    _updateChildren(): void {}

    _handleIdlePlayer(): void {
        this.setDrawing("idle");
    }
}

enum ActionType {
    Move = "move",
    Talk = "talk"
};

class Action {
    private timepoint: number;
    private subject: Character;
    private type: ActionType;
    private options: any;

    constructor(timepoint: number, subject: Character, type: ActionType, options:any) {
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
    private _locations:any;
    private _characters:any;
    private _actions:Array<Action>;

    constructor(locations, characters, actions) {
        super(0,0, globals.conf.GAME.WIDTH, globals.conf.GAME.HEIGHT);

        this._locations = locations;
        this._characters = characters;
        this._actions = actions;
    }

    startScript():void {
        let deltaT = 0;

        // Tiny hack - loop over object's keys and access it 
        Object.keys(this._characters).forEach(char => {
            this.add(this._characters[char]);
        });

        this._actions.forEach(action => {
            this.actions
                .delay( action.getTimepoint() - deltaT )
                .callMethod( () => {
                    action.execute();
                } );

            deltaT = action.getTimepoint();
        });
    }
}