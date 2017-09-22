declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./Config";
import {Resources} from "./Resources";

import {Storage} from "./Storage";
import {MainMenu} from "./MainMenu";
import {LevelScene} from "./LevelScene";
import {EndGameScene} from "./EndGameScene";
import {Cutscene} from "./Cutscene";
import {Director} from "./Director";

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
let director = new Director();
globals.game = game;
globals.conf = Config;
globals.resources = Resources;
globals.storage = new Storage();

game.add("menu", new MainMenu(game));
game.add("end", new EndGameScene(game, director));

game.add("game", new LevelScene(game, director));
game.add("cutScene", new Cutscene(game));

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

globals.startCutscene = () => {
  game.goToScene("cutScene");
};

let loader = new ex.Loader();

for (let r in globals.resources) {
  loader.addResource(globals.resources[r]);
}


game.start(loader).then(function(){
  globals.startMenu();
});
