declare var globals: any;
import * as ex from "excalibur";
import {AbstractPlayer} from "./AbstractPlayer";
import {LevelMap} from "./LevelMap";

export class CutsceneScene extends ex.Scene {
  public levelOptions:object;

  private locations;
  private characters;
  private actions;

  constructor(engine: ex.Engine) {
    super(engine);

    let setup = this._gatherLevelOptions();

    this.add( new LevelMap(setup) );

    this.locations = {};
    setup.LOCATIONS.forEach(locationSetup => {
        this.locations[locationSetup.Name] = new Location(locationSetup.X, locationSetup.Y);
    });

    this.characters = {};
    setup.CHARACTERS.forEach(characterSetup => {
        this.characters[characterSetup.Id] = new Character(characterSetup.Name, characterSetup.Color);
    });

    this.actions = [];
    setup.SCRIPT.forEach(action => {
        // make sure the character exists...
        if (!this.characters[action.S]) {
            console.warn(`Character ${action.S} doesn't exist!`);
            return;
        }
        this.actions.push( new Action(action.T, this.characters[action.S], action.A, action.O) );
    });
  }

  onInitialize(engine: ex.Engine) {
  }

  onActivate () {
    // TODO: time delay
    this.actions.forEach(action => {
        action.execute();
    });
  }
  
  onDeactivate () {
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
        this.timepoint = timepoint;
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
}

class Location {
    public x:number;
    public y:number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}