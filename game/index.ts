/// <reference path="../bower_components/excalibur-tiled/dist/excalibur-tiled" />
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

// Create a new TiledResource loadable
var map = new Extensions.Tiled.TiledResource("game/assets/test.json");

var loader = new ex.Loader([map]);

for (let r in globals.resources) {
  loader.addResource(globals.resources[r]);
}


game.start(loader).then(function(){
  // Process the data in the map as you like
  map.data.tilesets.forEach(function(ts) {
    console.log(ts.image, ts.imageTexture.isLoaded());
  });

  // get a Excalibur `TileMap` instance
  var tm = map.getTileMap();

  // draw the tile map
  gameScene.add(tm);

  globals.startMenu();
});
