import * as ex from "excalibur";
import {Config} from "./Config";
import {Resources} from "./Resources";
import {Storage} from "../Storage";
import {Task, TaskItem} from "../Task";
import {EffectTypes, EffectFactory} from "../Effects";

export enum ActionType {
    Move = "move",
    Talk = "talk",
    Hide = "hide",
    Show = "show",
    Effect = "effect"
};

export class Levels {
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
        },
        STORE_GREY_FILLED: {
            IMG: "Grey_Store_Filled",
            W: 840,
            H: 560
        },
        INTERMEZZO: {
            IMG: "Intermezzo",
            W: 840,
            H: 560
        }
    };
    static CHARS = {
        HIME: {
            Name: "Hime",
            Type: "HIME",
            Color: ex.Color.fromHex("#F09BB5")
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
        },
        GAIA: {
            Name: "Gaia",
            Type: "GREEN",
            Color: ex.Color.White
        }
    };

    static LEVEL = {
        L1_1: {
            ID: "L1_1",
            TITLE: "Hello World",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 8},
            DESIREDITEMS: ["rabbit"],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: "rabbit", DECAY: false}
            ],
            TOOLS: [],
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 10,
                START: "08:00",
                END: "18:00"
            },
            BLOB: false,
            INTRO: [
                "Welcome to your new Rabbit Store!",
                "Make your customers happy and sell them",
                "all the rabbits they need!",
                "(and don't forget to open the door)"
            ],
            OUTRO: ["Well done!"]
        },
        C1_1: {
            ID: "C1_1",
            TITLE: "School's out",
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
                {T: 40, S: "hime", A: ActionType.Talk, O: {text: "«Psyche completely researched.»"} },
                {T: 44, S: "hime", A: ActionType.Talk, O: {text: "«No more psych studies.»"} },
                {T: 46, S: "phone",A: ActionType.Hide},
                {T: 50, S: "hime", A: ActionType.Talk, O: {text: "Poop! What do I do now?", duration: 4} },
                {T: 54, S: "hime", A: ActionType.Move, O: {to: "player_entry"} },
                {T: 58, S: "hime", A: ActionType.Hide}                
            ]
        },
        L1_2: {
            ID: "L1_2",
            TITLE: "Another day",
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
            BLOB: false,
            INTRO: [
                "Welcome back",
                "Now with 100% more pigs and parrots!"
            ],
            OUTRO: ["Well done!"]
        },
        L1_3: {
            ID: "L1_3",
            TITLE: "SLOOOTHS",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 6},
            DESIREDITEMS: [
                Config.ANIMALS.SLOTH,
                Config.ANIMALS.PENGUIN,
                Config.ANIMALS.PANDA],
            ITEMSOURCES: [
                {X: 700, Y: 400, T: Config.ANIMALS.SLOTH,   DECAY: false},
                {X: 300, Y: 300, T: Config.ANIMALS.PENGUIN, DECAY: false},
                {X: 600, Y: 300, T: Config.ANIMALS.PANDA,   DECAY: false}
            ],
            TOOLS: [],
            BLOB: false,
            INTRO: [
                "Aw yeah",
                "Sloths and shit!"
            ],
            OUTRO: ["Well done!"]
        }
    };

    static AREAS = {
        GRASS: {
            TITLE: "Grass",
            BACKGROUND: Resources.Map_forest,
            EFFECT: EffectTypes.None,
            AUDIO: Resources.Sound_Intro,
            LEVELS: [
                Levels.LEVEL.L1_1,
                Levels.LEVEL.C1_1,
                Levels.LEVEL.L1_2,
                Levels.LEVEL.L1_3
            ]
        },
        DESERT: {
            TITLE: "Desert",
            BACKGROUND: Resources.Map_forest,
            EFFECT: EffectTypes.None /* maybe some wind/sandstorm */,
            AUDIO: Resources.Sound_Intro
        },
        SNOW: {
            TITLE: "Snow",
            BACKGROUND: Resources.Map_forest,
            EFFECT: EffectTypes.Snow,
            AUDIO: Resources.Sound_Intro
        }
    };
    
    static MAPS = [
        { /* TEST */
            NAME: "Test",
            TYPE: Levels.TYPES.NORMAL,
            CONF: Levels.SETTINGS.STORE_GREY,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5, RUSH_HOUR: true},
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
                ITEMS: [Config.ITEMS.MEDKIT],
                MOBILITY: TaskItem.Mobility.Stationary,
                REQUIRED_INTERACTIONS: 5
                /*
                TYPE: Task.Type.SingleUse,
                AMOUNT: 10,
                ITEMS: [Config.ITEMS.CASH],
                MOBILITY: TaskItem.Mobility.Stationary,
                SPAWNING: TaskItem.SpawnBehaviour.AllAtOnce
                */
            },
            BLOB: true,
            TIME: {
                TYPE: Levels.TIMERS.CLOCK,
                DURATION_S: 30,
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
                {T: 40, S: "hime", A: ActionType.Talk, O: {text: "«Psyche completely researched.»"} },
                {T: 44, S: "hime", A: ActionType.Talk, O: {text: "«No more psych studies.»"} },
                {T: 46, S: "phone",A: ActionType.Hide},
                {T: 50, S: "hime", A: ActionType.Talk, O: {text: "Poop! What do I do now?", duration: 4} },
                {T: 54, S: "hime", A: ActionType.Move, O: {to: "player_entry"} },
                {T: 58, S: "hime", A: ActionType.Hide}                
            ],
            NEXT: "uncle_to_the_rescue"
        }, { /* CUTSCENE: Uncle to the rescue */
            NAME: "uncle_to_the_rescue",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.FOREST,
            LOCATIONS: [
                {Name: "player_entry",   X: 100, Y: 550},
                {Name: "uncle_entry",    X: 900, Y: 550},
                {Name: "player_main",    X: 380, Y: 550},
                {Name: "player_main_2",  X: 250, Y: 550},
                {Name: "uncle_main",     X: 460, Y: 550}
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_entry"},
                {Id: "uncle", Char: Levels.CHARS.UNCLE, Initial: "uncle_entry", Opacity: 0}
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
                {T: 18, S: "uncle",A: ActionType.Show},
                {T: 20, S: "uncle",A: ActionType.Move, O: {to: "uncle_main"} },
                {T: 24, S: "uncle",A: ActionType.Talk, O: {text: "..."} },
                {T: 26, S: "hime", A: ActionType.Talk, O: {text: "*sob*", duration: 2} },
                {T: 28, S: "uncle",A: ActionType.Talk, O: {text: "Oh noes! What happened?", duration: 3 } },
                {T: 32, S: "hime", A: ActionType.Talk, O: {text: "Uncle!"} },
                {T: 34, S: "hime", A: ActionType.Talk, O: {text: "I don't know what to do!"} },
                {T: 37, S: "hime", A: ActionType.Talk, O: {text: "My future is doomed!", duration: 3} },
                {T: 40, S: "uncle",A: ActionType.Talk, O: {text: "Oh dear! What a pickle.", duration: 3} },
                {T: 43, S: "hime", A: ActionType.Talk, O: {text: "*sob*", duration: 2} },
                {T: 44, S: "uncle",A: ActionType.Talk, O: {text: "But you're in luck!"} },
                {T: 47, S: "uncle",A: ActionType.Talk, O: {text: "I'm retiring tomorrow and"} },
                {T: 50, S: "uncle",A: ActionType.Talk, O: {text: "am looking for a successor.", duration: 3} },
                {T: 53, S: "hime", A: ActionType.Talk, O: {text: "*sob*", duration: 2} },
                {T: 55, S: "hime", A: ActionType.Talk, O: {text: "... really? Where?", duration: 2} },
                {T: 57, S: "uncle",A: ActionType.Talk, O: {text: "At my Rabbit Store!", duration: 3} },
                {T: 60, S: "hime", A: ActionType.Talk, O: {text: "I don't know...", duration: 3} },
                {T: 63, S: "uncle",A: ActionType.Talk, O: {text: "Humbug! You can start tomorrow!", duration: 3} },
                {T: 66, S: "uncle",A: ActionType.Move, O: {to: "uncle_entry"} }
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
            INTRO: [
                "Welcome to your new Rabbit Store!",
                "Make your customers happy and sell them",
                "all the rabbits they need!",
                "(and don't forget to open the door)"
            ],
            OUTRO: ["Well done!"],
            NEXT: "more_animals"
        }, { /* CUTSCENE: More animals */
            NAME: "more_animals",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.HOME,
            LOCATIONS: [
                {Name: "player_entry",  X: 900, Y: 480},
                {Name: "player_main",   X: 460, Y: 480},
                {Name: "uncle_main",    X: 380, Y: 480}
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_entry", Opacity: 0},
                {Id: "uncle", Char: Levels.CHARS.UNCLE, Initial: "uncle_main"}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 1, S: "hime", A: ActionType.Show},
                {T: 2, S: "hime", A: ActionType.Move, O: {to: "player_main"} },
                {T: 5, S: "uncle",A: ActionType.Talk, O: {text: "Hello! How did it go?"} },
                {T: 8, S: "hime", A: ActionType.Talk, O: {text: "Oh Uncle! Thanks for letting me try it out."} },
                {T:12, S: "hime", A: ActionType.Talk, O: {text: "Not a lot of people showed up..."} },
                {T:16, S: "hime", A: ActionType.Talk, O: {text: "I'm not sure if I should continue..."} },
                {T:20, S: "uncle",A: ActionType.Talk, O: {text: "Nonsense, child! Give it another couple of days."} },
                {T:24, S: "uncle",A: ActionType.Talk, O: {text: "I actually have some more animals you could have at the shop!"} },
                {T:28, S: "uncle",A: ActionType.Talk, O: {text: "Parrots and Pigs! I'm sure that attracts more people."} },
                {T:32, S: "uncle",A: ActionType.Talk, O: {text: "Now off you go, tomorrow will be a long day.", duration: 4} },
            ],
            NEXT: "second_day"
        }, { /* NORMAL: Second day with Parrots and Pigs */
            NAME: "second_day",
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
            BLOB: false,
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
            INTRO: [
                "Word has reached even",
                "more people, it seems!"
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
                ITEMS: ["ticket_stub", "oven_glove", "clipboard", "book", "book_red"],
                MOBILITY: TaskItem.Mobility.Stationary,
                SPAWNING: TaskItem.SpawnBehaviour.AllAtOnce
            },
            BLOB: false,
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
                {Name: "uncle_entry",  X: 900, Y: 550},
                {Name: "player_main",    X: 380, Y: 550},
                {Name: "player_main_2",  X: 250, Y: 550},
                {Name: "uncle_main",   X: 460, Y: 550}
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_main"},
                {Id: "uncle", Char: Levels.CHARS.UNCLE, Initial: "uncle_entry", Opacity: 0}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 1,  S: "uncle", A: ActionType.Show},
                {T: 2,  S: "uncle", A: ActionType.Move, O: {to: "uncle_main"} },
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
                {T: 50, S: "uncle", A: ActionType.Move, O: {to: "uncle_entry"} },
                {T: 52, S: "uncle", A: ActionType.Hide},
            ],
            NEXT: "fifth_day_blob"
        }, { /* NORMAL: Fifth day - Blob! */
            NAME: "fifth_day_blob",
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
            TASK: {},
            BLOB: true,
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
                {Name: "player_first",  X: 100, Y: 550},
                {Name: "player_main",   X: 380, Y: 550},
                {Name: "umato_main",    X: 450, Y: 550},
                {Name: "loc_telescope", X: 520, Y: 550},
                {Name: "umato_exit",    X: 900, Y: 550},
            ],
            CHARACTERS: [
                {Id: "hime", Char: Levels.CHARS.HIME, Initial: "player_entry"},
                {Id: "umato", Char: Levels.CHARS.UMATO, Initial: "umato_main"},
                {Id: "phone", Char: Levels.CHARS.GAIA, Initial: "umato_main", Opacity: 0}
            ],
            PROPS: [
                {Id: "telescope", Type: "telescope", Initial: "loc_telescope", Opacity: 1}
            ],
            SCRIPT: [
                {T: 2,  S: "hime", A: ActionType.Move, O: {to: "player_first"} },
                {T: 4,  S: "hime", A: ActionType.Talk, O: {text: "Finally some peace and quiet after this week."} },
                {T: 8,  S: "hime", A: ActionType.Talk, O: {text: "I can't believe this all happened."} },
                {T: 12, S: "hime", A: ActionType.Talk, O: {text: "The store and everything...", duration: 4} },
                {T: 18, S: "hime", A: ActionType.Talk, O: {text: "Still feeling bad about my dream...", duration: 4} },
                {T: 24, S: "hime", A: ActionType.Talk, O: {text: "Ah, I'm sure a walk will be nice!", duration: 2} },
                {T: 26, S: "hime", A: ActionType.Move, O: {to: "player_main"} },
                {T: 28, S: "umato", A: ActionType.Talk, O: {text: "Aaah!"} },
                {T: 30, S: "umato", A: ActionType.Talk, O: {text: "What?"} },
                {T: 32, S: "umato", A: ActionType.Talk, O: {text: "Who?!"} },
                {T: 36, S: "hime", A: ActionType.Talk, O: {text: "Oh no! Sorry!"} },
                {T: 39, S: "hime", A: ActionType.Talk, O: {text: "I didn't mean to startle you!"} },
                {T: 39, S: "hime", A: ActionType.Talk, O: {text: "Who are you... and what are you doing, anyway?"} },
                {T: 43, S: "umato", A: ActionType.Talk, O: {text: "I'm Umato and I'm trying to see BLU-42."} },
                {T: 47, S: "umato", A: ActionType.Talk, O: {text: "What about you?"} },
                {T: 47, S: "hime", A: ActionType.Talk, O: {text: "I'm Hime and I work at a Pet Store."} },
                {T: 51, S: "umato", A: ActionType.Talk, O: {text: "Oh cool! I've always dreamed about working in one!"} },
                {T: 55, S: "umato", A: ActionType.Talk, O: {text: "Is it yours?"} },
                {T: 57, S: "hime", A: ActionType.Talk, O: {text: "My uncle's. And I've only worked there a week."} },
                {T: 61, S: "hime", A: ActionType.Talk, O: {text: "What do you do?"} },
                {T: 64, S: "umato", A: ActionType.Talk, O: {text: "I'm a pilot... but I really want to go to space."} },
                {T: 68, S: "hime" , A: ActionType.Talk, O: {text: "That's interesting! Is BLU-42 a plane?"} },
                {T: 72, S: "umato", A: ActionType.Talk, O: {text: "No, it's a planet they discovered -"} },
                {T: 75, S: "phone", A: ActionType.Talk, O: {text: "*buzz* *buzz*"} },
                {T: 77, S: "umato", A: ActionType.Talk, O: {text: "Oh. I have to go! But I'll check out that pet store!"} },
                {T: 80, S: "telescope" , A: ActionType.Hide},
                {T: 82, S: "umato", A: ActionType.Talk, O: {text: "It was very nice meeting you!"} },
                {T: 86, S: "umato", A: ActionType.Move, O: {to: "umato_exit"} },
                {T: 88, S: "umato", A:ActionType.Hide},
                {T: 90, S: "hime" , A: ActionType.Talk, O: {text: "Huh. What a handsome guy. Will he really come by?", duration: 4} }
            ],
            NEXT: "w2d1_cleanup"
        }, {
            NAME: "w2d1_cleanup",
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
            TASK: {
                /* TODO: get some good locations, set manually */
                TYPE: Task.Type.SingleUse,
                AMOUNT: 10,
                ITEMS: [Config.ITEMS.COBWEB_1, Config.ITEMS.COBWEB_2],
                MOBILITY: TaskItem.Mobility.Stationary,
                SPAWNING: TaskItem.SpawnBehaviour.AllAtOnce
            },
            BLOB: true,
            INTRO: [
                "Clean up the store before",
                "the handsome stranger arrives"
            ],
            OUTRO: [
                "Well done, and so clean!",
                "All ready for a visit!"
            ],
            NEXT: "off_her_feet"
        }, { /* CUTSCENE: Swept off her feet */
            NAME: "off_her_feet",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.STORE_GREY_FILLED,
            LOCATIONS: [
                {Name: "door", X: 800, Y: 595},
                {Name: "cassa", X: 250, Y: 500},
                {Name: "station_rabbit", X: 700, Y: 400},
                {Name: "station_parrot", X: 300, Y: 300},
                {Name: "station_pig",    X: 600, Y: 300},
                {Name: "umato_main",     X: 700, Y: 300},
                {Name: "hime_main",      X: 550, Y: 300}
            ],
            CHARACTERS: [
                {Id: "hime",  Char: Levels.CHARS.HIME,  Initial: "cassa"},
                {Id: "umato", Char: Levels.CHARS.UMATO, Initial: "door", Opacity: 0},
                {Id: "gaia",  Char: Levels.CHARS.GAIA,  Initial: "cassa", Opacity: 0}
            ],
            PROPS: [],
            SCRIPT: [
                {T: 2, S: "gaia", A: ActionType.Talk, O: {text: "Later that evening..."}},
                {T: 6, S: "hime", A: ActionType.Talk, O: {text: "I don't think he's coming."} },
                {T: 10,S: "hime", A: ActionType.Talk, O: {text: "Time to close shop, I guess..."} },
                {T: 14,S: "hime", A: ActionType.Move, O: {to: "station_parrot"}},
                {T: 16,S: "gaia", A: ActionType.Effect, O: {type: EffectTypes.Heart, at: "station_parrot"}},
                {T: 17,S: "hime", A: ActionType.Talk, O: {text: "Good night, parrots."} },
                {T: 20,S: "hime", A: ActionType.Move, O: {to: "station_rabbit"}},
                {T: 21,S: "gaia", A: ActionType.Effect, O: {type: EffectTypes.Heart, at: "station_rabbit"}},
                {T: 22,S: "hime", A: ActionType.Talk, O: {text: "Good night, rabbits."} },
                {T: 27,S: "hime", A: ActionType.Move, O: {to: "station_pig"}},
                {T: 29,S: "gaia", A: ActionType.Effect, O: {type: EffectTypes.Heart, at: "station_pig"}},
                {T: 30,S: "hime", A: ActionType.Talk, O: {text: "And a good night to you, piggies."} },
                {T: 34,S:"umato", A: ActionType.Show},
                {T: 36,S: "hime", A: ActionType.Talk, O: {text: "I really would have loved to see him, piggies."}},
                {T: 40,S:"umato", A: ActionType.Talk, O: {text: "..."}},
                {T: 42,S: "gaia", A: ActionType.Talk, O: {text: "*oink* *oink*"}},
                {T: 44,S:"umato", A: ActionType.Move, O: {to: "umato_main"}},
                {T: 46,S:"umato", A: ActionType.Talk, O: {text: "Hi."}},
                {T: 48,S: "hime", A: ActionType.Talk, O: {text: "Ah!!!"}},
                {T: 50,S: "hime", A: ActionType.Move, O: {to: "hime_main"}},
                {T: 51,S: "hime", A: ActionType.Talk, O: {text: "You came! Oh I'm glad you came!"} },
                {T: 55,S:"umato", A: ActionType.Talk, O: {text: "I'm happy to see you too."}},
                {T: 59,S:"umato", A: ActionType.Talk, O: {text: "In fact, I've been thinking about you all day.", duration: 4}},
            ],
            NEXT: "intermezzo"
        }, { /* CUTSCENE: INTERMEZZO - END OF PART 1 */
            NAME: "intermezzo",
            TYPE: Levels.TYPES.CUTSCENE,
            CONF: Levels.SETTINGS.INTERMEZZO,
            LOCATIONS: [
                {Name: "any", X: 0, Y: 0}
            ],
            CHARACTERS: [
                {Id: "gaia",  Char: Levels.CHARS.GAIA,  Initial: "any", Opacity: 0}
            ],
            PROPS: [
            ],
            SCRIPT: [
                {T: 20, S: "gaia", A: ActionType.Talk, O: {text: "Thank you for playing!"}},
                {T: 50, S: "gaia", A: ActionType.Talk, O: {text: "See you in part 2, hopefully!", duration: 30}}
            ]
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
            INTRO: [
                "As a proud owner of your new pet store,",
                "make sure each customer gets what they want!"
            ],
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