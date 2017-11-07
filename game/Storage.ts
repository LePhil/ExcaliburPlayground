import * as ex from "excalibur";

export class Storage {
    static set(key:string, value:any):void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    static get(key:string, defaultValue?: any):any {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key));
        } else if (typeof defaultValue !== "undefined") {
            return defaultValue;
        } else {
            console.warn(`Key "${key}" not found in LocalStorage.`);
            return false;
        }
    }

    static getLevelData(levelID: string): SavedLevelData {
        let levelData = Storage.get(levelID, levelID);

        return SavedLevelData.make(levelData);
    }

    /**
     * Gets the scores for a specific level, adds a new score and saves it again.
     * 
     * @param levelID string
     * @param score number
     */
    static saveScore(levelID: string, score: number): SavedLevelData {
        let oldData = Storage.getLevelData(levelID);

        oldData.addScore(score);

        Storage.set(levelID, oldData);

        return oldData;
    }
}

export class SavedLevelData {
    public levelID: string;
    public scores: Array<number>;

    constructor(id: string, scores?: Array<number>) {
        this.levelID = id;
        this.scores = scores || [];
    }

    // TODO: nonnonono it's sorted alphabetically, 72 is NOT larger than 145!
    getSortedScores(): Array<number> {
        return this.scores.sort().reverse();
    }

    addScore(newScore): void {
        this.scores.push(newScore);
    }

    static make(setup: any): SavedLevelData {
        if (setup.levelID && setup.scores && Array.isArray(setup.scores)) {
          return new SavedLevelData(setup.levelID, setup.scores);
        } else if (setup.levelID) {
          return new SavedLevelData(setup.levelID);
        } else if (typeof setup === "string") {
          return new SavedLevelData(setup);          
        } else {
          console.warn("Can't make new SavedLevelData without proper data!");
        }
    }
}