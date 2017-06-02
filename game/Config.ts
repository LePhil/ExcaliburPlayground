import * as ex from "excalibur";

export class Config {
    static PLAYER_VELOCITY = 200;
    static PLAYER_STARTX   = 500;
    static PLAYER_STARTY   = 200;
    static PLAYER_WIDTH    = 50;
    static PLAYER_HEIGHT   = 50;

    static CUSTOMER_WIDTH  = 20;
    static CUSTOMER_HEIGHT = 20;
    static CUSTOMER_NAMES  = [
      "Thomas",
      "Gimli",
      "James",
      "Mr. Man"
    ];

    static DOGFOOD_COLOR = ex.Color.Red;
    static CATFOOD_COLOR = ex.Color.Green;
    static DOGFOOD_NAME  = "Dog Food";
    static CATFOOD_NAME  = "Cat Food";

}
