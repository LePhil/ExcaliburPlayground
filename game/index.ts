declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Levels} from "./config/Levels";
import {Resources} from "./config/Resources";

import {Storage} from "./Storage";
import {MainMenu} from "./scenes/MainMenu";
import {LevelScene} from "./scenes/LevelScene";
import {PreGameScene} from "./scenes/PreGameScene";
import {EndGameScene} from "./scenes/EndGameScene";
import {Cutscene} from "./scenes/Cutscene";
import {Director} from "./Director";

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
let director = new Director();
globals.game = game;

game.add("menu", new MainMenu(game));
game.add("pre", new PreGameScene(game, director));
game.add("end", new EndGameScene(game, director));

game.add("game", new LevelScene(game, director));

let cutScene = new Cutscene(game, "intro_01");
game.add("cutScene", cutScene );

globals.startMenu = () => {
  game.goToScene("menu");
};

globals.preScreen = () => {
  game.goToScene("pre");
};

globals.endScreen = () => {
  game.goToScene("end");
};

// TODO: levels
globals.startGame = () => {
  game.goToScene("game");
};

globals.startCutscene = () => {
  game.goToScene("cutScene");
};

globals.loadNextLevel = (levelIdentifier) => {
  if(Levels.isCutscene(levelIdentifier)) {
    cutScene.loadLevelData(levelIdentifier);  
    globals.startCutscene();
  } else {
    // TODO - level/scene handling for non-cutscenes
  }
};

let loader = new ex.Loader();

for (let r in Resources) {
  loader.addResource(Resources[r]);
}

game.start(loader).then(function(){
  globals.startMenu();
});
