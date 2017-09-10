declare var globals: any;
import * as ex from "excalibur";

export class Config {


  static PLAYER_SPEED    = 200;
  static PLAYER_STARTX   = 500;
  static PLAYER_STARTY   = 200;
  static PLAYER_WIDTH    = 50;
  static PLAYER_HEIGHT   = 50;

  static SPRITE_SCALE    = .5;
  static SPRITE_ANIM_SPEED = 100;

  static STATION_DURATION = 1000;

  static CUSTOMER_WIDTH  = 128/2;
  static CUSTOMER_HEIGHT = 256/2;
  static CUSTOMER_SPEED  = 200;
  static PLAYER_TYPES  = [
    {color: "green",  coords: {walkR: [11,18], walkUp: [19,26], idle:  5, pick: 12} },
    {color: "yellow", coords: {walkR: [29,36], walkUp: [30,37], idle: 16, pick: 30} },
    {color: "grey",   coords: {walkR: [ 0, 7], walkUp: [ 8,15], idle: 28, pick:  1} },
    {color: "red",    coords: {walkR: [44,51], walkUp: [ 4,52], idle: 38, pick: 45} },
    {color: "blue",   coords: {walkR: [33,40], walkUp: [24,41], idle: 27, pick: 34} }
  ];
  static PLAYER_TYPE_INITIAL_COLOR = "green";
  static CUSTOMER = {
    THINKBUBBLE: {
      WIDTH: 30,
      HEIGHT: 30,
      OFFSET_X: 20,
      OFFSET_Y: 20,
      SPRITE: {
        WIDTH: 284,
        HEIGHT: 285
      }
    },
    INITIAL_PATIENCE: 100,
    PATIENCE_DELTA: 5,
    PATIENCE_DECREASE_INTERVAL: 1000,
    QUEUE_LENGTH: 5
  };
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

  // TODO: create complete food object(s)
  static ELEPHANTFOOD_NAME  = "Elephant Food";
  static ELEPHANTFOOD_COLOR = ex.Color.Yellow;
  static ELEPHANTFOOD_WIDTH = 424;
  static ELEPHANTFOOD_HEIGHT = 342;
  static ELEPHANTFOOD_SCALE_STATION = .2;

  static RABBITFOOD_NAME  = "Rabbit Food";
  static RABBITFOOD_COLOR = ex.Color.Orange;
  static RABBITFOOD_WIDTH = 284;
  static RABBITFOOD_HEIGHT = 414;
  static RABBITFOOD_SCALE_STATION = .2;

  static INVENTORY = {
    POS_X: 32,
    POS_Y: 32,
    COLOR: ex.Color.White,
    SPACING: 2,
    ITEMS: {
      HEIGHT: 64,
      WIDTH: 64,
      SPRITE_WIDTH: 284,
      SPRITE_HEIGHT: 284,
      MAX: 6
    }
  };

  static DOGFOOD_COLOR = ex.Color.Red;
  static CATFOOD_COLOR = ex.Color.Green;
  static DOGFOOD_NAME  = "Dog Food";
  static CATFOOD_NAME  = "Cat Food";

  static GAME = {
    WIDTH: 1024,  // defined by electron wrapper
    HEIGHT: 768,  // defined by electron wrapper
    DEBUG: false,
    SPAWN_TIME_S: 3,
    LEVEL_TIME_S: 20,
    UI: {
      BUTTON_WIDTH: 190,
      BUTTON_HEIGHT: 49
    }
  };

  static DOOR_POS_X = Config.GAME.WIDTH / 2;
  static DOOR_POS_Y = Config.GAME.HEIGHT;

  static TIMER = {
    WIDTH: 200,
    HEIGHT: 40
  };

  static BLOB = {
    WIDTH: 57,
    HEIGHT: 34,
    SPEED: 200,
    ANIM_SPEED: 100,
    LIFETIME: 7
  };

  static HUD = {
    hud_0:                  {x: 230, y: 0, w: 30, h: 38},
    hud_1:                  {x: 196, y: 41, w: 26, h: 37},
    hud_2:                  {x: 55, y: 98, w: 32, h: 38},
    hud_3:                  {x: 239, y: 80, w: 28, h: 38},
    hud_4:                  {x: 238, y: 122, w: 29, h: 38},
    hud_5:                  {x: 238, y: 162, w: 28, h: 38},
    hud_6:                  {x: 230, y: 40, w: 30, h: 38},
    hud_7:                  {x: 226, y: 206, w: 32, h: 39},
    hud_8:                  {x: 192, y: 206, w: 32, h: 40},
    hud_9:                  {x: 196, y: 0, w: 32, h: 39},
    hud_coins:              {x: 55, y: 0, w: 47, h: 47},
    hud_gem_blue:           {x: 104, y: 0, w: 46, h: 36},
    hud_gem_green:          {x: 98, y: 185, w: 46, h: 36},
    hud_gem_red:            {x: 98, y: 147, w: 46, h: 36},
    hud_gem_yellow:         {x: 98, y: 223, w: 46, h: 36},
    hud_heartEmpty:         {x: 0, y: 47, w: 53, h: 45},
    hud_heartFull:          {x: 0, y: 94, w: 53, h: 45},
    hud_heartHalf:          {x: 0, y: 0, w: 53, h: 45},
    hud_keyBlue:            {x: 146, y: 147, w: 44, h: 40},
    hud_keyBlue_disabled:   {x: 150, y: 38, w: 44, h: 40},
    hud_keyGreem_disabled:  {x: 104, y: 38, w: 44, h: 40},
    hud_keyGreen:           {x: 192, y: 122, w: 44, h: 40},
    hud_keyRed:             {x: 193, y: 80, w: 44, h: 40},
    hud_keyRed_disabled:    {x: 192, y: 164, w: 44, h: 40},
    hud_keyYellow:          {x: 146, y: 189, w: 44, h: 40},
    hud_keyYellow_disabled: {x: 147, y: 80, w: 44, h: 40},
    hud_p1:                 {x: 55, y: 49, w: 47, h: 47},
    hud_p1Alt:              {x: 0, y: 141, w: 47, h: 47},
    hud_p2:                 {x: 49, y: 141, w: 47, h: 47},
    hud_p2Alt:              {x: 0, y: 190, w: 47, h: 47},
    hud_p3:                 {x: 49, y: 190, w: 47, h: 47},
    hud_p3Alt:              {x: 98, y: 98, w: 47, h: 47},
    hud_x:                  {x: 0, y: 239, w: 30, h: 28}
  };
  static DIGIT_WIDTH = 50;
  static SCORE = {
    NROFDIGITS: 3,
    VALUE_OF_SERVING: 20
  };

  static MAPS = {
    LEVELS: [
      "Map_00" 
    ],
    X: 0,
    Y: 0,
    W: 840,
    H: 560
  };
}
