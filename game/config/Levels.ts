declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./Config";

enum ActionType {
    Move = "move",
    Talk = "talk"
};

export class Levels {
    static ActionType = ActionType;

    static LEVEL_TYPES = {
        NORMAL: "normal",   // Normal time management
        CUTSCENE: "cutscene"  // For some story
    };
    
    static MAPS = [
        {
            NAME: "Map_00",
            TYPE: Levels.LEVEL_TYPES.NORMAL,
            IMG: "Map_00",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            FOODS: ["rabbit", "elephant", "giraffe"],
            STATIONS: {
                PLACEMENTS: [
                    {X: 700, Y: 500, T: "rabbit"},
                    {X: 300, Y: 300, T: "elephant"},
                    {X: 600, Y: 300, T: "giraffe"}
                ],
                DECAY: true
            },
            BLOB: true,
            DURATION_S: 60,
            INTRO: ["As a proud owner of your new pet store,",
            "make sure each customer gets what they want!"],
            OUTRO: "Well done!"
        },{
            NAME: "intro_01",
            TYPE: Levels.LEVEL_TYPES.CUTSCENE,
            IMG: "Map_intro_01",
            W: 840,
            H: 560,
            LOCATIONS: [
                {Name: "player_entry", X: 900, Y: 460},
                {Name: "player_main",  X: 380, Y: 460}
            ],
            CHARACTERS: [
                {Id: "player", Name: "Player", Color: "green", Initial: "player_entry"}
            ],
            SCRIPT: [
                {T: 3,  S: "player", A: ActionType.Move, O: {to: "player_main"} },
                {T: 7,  S: "player", A: ActionType.Talk, O: {text: "Hi!"} },
                {T: 11, S: "player", A: ActionType.Talk, O: {text: "My name is Har-As!"} },
                {T: 16, S: "player", A: ActionType.Talk, O: {text: "I'm a Choch. You might not have heard of us."} },
                {T: 23, S: "player", A: ActionType.Talk, O: {text: "I'm from a planet far, far away."} },
                {T: 28, S: "player", A: ActionType.Talk, O: {text: "And today I'll tell you how I got here."} }
            ]
        }
    ];
}