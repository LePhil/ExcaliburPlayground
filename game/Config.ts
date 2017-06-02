declare var globals: any;
import * as ex from "excalibur";

export class Config {
    static PLAYER_SPEED    = 200;
    static PLAYER_STARTX   = 500;
    static PLAYER_STARTY   = 200;
    static PLAYER_WIDTH    = 50;
    static PLAYER_HEIGHT   = 50;

    static STATION_DURATION = 1000;

    static CUSTOMER_WIDTH  = 20;
    static CUSTOMER_HEIGHT = 20;
    static CUSTOMER_SPEED  = 200;
    static CUSTOMER_NAMES  = [
      "Thomas",
      "Gimli",
      "James",
      "Mr. Man",
      "Albert",
      "Stephanie",
      "Frieda",
      "Polly"
    ];

    static DOGFOOD_COLOR = ex.Color.Red;
    static CATFOOD_COLOR = ex.Color.Green;
    static DOGFOOD_NAME  = "Dog Food";
    static CATFOOD_NAME  = "Cat Food";

    // defined by electron wrapper
    static GAME_WIDTH = 1024;
    static GAME_HEIGHT = 768;

    static DOOR_POS_X = Config.GAME_WIDTH / 2;
    static DOOR_POS_Y = Config.GAME_HEIGHT;

}
