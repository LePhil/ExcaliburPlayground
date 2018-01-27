declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Levels} from "./config/Levels";
import {Resources} from "./config/Resources";
import {AudioManager} from "./AudioManager";
import {Storage} from "./Storage";

import {MainMenu} from "./scenes/MainMenu";
import {OptionsScene} from "./scenes/OptionsScene";
import {CustomGameMenu} from "./scenes/CustomGameMenu";

import {LevelScene} from "./scenes/LevelScene";
import {Cutscene} from "./scenes/Cutscene";
import {DebugScene} from "./scenes/DebugScene";

import {Director} from "./Director";

AudioManager.setup();

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
globals.game = game;

game.add("loading", new ex.Scene(game));
game.add("options", new OptionsScene(game));
game.add("menu", new MainMenu(game));
game.add("custom", new CustomGameMenu(game));

let gameScene = new LevelScene(game);
game.add("game", gameScene );

let cutScene = new Cutscene(game);
game.add("cutScene", cutScene );

game.add("debug", new DebugScene(game));

let director = new Director(game, gameScene);

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
