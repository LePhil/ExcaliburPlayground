declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Levels} from "./config/Levels";
import {Resources} from "./config/Resources";
import {AudioManager} from "./AudioManager";
import {Storage} from "./Storage";

import {MainMenu} from "./scenes/MainMenu";
import {OptionsScene} from "./scenes/OptionsScene";
import {CreditsScene} from "./scenes/CreditsScene";
import {CustomGameMenu} from "./scenes/CustomGameMenu";

import {LevelScene} from "./scenes/LevelScene";
import {PreGameScene} from "./scenes/PreGameScene";
import {EndGameScene} from "./scenes/EndGameScene";
import {Cutscene} from "./scenes/Cutscene";
import {DebugScene} from "./scenes/DebugScene";

import {Director} from "./Director";

AudioManager.setup();

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
globals.game = game;

game.add("options", new OptionsScene(game));
game.add("credits", new CreditsScene(game));
game.add("menu", new MainMenu(game));
game.add("custom", new CustomGameMenu(game));
game.add("debug", new DebugScene(game));

let introScene = new PreGameScene(game);
game.add("pre", introScene);

let endgameScene = new EndGameScene(game);
game.add("end", endgameScene);

let gameScene = new LevelScene(game);
game.add("game", gameScene );

let cutScene = new Cutscene(game);
game.add("cutScene", cutScene );

let director = new Director(game, introScene, gameScene, endgameScene);

globals.customGame = (settings: any) => {
  director.loadCustomLevel(settings);
}

globals.startGame = () => {
    globals.loadNextLevel(Levels.getCurrentLevelName());
};

globals.loadNextLevel = (levelIdentifier) => {
    if(Levels.isCutscene(levelIdentifier)) {
        cutScene.loadLevelData(levelIdentifier);  
        game.goToScene("cutScene");
    } else {
        director.loadLevelSet(levelIdentifier);
    }
};

let loader = new ex.Loader();

for (let r in Resources) {
    loader.addResource(Resources[r]);
}

game.start(loader).then(function(){
    game.goToScene("menu");
});
