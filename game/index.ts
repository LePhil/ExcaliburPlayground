declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./Config";
import {Resources} from "./Resources";

import {Storage} from "./Storage";
import {MainMenu} from "./MainMenu";
import {LevelScene} from "./LevelScene";
import {EndGameScreen} from "./EndGameScreen";
import {Timer} from "./Timer";
import {ScoreCounter} from "./ScoreCounter";

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
globals.game = game;
globals.conf = Config;
globals.resources = Resources;
globals.storage = new Storage();

game.add("menu", new MainMenu(game));

let endScene = new ex.Scene();
let endScreen = new EndGameScreen();
endScene.add(endScreen);
game.add("end", endScene);

let gameScene = new LevelScene(game);

game.add("game", gameScene);

globals.startMenu = () => {
  game.goToScene("menu");
};

globals.endScreen = () => {
  game.goToScene("end");
};

// TODO: levels
globals.startGame = () => {
  game.goToScene("game");
};

let loader = new ex.Loader();

for (let r in globals.resources) {
  loader.addResource(globals.resources[r]);
}


game.start(loader).then(function(){
  globals.startMenu();
});
