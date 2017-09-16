declare var globals: any;
import * as ex from "excalibur";
import {AbstractPlayer} from "./AbstractPlayer";
import {LevelMap} from "./LevelMap";

// TODO: Silly name is silly.
export class CutsceneScene extends ex.Scene {
    public levelOptions:object;

    private director:Director;

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
            characters[characterSetup.Id] = new Character(characterSetup.Name, characterSetup.Color);
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

        this.director = new Director(locations, characters, actions);
        this.add(this.director);

        // TODO: handle Escape button to skip scene!
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


class FakePlayer extends AbstractPlayer {
    getPlayerColor ():string {
        let playerColor = globals.conf.PLAYER_TYPE_INITIAL_COLOR; //start with green guy if no color was chosen

        if ( globals.storage.get("playerColor") ) {
            playerColor = globals.storage.get("playerColor");
        }
        
        return playerColor;
    }

    _updateChildren():void {

    }

    _handleIdlePlayer():void {

    }
}

class Character {
    private name: string;

    constructor(name: string, color: string) {
        this.name = name;
    }

    move(from: string, to: string) {
        console.log(`${this.name} moves from ${from} to ${to}`);        
    }

    talk(text: string) {
        console.log(`${this.name}: "${text}"`);
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
                this.subject.move(this.options.from, this.options.to);
                break;
            case ActionType.Talk:
                this.subject.talk(this.options.text);
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

class Director extends ex.Actor {
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