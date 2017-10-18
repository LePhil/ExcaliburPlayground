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
    static TIMERS = {
        CLOCK: "clock",         // HH:MM style clock
        COUNTDOWN: "countdown"  // Counting down seconds
    };
    
    static MAPS = [
        {
            NAME: "Test",
            TYPE: Levels.TYPES.NORMAL,
            W: 840,
            H: 560,
            TIMER: Levels.TIMERS.CLOCK,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit", "elephant", "giraffe"],
            ITEMSOURCES: [
                {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                {X: 300, Y: 300, T: "elephant", DECAY: true},
                {X: 600, Y: 300, T: "giraffe",  DECAY: true}
            ],
            TOOLS: [
                {X: 500, Y: 500, T: "hammer"}
            ],
            BLOB: true,
            DURATION_S: 60,
            INTRO: [{text: "Hello", fontSize: 44, color: ex.Color.Red}],
            OUTRO: ["Well done!"]
        }, {
            NAME: "schools_out",
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
                {Id: "hime", Name: "Player", Color: "red", Initial: "player_entry"}
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
                {T: 22, S: "hime", A: ActionType.Talk, O: {text: "But first, let's check SeenIt.", duration: 2} },
                {T: 24, S: "phone",A: ActionType.Show},
                {T: 28, S: "hime", A: ActionType.Talk, O: {text: "Hihi! Silly cats..."} },
                {T: 34, S: "hime", A: ActionType.Talk, O: {text: "Oh?"} },
                {T: 36, S: "hime", A: ActionType.Talk, O: {text: "..."} },
                {T: 40, S: "hime", A: ActionType.Talk, O: {text: "'Psyche completely researched.'"} },
                {T: 44, S: "hime", A: ActionType.Talk, O: {text: "'No more psych studies.'"} },
                {T: 46, S: "phone",A: ActionType.Hide},
                {T: 50, S: "hime", A: ActionType.Talk, O: {text: "Poop! What do I do now?", duration: 4} },
                {T: 54, S: "hime", A: ActionType.Move, O: {to: "player_entry"} },
                {T: 58, S: "hime", A: ActionType.Hide}                
            ],
            OUT: "fade",
            NEXT: "uncle_to_the_rescue"
        }, {
            NAME: "uncle_to_the_rescue",
            TYPE: Levels.TYPES.CUTSCENE,
            IMG: "Map_forest",
            W: 840,
            H: 560,
            LOCATIONS: [
                {Name: "player_entry",   X: 100, Y: 530},
                {Name: "old_guy_entry",  X: 900, Y: 530},
                {Name: "player_main",    X: 380, Y: 530},
                {Name: "player_main_2",  X: 250, Y: 530},
                {Name: "old_guy_main",   X: 460, Y: 530}
            ],
            CHARACTERS: [
                {Id: "hime",   Name: "Player",  Color: "red",  Initial: "player_entry"},
                {Id: "oldguy", Name: "Old Guy", Color: "yellow", Initial: "old_guy_entry", Opacity: 0}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 2,  S: "hime", A: ActionType.Move, O: {to: "player_main"} },
                {T: 6,  S: "hime", A: ActionType.Talk, O: {text: "What to do? What to do?", duration: 4} },
                {T: 10, S: "hime", A: ActionType.Talk, O: {text: ""} },
                {T: 10, S: "hime", A: ActionType.Move, O: {to: "player_main_2"} },
                {T: 12, S: "hime", A: ActionType.Talk, O: {text: "My dream, destroyed!", duration: 2} },
                {T: 14, S: "hime", A: ActionType.Move, O: {to: "player_main"} },
                {T: 16, S: "hime", A: ActionType.Talk, O: {text: "*sob*", duration: 2} },
                {T: 22, S: "oldguy",A: ActionType.Show},
                {T: 22, S: "oldguy",A: ActionType.Move, O: {to: "old_guy_main"} },
                {T: 24, S: "oldguy",A: ActionType.Talk, O: {text: "..."} },
                {T: 26, S: "hime", A: ActionType.Talk, O: {text: "*sob*", duration: 2} },
                {T: 28, S: "oldguy",A: ActionType.Talk, O: {text: "Oh noes! What happened?", duration: 3 } },
                {T: 32, S: "hime", A: ActionType.Talk, O: {text: "Uncle!"} },
                {T: 34, S: "hime", A: ActionType.Talk, O: {text: "I don't know what to do!"} },
                {T: 37, S: "hime", A: ActionType.Talk, O: {text: "My future is doomed!", duration: 3} },
                {T: 40, S: "oldguy",A: ActionType.Talk, O: {text: "Oh dear! What a pickle.", duration: 3} },
                {T: 43, S: "hime", A: ActionType.Talk, O: {text: "*sob*", duration: 2} },
                {T: 44, S: "oldguy",A: ActionType.Talk, O: {text: "But you're in luck!"} },
                {T: 47, S: "oldguy",A: ActionType.Talk, O: {text: "I'm retiring tomorrow and"} },
                {T: 50, S: "oldguy",A: ActionType.Talk, O: {text: "am looking for a successor.", duration: 3} },
                {T: 53, S: "hime", A: ActionType.Talk, O: {text: "*sob*", duration: 2} },
                {T: 55, S: "hime", A: ActionType.Talk, O: {text: "... really? Where?", duration: 2} },
                {T: 57, S: "oldguy",A: ActionType.Talk, O: {text: "At my Rabbit Store!", duration: 3} },
                {T: 60, S: "hime", A: ActionType.Talk, O: {text: "I don't know...", duration: 3} },
                {T: 63, S: "oldguy",A: ActionType.Talk, O: {text: "Humbug! You can start tomorrow!", duration: 3} },
                {T: 66, S: "oldguy",A: ActionType.Move, O: {to: "old_guy_entry"} }
            ],
            NEXT: "first_day"
        }, {
            NAME: "first_day",
            TYPE: Levels.TYPES.NORMAL,
            IMG: "Map_01_first_day",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit"],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: "rabbit",   DECAY: false}
            ],
            TOOLS: [],
            BLOB: false,
            DURATION_S: 60,
            INTRO: [
                "Welcome to your new Rabbit Store!",
                "Make your customers happy and sell them",
                "all the rabbits they need!",
                "(and don't forget to open the door)"
            ],
            OUTRO: ["Well done!"],
            NEXT: "Map_01"
        }, {
            NAME: "Map_01",
            TYPE: Levels.TYPES.NORMAL,
            IMG: "Map_01_first_day",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit", "elephant", "giraffe"],
            ITEMSOURCES: [
                {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                {X: 300, Y: 300, T: "elephant", DECAY: false},
                {X: 600, Y: 300, T: "giraffe",  DECAY: false}
            ],
            TOOLS: [
                {X: 200, Y: 200, T: "cup"},
                {X: 200, Y: 250, T: "hammer"},
                {X: 200, Y: 300, T: "bone"}
            ],
            BLOB: true,
            DURATION_S: 10,
            INTRO: ["As a proud owner of your new pet store,",
            "make sure each customer gets what they want!"],
            OUTRO: ["Well done!"],
            NEXT: "Map_02"
        }, {
            NAME: "Map_02",
            TYPE: Levels.TYPES.NORMAL,
            IMG: "Map_01_first_day",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit", "elephant", "giraffe"],
            ITEMSOURCES: [
                {X: 700, Y: 500, T: "rabbit",   DECAY: true},
                {X: 300, Y: 300, T: "elephant", DECAY: true},
                {X: 600, Y: 300, T: "giraffe",  DECAY: true}
            ],
            TOOLS: [
                {X: 500, Y: 500, T: "hammer"}
            ],
            BLOB: true,
            DURATION_S: 60,
            INTRO: ["Second level"],
            OUTRO: ["Well done!"]
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
        return Storage.get("currentLevel", "schools_out");
    }
}