import * as ex from "excalibur";
import {Config} from "./Config";
import {Storage} from "../Storage";
import {Task, TaskItem} from "../Task";

enum ActionType {
    Move = "move",
    Talk = "talk",
    Hide = "hide",
    Show = "show"
};

export class Levels {
    static ActionType = ActionType; // TODO: needed here?
    static TYPES = {
        NORMAL: "normal",       // Normal time management
        CUTSCENE: "cutscene"    // For some story
    };
    static TIMERS = {
        CLOCK: "clock",         // HH:MM style clock
        COUNTDOWN: "countdown"  // Counting down seconds
    };
    static SETTINGS = {
        HOME: {
            IMG: "Map_intro_01",
            W: 840,
            H: 560
        },
        FOREST: {
            IMG: "Map_forest",
            W: 840,
            H: 560
        },
        STORE_GREY: {
            IMG: "Map_01_first_day",
            W: 840,
            H: 560
        }
    };
    static CHARS = {
        HIME: {
            Name: "Hime",
            Type: "HIME",
            Color: ex.Color.Rose
        },
        UNCLE: {
            Name: "Uncle",
            Type: "UNCLE",
            Color: ex.Color.Yellow
        },
        UMATO: {
            Name: "Umato",
            Type: "UMATO",
            Color: ex.Color.Blue
        }
    };
    
