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
import {CreditsScene} from "./scenes/CreditsScene";
import {Director} from "./Director";

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
globals.game = game;

game.add("credits", new CreditsScene(game));

game.add("menu", new MainMenu(game));

let introScene = new PreGameScene(game);
game.add("pre", introScene);

let endgameScene = new EndGameScene(game);
game.add("end", endgameScene);

let gameScene = new LevelScene(game);
game.add("game", gameScene );

let cutScene = new Cutscene(game, "intro_01");
game.add("cutScene", cutScene );

let director = new Director(introScene, gameScene, endgameScene);

globals.startMenu = () => { game.goToScene("menu"); };
globals.preScreen = () => { game.goToScene("pre"); };
globals.gameScreen= () => { game.goToScene("game"); };
globals.endScreen = () => { game.goToScene("end"); };

globals.startGame = () => {
  // TODO: save/get first level from storage
  director.loadLevelSet("Map_00");
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
    director.loadLevelSet(levelIdentifier);
  }
};

globals.credits = () => {
  game.goToScene("credits");
}

let loader = new ex.Loader();

for (let r in Resources) {
  loader.addResource(Resources[r]);
}

game.start(loader).then(function(){
  globals.startMenu();
});
