declare var globals: any;
import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Levels} from "../config/Levels";
import {Resources} from "../config/Resources";
import {Storage, SavedLevelData} from "../Storage";
import {AudioManager} from "../AudioManager";

class HTMLDialogue {
    protected dlg: HTMLElement;
    protected title: HTMLElement;
    protected text: HTMLElement;
    protected btnNope: HTMLElement;
    protected btnOkay: HTMLElement;

    constructor(dialogClass: string = ".dlg") {
        this.dlg = document.querySelector(`${dialogClass}`) as HTMLElement;
        this.title = document.querySelector(`${dialogClass} .dlg__title`) as HTMLElement;
        this.text = document.querySelector(`${dialogClass} .dlg__text`) as HTMLElement;
        this.btnNope = document.querySelector(`${dialogClass} .dlg__btn--nope`) as HTMLElement;
        this.btnOkay = document.querySelector(`${dialogClass} .dlg__btn--okay`) as HTMLElement;
    }

    public show(): void {
        document.querySelector('canvas').style.display = 'none';
        this.dlg.style.display = "block";
    }

    public hide(): void {
        document.querySelector('canvas').style.display = 'block';
        this.dlg.style.display = "none";
    }

    /**
     * Returns an <ul> with a <li> for every chiffre in the number.
     * E.g. 123 would return 
     * <ul class="nr-wrapper">
     *  <li class="nr nr--1"></li>
     *  <li class="nr nr--2"></li>
     *  <li class="nr nr--3"></li>
     * </ul>
     *
     * @param nr Number
     */
    static createNumber(nr: number): HTMLElement {
        let nrContainer = document.createElement("ul");
        nrContainer.classList.add("nr-wrapper");

        for(let i = 0; i < nr.toString().length; i++) {
            let chiffreElem = document.createElement("li");
            chiffreElem.classList.add("nr", "nr--"+nr.toString()[i]);
            nrContainer.appendChild(chiffreElem);
        }

        return nrContainer;
    }

    static createBodyText(parentNode: HTMLElement, texts: Array<any>): void {
        parentNode.innerHTML = "";

        texts.forEach(text => {
            let paragraph = document.createElement("p");

            // TODO: if it's an object, we can use color and fonz size
            if (text.text) {
                paragraph.innerHTML = text.text;
            } else {
                paragraph.innerHTML = text;                
            }
            parentNode.appendChild(paragraph);
        });
    }
}

export class IntroDialogue extends HTMLDialogue {
    constructor() {
        super(".dlg--intro");
    }

    public setup(setup: any, callback: () => void, callbackNope?: () => void): void {
        this.title.innerHTML = setup.NAME;
        HTMLDialogue.createBodyText(this.text, setup.INTRO);
        this.btnOkay.addEventListener("click", callback);

        if(callbackNope) {
            this.btnNope.addEventListener("click", callbackNope);
            this.btnNope.style.display = "";
        } else {
            this.btnNope.style.display = "none";
        }
    }
}

export class OutroDialogue extends HTMLDialogue {
    protected scoreDisplay: HTMLElement;
    protected scoreList: HTMLElement;

    constructor() {
        let dialogClass = ".dlg--outro";

        super(dialogClass);

        this.scoreDisplay = document.querySelector(`${dialogClass} .dlg__score`) as HTMLElement;
        this.scoreList = document.querySelector(`${dialogClass} .score-list`) as HTMLElement;
    }

    public setup(setup: any, result: number, passed: boolean, callback: () => void, callbackNope?: () => void): void {
        let outroTexts = [""];
        
        if (passed && setup.OUTRO) {
            outroTexts = setup.OUTRO;
        } else if (setup.OUTRO_FAILED) {
            outroTexts = setup.OUTRO_FAILED;
        }

        this.title.innerHTML = setup.NAME;
        HTMLDialogue.createBodyText(this.text, outroTexts);

        this.addScores(setup, result);

        this.btnOkay.addEventListener("click", callback);

        // only show Next button if there's a next level or the user can retry
        if (!!setup.NEXT || !passed) {
            this.btnOkay.style.display = "";
        } else {
            this.btnOkay.style.display = "none";
        }

        if (callbackNope) {
            this.btnNope.addEventListener("click", callbackNope);
            this.btnNope.style.display = "";
        } else {
            this.btnNope.style.display = "none";
        }
    }

