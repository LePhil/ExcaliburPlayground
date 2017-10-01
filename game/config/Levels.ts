declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./Config";
import {Storage} from "../Storage";

enum ActionType {
    Move = "move",
    Talk = "talk",
    Hide = "hide",
    Show = "show"
};

export class Levels {
    static ActionType = ActionType;
    static TYPES = {
        NORMAL: "normal",       // Normal time management
        CUTSCENE: "cutscene"    // For some story
    };
    
    static MAPS = [
        {
            NAME: "Map_00",
            TYPE: Levels.TYPES.NORMAL,
            IMG: "Map_00",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            FOODS: ["rabbit"],
            STATIONS: {
                PLACEMENTS: [
                    {X: 700, Y: 400, T: "rabbit"}
                ],
                DECAY: false
            },
            TOOLS: {},
            BLOB: false,
            DURATION_S: 60,
            INTRO: [
                "Welcome to your new Rabbit Food Store!",
                "Make your customers happy and sell them",
                "all the rabbit food they need!"
            ],
            OUTRO: ["Well done!"],
            NEXT: "Map_01"
        }, {
            NAME: "Map_01",
            TYPE: Levels.TYPES.NORMAL,
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
            TOOLS: {
                PLACEMENTS: [
                    {X: 200, Y: 200, T: "cup"},
                    {X: 200, Y: 250, T: "hammer"},
                    {X: 200, Y: 300, T: "bone"}
                ]
            },
            BLOB: true,
            DURATION_S: 10,
            INTRO: ["As a proud owner of your new pet store,",
            "make sure each customer gets what they want!"],
            OUTRO: ["Well done!"],
            NEXT: "Map_02"
        }, {
            NAME: "Map_02",
            TYPE: Levels.TYPES.NORMAL,
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
            TOOLS: {
                PLACEMENTS: [
                    {X: 500, Y: 500, T: "hammer"}
                ]
            },
            BLOB: true,
            DURATION_S: 60,
            INTRO: ["Second level"],
            OUTRO: ["Well done!"]
        }, {
            NAME: "intro_01",
            TYPE: Levels.TYPES.CUTSCENE,
            IMG: "Map_intro_01",
            W: 840,
            H: 560,
            LOCATIONS: [
                {Name: "player_entry",  X: 900, Y: 460},
                {Name: "player_main",   X: 380, Y: 460},
                {Name: "phone_initial", X: 350, Y: 480},
            ],
            CHARACTERS: [
                {Id: "hime", Name: "Player", Color: "green", Initial: "player_entry"}
            ],
            PROPS: [
                {Id: "phone",   Type: "mobile_phone", Initial: "phone_initial", Opacity: 0}
            ],
            SCRIPT: [
                {T: 2,  S: "hime", A: ActionType.Move, O: {to: "player_main"} },
                {T: 7,  S: "hime", A: ActionType.Talk, O: {text: "Oh boy!"} },
                {T: 10, S: "hime", A: ActionType.Talk, O: {text: "Finally done with school."} },
                {T: 14, S: "hime", A: ActionType.Talk, O: {text: "Can't wait to go to University"} },
                {T: 18, S: "hime", A: ActionType.Talk, O: {text: "and become a Psychologist!"} },
                {T: 22, S: "hime", A: ActionType.Talk, O: {text: "But first, let's check SeenIt."} },
                {T: 24, S: "hime", A: ActionType.Talk, O: {text: ""} },
                {T: 24, S: "phone",A: ActionType.Show},
                {T: 28, S: "hime", A: ActionType.Talk, O: {text: "Hihi! Silly cats..."} },
                {T: 34, S: "hime", A: ActionType.Talk, O: {text: "Oh?"} },
                {T: 36, S: "hime", A: ActionType.Talk, O: {text: "..."} },
                {T: 40, S: "hime", A: ActionType.Talk, O: {text: "'Psyche completely researched.'"} },
                {T: 44, S: "hime", A: ActionType.Talk, O: {text: "'No more psych studies.'"} },
                {T: 46, S: "phone",A: ActionType.Hide},
                {T: 50, S: "hime", A: ActionType.Talk, O: {text: "Poop! What do I do now?"} },
                {T: 54, S: "hime", A: ActionType.Talk, O: {text: ""} },
                {T: 54, S: "hime", A: ActionType.Move, O: {to: "player_entry"} },
                {T: 58, S: "hime", A: ActionType.Hide}                
            ],
            OUT: "fade",
            NEXT: "forest_01"
        },{
            NAME: "forest_01",
            TYPE: Levels.TYPES.CUTSCENE,
            IMG: "Map_forest",
            W: 840,
            H: 560,
            LOCATIONS: [
                {Name: "player_entry",   X: 100, Y: 530},
                {Name: "old_guy_entry",  X: 900, Y: 530},
                {Name: "player_main",    X: 380, Y: 530},
                {Name: "old_guy_main",   X: 460, Y: 530}
            ],
            CHARACTERS: [
                {Id: "hime",   Name: "Player",  Color: "green",  Initial: "player_entry"},
                {Id: "oldguy", Name: "Old Guy", Color: "yellow", Initial: "old_guy_entry"}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 3,  S: "hime", A: ActionType.Move, O: {to: "player_main"} }
            ],
            NEXT: "Map_00"
        }
    ];

    static getLevel(name: string): any {
        let levelArray = Levels.MAPS.filter(map => map.NAME === name);
        
        if(levelArray.length === 1) {
            return levelArray[0];
        } else {
            console.warn(`Level ${name} doesn't exist or there are multiple maps with the same name!`);
        }
    }

    static isCutscene(name: string): boolean {
        return Levels.getLevel(name).TYPE === Levels.TYPES.CUTSCENE;
    }

    static isGameLevel(name: string): boolean {
        return Levels.getLevel(name).TYPE === Levels.TYPES.NORMAL;
    }

    static getCurrentLevelName(): string {
        return Storage.get("currentLevel", "Map_00");
    }
}