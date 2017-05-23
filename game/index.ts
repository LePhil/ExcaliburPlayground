/// <reference path="../bower_components/excalibur-tiled/dist/excalibur-tiled" />
import * as ex from "excalibur";
import {Config} from "./Config";
import {Player} from "./Player";
import {FoodStation} from "./FoodStation";
import {Food} from "./Item";

import {Brick} from "./Brick";
import {Paddle} from "./Paddle";
import {Ball} from "./Ball";
import {Greeter} from "./greeter";

let x = new Greeter("Welcome to Excalibur");
console.log(x.greet());

let game = new ex.Engine({ displayMode: ex.DisplayMode.FullScreen });

// Create a new TiledResource loadable
var map = new Extensions.Tiled.TiledResource("game/assets/desert.json");

// Create a loader and reference the map
var loader = new ex.Loader([map]);


// create an asset loader
// let loader = new ex.Loader();
let resources = {
  /* include resources here */
  // txPlayer: new ex.Texture("assets/tex/player.png")
};

// queue resources for loading
for (let r in resources) {
  loader.addResource(resources[r]);
}

let hello = new ex.Label("Hello Electron", game.getDrawWidth() / 2, 100, "Segoe UI Light");
hello.color = ex.Color.White;
hello.fontSize = 50;
hello.textAlign = ex.TextAlign.Center;
game.add(hello);

let player = new Player(Config.PLAYER_STARTX,
                        Config.PLAYER_STARTY,
                        Config.PLAYER_WIDTH,
                        Config.PLAYER_HEIGHT,
                        ex.Color.Yellow);
game.input.pointers.primary.on("down", function (evt: PointerEvent) { player.goTo(evt); });
game.add(player);

let catFood = new FoodStation("CatFoodStation", 100, 100, 20, 20, ex.Color.Red, new Food("CatFood") );
catFood.on("pointerdown", function(env) { catFood.handleClick(player); });
game.add(catFood);

let dogFood = new FoodStation("DogFoodStation", 800, 300, 20, 20, ex.Color.Green, new Food("DogFood") );
dogFood.on("pointerdown", function(env) { dogFood.handleClick(player); });
game.add(dogFood);

// let paddle = new Paddle(150, game.getDrawHeight() - 40, 200, 20, ex.Color.Chartreuse);
// game.add(paddle);
//
// // Add a mouse move listener
// game.input.pointers.primary.on("move", function (evt: PointerEvent) {
//   paddle.pos.x = evt.x;
// });
//
// // Create a ball
// let ball = new Ball(100, 300, 20, 20, ex.Color.Red);
// ball.vel.setTo(200, 200); // Set the velocity in pixels per second
// ball.on("exitviewport", function() {
//   alert("You lose!");
// });
//
// game.add(ball);
//
// // Build Bricks
//
// // Padding between bricks
// let padding = 20; // px
// let xoffset = 65; // x-offset
// let yoffset = 20; // y-offset
// let columns = 5;
// let rows = 3;
//
// // Individual brick width with padding factored in
// let brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow];
// let brickWidth = game.getDrawWidth() / columns - padding - padding / columns; // px
// let brickHeight = 30; // px
// let bricks = [];
//
// for (let j = 0; j < rows; j++) {
//   for (let i = 0; i < columns; i++) {
//     let xPos = xoffset + i * (brickWidth + padding) + padding;
//     let yPos = yoffset + j * (brickHeight + padding) + padding;
//     let brick = new Brick(xPos, yPos, brickWidth, brickHeight, brickColor[j % brickColor.length]);
//
//     bricks.push(brick);
//     game.add(brick);
//   }
// }

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