    private addScores(setup: any, result: number) {
        this.scoreDisplay.innerHTML = "";
        this.scoreDisplay.appendChild(HTMLDialogue.createNumber(result));
        
        this.scoreList.innerHTML = "";        
        let scores = Storage.saveScore(setup.NAME, result);
        let sortedScores = scores.getSortedScores();

        for(let scoreCounter = 0; scoreCounter < sortedScores.length; scoreCounter++) {
            let score = sortedScores[scoreCounter];

            let newNode = document.createElement("li");
            newNode.appendChild(HTMLDialogue.createNumber(score));
            newNode.classList.add("score-list__item"); 
            
            // If this run's score is under the top 3, show the medal (but only if it wasn't zero)
            if (result !== 0 && score === result && scoreCounter < 3) {
                newNode.classList.add("score-list__item--current");
            }

            this.scoreList.appendChild(newNode);
        }
    }
}

export class SimpleDialogue extends HTMLDialogue {
    constructor() {
        super(".dlg--credits");
    }

    public setup(callback: () => void): void {
        this.btnOkay.addEventListener("click", callback);
    }
}

export class CustomGameDialogue extends HTMLDialogue {
    protected blobToggle: HTMLInputElement;
    protected _difficultyRadios: HTMLInputElement;

    private _difficulties: any;
    private _settings: any;

    constructor() {
        super(".dlg--custom-game");

        this._difficulties = {
            easy: {
                items: ["rabbit"],
                sources: [{X: 700, Y: 500, T: "rabbit",   DECAY: false}]
            },
            medium: {
                items: ["rabbit", "elephant"],
                sources: [
                    {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                    {X: 300, Y: 300, T: "elephant", DECAY: false},
                ]
            },
            hard: {
                items: ["rabbit", "elephant", "giraffe"],
                sources: [
                    {X: 700, Y: 500, T: "rabbit",   DECAY: false},
                    {X: 300, Y: 300, T: "elephant", DECAY: false},
                    {X: 600, Y: 300, T: "giraffe",  DECAY: false}
                ]
            }
        };

        this._settings = {
            IMG: "Map_01_first_day",
            W: 840,
            H: 560,
            CASSA: {X: 250, Y: 500},
            DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
            DESIREDITEMS: [],
            ITEMSOURCES: [],
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
        };

        this.blobToggle = document.querySelector('.dlg--custom-game #blob_switch') as HTMLInputElement;
        this.blobToggle.checked = this._settings.BLOB;

        this._setDifficulty(0);

        // TODO: radio buttons for the difficulty
    }

    public setup(onGoBack: () => void): void {

        this.blobToggle.addEventListener("change", (event) => {
            this._settings.BLOB = (event.target as HTMLInputElement).checked;
        });

        this.btnOkay.addEventListener("click", () => {
            globals.customGame(this._settings);
        });
        this.btnNope.addEventListener("click", onGoBack);
    }

    private _setDifficulty(difficultyLevel: number): void {
        let items = [],
            sources = [];

        switch (difficultyLevel) {
            case 0:
                items = this._difficulties.easy.items;
                sources = this._difficulties.easy.sources;
                break;
            case 1:
                items = this._difficulties.medium.items;
                sources = this._difficulties.medium.sources;
                break;
            case 2:
                items = this._difficulties.hard.items;
                sources = this._difficulties.hard.sources;
                break;
        }

        this._settings.ITEMSOURCES = sources;
        this._settings.DESIREDITEMS = items;
    }
}

export class OptionsDialogue extends HTMLDialogue {
    protected muteToggle: HTMLInputElement;

    constructor() {
        super(".dlg--options");

        this.muteToggle = document.querySelector('.dlg--options #mute_switch') as HTMLInputElement;

        this.muteToggle.checked = AudioManager.isMuted;
    }

    public setup(onOkay: () => void, onMuteChange: (boolean) => void): void {
        this.btnOkay.addEventListener("click", onOkay);

        this.muteToggle.addEventListener("change", (event) => {
            onMuteChange(AudioManager.toggleMute());
        });
    }
}