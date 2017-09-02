/// <reference path="../bower_components/excalibur-tiled/dist/excalibur-tiled" />
declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./Config";
import {Resources} from "./Resources";
import {Player} from "./Player";
// TODO: inheritance yo
import {RabbitFoodStation} from "./RabbitFoodStation";
import {ElephantFoodStation} from "./ElephantFoodStation";
import {FoodStation} from "./FoodStation";
import {Food} from "./Item";
import {Inventory} from "./Inventory";
import {Customer} from "./Customer";
import {CustomerSpawner} from "./CustomerSpawner";

import {MainMenu} from "./MainMenu";


let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });
globals.game = game;
globals.conf = Config;
globals.resources = Resources;

// Create a new TiledResource loadable
var map = new Extensions.Tiled.TiledResource("game/assets/test.json");

// Create a loader and reference the map
var loader = new ex.Loader([map]);

// create an asset loader
let resources = {
  /* include resources here */
  // txPlayer: new ex.Texture("assets/tex/player.png")
};

// queue resources for loading
for (let r in resources) {
  loader.addResource(resources[r]);
}
for (let r in globals.resources) {
  loader.addResource(globals.resources[r]);
}

let elephantFoodStation = new ElephantFoodStation(300, 300, new Food(globals.conf.ELEPHANTFOOD_NAME, globals.conf.ELEPHANTFOOD_COLOR));
game.add(elephantFoodStation);

let rabbitFoodStation = new RabbitFoodStation(600, 300, new Food(globals.conf.RABBITFOOD_NAME, globals.conf.RABBITFOOD_COLOR));
game.add(rabbitFoodStation);

let inv = new Inventory();
game.add(inv);

let player = new Player(inv);
globals.player = player;
game.add(player);

game.input.pointers.primary.on("down", (evt: PointerEvent) => {
  player.goTo(evt);
});

let mainMenu = new MainMenu();
game.add(mainMenu);

let spawner = new CustomerSpawner(500, 520, 200, 20, ex.Color.White);
game.add(spawner);

game.start(loader).then(function(){
  // Process the data in the map as you like
  map.data.tilesets.forEach(function(ts) {
    console.log(ts.image, ts.imageTexture.isLoaded());
  });

  // get a Excalibur `TileMap` instance
  var tm = map.getTileMap();

  // draw the tile map
  game.add(tm);
});