    static MAPS = [
        { /* TEST */
            NAME: "Test",
            TYPE: Levels.TYPES.NORMAL,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit", "elephant", "giraffe"],
            ITEMSOURCES: [
                {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                {X: 300, Y: 300, T: "elephant", DECAY: false},
                {X: 600, Y: 300, T: "giraffe",  DECAY: false},
                {X: 300, Y: 600, T: "hammer",   DECAY: false}
            ],
            TOOLS: [
                {X: 500, Y: 500, T: "hammer"},
                {X: 400, Y: 400, T: Config.ITEMS.FIREWORKS}
            ],
            TASK: {
                TYPE: Task.Type.MultiUse,
                ITEM: Config.ITEMS.MEDKIT,
                MOBILITY: TaskItem.Mobility.Stationary,
                REQUIRED_INTERACTIONS: 5
                /*
                TYPE: Task.Type.SingleUse,
                AMOUNT: 10,
                ITEM: Config.ITEMS.CASH,
                MOBILITY: TaskItem.Mobility.Stationary,
                SPAWNING: TaskItem.SpawnBehaviour.AllAtOnce
                */
            },
            BLOB: true,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 15,
                START: "08:00",
                END: "18:00"
            },
            INTRO: [{text: "Hello", fontSize: 44, color: ex.Color.Red}],
            OUTRO: ["Well done!"],
            OUTRO_FAILED: ["You failed the Task :("]
        }, { /* CUTSCENE: School's out */
            NAME: "schools_out",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.HOME,
            LOCATIONS: [
                {Name: "player_entry",  X: 900, Y: 480},
                {Name: "player_main",   X: 380, Y: 480},
                {Name: "phone_initial", X: 350, Y: 480},
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_entry"}
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
        }, { /* CUTSCENE: Uncle to the rescue */
            NAME: "uncle_to_the_rescue",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.FOREST,
            LOCATIONS: [
                {Name: "player_entry",   X: 100, Y: 550},
                {Name: "old_guy_entry",  X: 900, Y: 550},
                {Name: "player_main",    X: 380, Y: 550},
                {Name: "player_main_2",  X: 250, Y: 550},
                {Name: "old_guy_main",   X: 460, Y: 550}
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_entry"},
                {Id: "uncle", Char: Levels.CHARS.UNCLE, Initial: "old_guy_entry", Opacity: 0}
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
                {T: 22, S: "uncle",A: ActionType.Move, O: {to: "old_guy_main"} },
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
        }, { /* NORMAL: First day */
            NAME: "first_day",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 8},
            DESIREDITEMS: ["rabbit"],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: "rabbit", DECAY: false}
            ],
            TOOLS: [],
            BLOB: false,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 60,
                START: "08:00",
                END: "18:00"
            },
            INTRO: [
                "Welcome to your new Rabbit Store!",
                "Make your customers happy and sell them",
                "all the rabbits they need!",
                "(and don't forget to open the door)"
            ],
            OUTRO: ["Well done!"],
            NEXT: "more_animals"
        }, { /* CUTSCENE: More animals TODO!!! */
            NAME: "more_animals",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.STORE_GREY,
            LOCATIONS: [],
            CHARACTERS: [],
            PROPS: [],
            SCRIPT: [],
            NEXT: "second_day"
        }, { /* NORMAL: Second day */
            NAME: "second_day",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 8},
            DESIREDITEMS: ["rabbit", "parrot", "pig"],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: "rabbit", DECAY: false},
                {X: 300, Y: 300, T: "parrot", DECAY: false},
                {X: 600, Y: 300, T: "pig",    DECAY: false}
            ],
            TOOLS: [],
            BLOB: false,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 60,
                START: "08:00",
                END: "18:00"
            },
            INTRO: [
                "Welcome back",
                "Now with 100% more pigs and parrots!"
            ],
            OUTRO: ["Well done!"],
            NEXT: "third_day"
        }, { /* NORMAL: Third day */
            NAME: "third_day",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit", "parrot", "pig"],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: "rabbit", DECAY: false},
                {X: 300, Y: 300, T: "parrot", DECAY: false},
                {X: 600, Y: 300, T: "pig",    DECAY: false}
            ],
            TOOLS: [],
            BLOB: false,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 60,
                START: "08:00",
                END: "18:00"
            },
            INTRO: [
                "Word has reached more",
                "people, it seems!"
            ],
            OUTRO: ["Well done again!"],
            NEXT: "trash_everywhere"
        }, { /* CUTSCENE: Trash everywhere */
            NAME: "trash_everywhere",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.STORE_GREY,
            LOCATIONS: [
                {Name: "player_entry",X:   0, Y: 550},
                {Name: "player_main", X: 500, Y: 550}
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_entry"}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 2,  S: "hime", A: ActionType.Move, O: {to: "player_main"} },
                {T: 6,  S: "hime", A: ActionType.Talk, O: {text: "Gasp!", duration: 4} },
                {T: 10, S: "hime", A: ActionType.Talk, O: {text: ""} },
                {T: 12, S: "hime", A: ActionType.Talk, O: {text: "What a mess!", duration: 2} },
                {T: 14, S: "hime", A: ActionType.Talk, O: {text: "Trash everywhere!", duration: 4} },
                {T: 18, S: "hime", A: ActionType.Talk, O: {text: "No time to clean up before,", duration: 4} },
                {T: 22, S: "hime", A: ActionType.Talk, O: {text: "I'll have to clean while serving.", duration: 4} },
            ],
            NEXT: "fourth_day_trash"
        }, { /* NORMAL: Fourth day - cleanup */
            NAME: "fourth_day_trash",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 6},
            DESIREDITEMS: ["rabbit", "parrot", "pig"],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: "rabbit", DECAY: false},
                {X: 300, Y: 300, T: "parrot", DECAY: false},
                {X: 600, Y: 300, T: "pig",    DECAY: false}
            ],
            TOOLS: [],
            TASK: {
                TYPE: Task.Type.SingleUse,
                AMOUNT: 10,
                ITEM: Config.ITEMS.CASH,
                MOBILITY: TaskItem.Mobility.Stationary,
                SPAWNING: TaskItem.SpawnBehaviour.AllAtOnce
            },
            BLOB: false,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 60,
                START: "08:00",
                END: "18:00"
            },
            INTRO: [
                "Clean up all pieces of trash",
                "while handling the store."
            ],
            OUTRO: ["Much clean! Very undirty!"],
            NEXT: "introducing_blobs"
        }, { /* CUTSCENE: Introducing Blobs */
            NAME: "introducing_blobs",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.STORE_GREY,
            LOCATIONS: [
                {Name: "old_guy_entry",  X: 900, Y: 550},
                {Name: "player_main",    X: 380, Y: 550},
                {Name: "player_main_2",  X: 250, Y: 550},
                {Name: "old_guy_main",   X: 460, Y: 550}
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_main"},
                {Id: "uncle", Char: Levels.CHARS.UNCLE, Initial: "old_guy_entry", Opacity: 0}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 2,  S: "uncle", A: ActionType.Move, O: {to: "old_guy_main"} },
                {T: 6,  S: "uncle", A: ActionType.Talk, O: {text: "Hello kiddo!"} },
                {T: 8,  S: "uncle", A: ActionType.Talk, O: {text: "Very clean!"} },
                {T: 10, S: "uncle", A: ActionType.Talk, O: {text: "Have you heard the news?"} },
                {T: 12, S: "uncle", A: ActionType.Talk, O: {text: "The blobs are loose!"} },
                {T: 14, S: "hime", A: ActionType.Talk, O: {text: "... what?"} },
                {T: 18, S: "uncle", A: ActionType.Talk, O: {text: "What 'What'? The blobs are loose!"} },
                {T: 22, S: "hime", A: ActionType.Talk, O: {text: "What are ...blobs?"} },
                {T: 26, S: "uncle", A: ActionType.Talk, O: {text: "Blobs are the worst! An invasive species!"} },
                {T: 30, S: "hime", A: ActionType.Talk, O: {text: "Are they.. dangerous?"} },
                {T: 34, S: "uncle", A: ActionType.Talk, O: {text: "Well... no, they're just icky and annoy the customers."} },
                {T: 38, S: "uncle", A: ActionType.Talk, O: {text: "So maybe catch them quickly if you see one!"} },
                {T: 42, S: "uncle", A: ActionType.Talk, O: {text: "If you catch one the city will reward you."} },
                {T: 46, S: "uncle", A: ActionType.Talk, O: {text: "Alright, I have to go. Good luck!"} },
                {T: 50, S: "uncle", A: ActionType.Move, O: {to: "old_guy_main"} }
            ],
            NEXT: "fifth_day_blob"
        }, { /* NORMAL: Fifth day - Blob! */
            NAME: "fifth_day_blob",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 6},
            DESIREDITEMS: ["rabbit", "parrot", "pig"],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: "rabbit", DECAY: false},
                {X: 300, Y: 300, T: "parrot", DECAY: false},
                {X: 600, Y: 300, T: "pig",    DECAY: false}
            ],
            TOOLS: [],
            TASK: {},
            BLOB: true,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 70,
                START: "08:00",
                END: "18:00"
            },
            INTRO: [
                "Collect the bounty",
                "for catching a blob!"
            ],
            OUTRO: ["Well done!"],
            NEXT: "weekend_stroll"
        }, { /* CUTSCENE: Weekend Stroll */
            NAME: "weekend_stroll",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.FOREST,
            LOCATIONS: [
                {Name: "player_entry",  X: 0, Y: 550},
                {Name: "umato_entry",   X: 900, Y: 550},
                {Name: "player_main",   X: 380, Y: 550},
                {Name: "umato_main",    X: 450, Y: 550}
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_main"},
                {Id: "umato", Char: Levels.CHARS.UMATO, Initial: "umato_entry", Opacity: 0}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 2,  S: "uncle", A: ActionType.Move, O: {to: "old_guy_main"} },
            ],
            NEXT: "Map_01"
        }, {
            NAME: "Map_01",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
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
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 60,
                START: "08:00",
                END: "18:00"
            },
            INTRO: ["As a proud owner of your new pet store,",
            "make sure each customer gets what they want!"],
            OUTRO: ["Well done!"],
            NEXT: "Map_02"
        }, {
            NAME: "Map_02",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: ["rabbit", "elephant", "giraffe"],
            ITEMSOURCES: [
                {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                {X: 300, Y: 300, T: "elephant", DECAY: false},
                {X: 600, Y: 300, T: "giraffe",  DECAY: false}
            ],
            TOOLS: [
                {X: 500, Y: 500, T: "hammer"}
            ],
            BLOB: true,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 60,
                START: "08:00",
                END: "18:00"
            },
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