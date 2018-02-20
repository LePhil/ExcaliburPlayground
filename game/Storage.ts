import * as ex from "excalibur";
import {Config} from "./config/Config";

/**
 * Responsibility:
 * Load and save data about the game (i.e. levels) in a sane 
 * and unified way to localstorage (or server if applicable at
 * some point).
 */
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

    static makeSureLevelDataExists(levelID: string): SavedLevelData {
        let levelData = Storage.get(levelID, false);

        if (!levelData) {
            levelData = SavedLevelData.makeNew(levelID);
            Storage.set(levelID, levelData);
        }

        return levelData;
    }

    /**
     * Gets the scores for a specific level, adds a new score and saves it again.
     * 
     * @param levelID string
     * @param score number
     */
    static saveScore(levelID: string, score: number): SavedLevelData {
        let storedData = Storage.getLevelData(levelID);

        storedData.addScore(score);

        Storage.set(levelID, storedData);

        return storedData;
    }

    static isLocked(levelID: string): boolean {
        return Storage.getLevelData(levelID).locked;
    }

    /**
     * Mainly used for debugging - clears all saved data.
     */
    static clearAll(): void {
        localStorage.clear();
    }
}

export class SavedLevelData {
    public levelID: string;
    public locked: boolean;
    public stars: number;
    public scores: Array<number>;

    constructor(id: string, scores?: Array<number>, stars?: number, locked?: boolean) {
        this.levelID = id;
        this.scores = scores || [];
        this.stars = stars || 0;
        this.locked = typeof(locked) === "boolean" ? locked : true;
    }

    /**
     * Returns the sorted scores. Use custom sort because
     * JS's sort is alphabetically (11 < 2)
     */
    public getSortedScores(): Array<number> {
        return this.scores.sort((a, b) => a - b).reverse();
    }

    /**
     * Adds a new score to the scores and removes the worst if there are more
     * scores than allowed.
     * Only new scores are saved, it won't be saved if it's the same score!
     * 
     * @param newScore 
     */
    public addScore(newScore: number): void {
        if (this.scores.indexOf(newScore) < 0) {
            this.scores.push(newScore);
        }

        if (this.scores.length > Config.GAME.STORAGE.NROFSCORESSAVED) {
            let nrOfScoresToRemove = this.scores.length - Config.GAME.STORAGE.NROFSCORESSAVED;
            this.scores = this.getSortedScores().splice( -nrOfScoresToRemove, nrOfScoresToRemove);
        }
    }

    /**
     * Create a SavedLevelData object from JSON
     * 
     * @param setup JSON serialisation of a SavedLevelData object
     */
    static make(setup: any): SavedLevelData {
        if (setup.levelID) {
            return new SavedLevelData(
                setup.levelID,
                setup.scores,
                setup.stars,
                setup.locked
            );
        }
    }

    static makeNew(levelID: string): SavedLevelData {
        return new SavedLevelData(levelID);
    }
}