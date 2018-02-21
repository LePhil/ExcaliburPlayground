import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Levels} from "./config/Levels";

/**
 * Responsibility:
 * Load and save data about the game (i.e. levels) in a sane 
 * and unified way to localstorage (or server if applicable at
 * some point).
 */
export class Storage {
    /**
     * Make sure all levels are in the storage and at least the first
     * level is unlocked.
     */
    static init(): void {
        let allLevelIDs = Object.keys(Levels.LEVEL);
        allLevelIDs.forEach((id, index) => {
            let level = Levels.LEVEL[id];

            Storage.makeSureLevelDataExists(level.ID);
        });

        let firstLevelID = allLevelIDs[0];
        Storage.unlock(firstLevelID);
    }

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

    static save(data: SavedLevelData): void {
        Storage.set(data.levelID, data);
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

    static unlock(levelID: string): void {
        let storedData = Storage.getLevelData(levelID);
        storedData.locked = false;
        Storage.set(levelID, storedData);
    }

    /**
     * Unlocks the level following the specified one's.
     * 
     * @param levelID ID of the level whose next neighbor should be unlocked
     */
    static unlockNextOf(levelID: string): void {
        let nextLevelID = "";

        let allLevelIDs = Object.keys(Levels.LEVEL);
        allLevelIDs.forEach((id, index) => {
            let level = Levels.LEVEL[id];

            if (level.ID === levelID) {
                if (index+1 < allLevelIDs.length) {
                    nextLevelID = allLevelIDs[index+1];
                    return;
                } else {
                    // Might be the last leve!
                    console.warn("Last level reached?!");
                }
            }
        });

        if (nextLevelID) {
            Storage.unlock(nextLevelID);
        }
    }

    /**
     * Mainly used for debugging - clears all saved data.
     */
    static clearAll(): void {
        localStorage.clear();
    }
}

export class GameData {
    public lastPlayedLevelID: string;
}

/**
 * Describes what is data about a level that has to be saved
 * in order to progress in the game.
 */
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