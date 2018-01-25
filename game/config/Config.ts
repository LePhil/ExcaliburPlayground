import * as ex from "excalibur";
import { Graphics } from "./Graphics";

export class Config {
  static PLAYER = {
    START: {X: 500, Y: 200},
    WIDTH: 66,
    HEIGHT: 92,
    SPEED: 200,
    TYPES: [
      {color: "green",  coords: {walkR: [11,18], walkUp: [19,26], idle:  5, pick: 12} },
      {color: "yellow", coords: {walkR: [29,36], walkUp: [30,37], idle: 16, pick: 30} },
      {color: "grey",   coords: {walkR: [ 0, 7], walkUp: [ 8,15], idle: 28, pick:  1} },
      {color: "red",    coords: {walkR: [44,51], walkUp: [ 4,52], idle: 38, pick: 45} },
      {color: "blue",   coords: {walkR: [33,40], walkUp: [24,41], idle: 27, pick: 34} }
    ],
    SPRITE_SCALE: .5,
    SPRITE_ANIM_SPEED: 100
  };

  static CUSTOMER = {
    SPEED: 200,
    COLORS: ["BEIGE", "BLUE", "GREEN", "PINK", "YELLOW"],
    THINKBUBBLE: {
      WIDTH: 30,
      HEIGHT: 30,
      OFFSET_X: 25,
      OFFSET_Y: -50
    },
    INITIAL_PATIENCE: 100,
    PATIENCE_DELTA: 5,
    PATIENCE_DECREASE_INTERVAL: 1000,
    PATIENCE_RESUME_TIMER: 3000,
    QUEUE_LENGTH: 5
  };

  static STATIONS = {
    CONF: {
      SCALE: 0.2
    },
    /* Outlined Animals */
    rabbit:   {x: 394, y: 344,  w: 284, h: 414, duration:  500},
    elephant: {x: 0,   y: 0,    w: 424, h: 342, duration:  500},
    giraffe:  {x: 0,   y: 963,  w: 382, h: 370, duration: 1000},
    hippo:    {x: 0,   y: 1642, w: 333, h: 344, duration: 1000},
    monkey:   {x: 0,   y: 344,  w: 392, h: 284, duration: 1000},
    panda:    {x: 0,   y: 630,  w: 392, h: 331, duration: 1000},
    parrot:   {x: 361, y: 1335, w: 284, h: 284, duration: 1000},
    penguin:  {x: 335, y: 1642, w: 284, h: 284, duration: 2000},
    pig:      {x: 0,   y: 1335, w: 359, h: 305, duration: 2000},
    snake:    {x: 384, y: 963,  w: 284, h: 334, duration: 2000}
  };

  static ITEM_TYPES = {
    CONSUMABLE: "consumable",
    PICKUPPABLE: "pickuppable",
    CUSTOMERRELATED: "customerrelated"
  };

  static ITEMS = {
    CONF: {
      W: 50,
      H: 50
    },
    CUP:      "cup",
    HAMMER:   "hammer",
    REDPILL:  "pill_red",
    BLUEPILL: "pill_blue",
    BONE:     "bone",
    MEDKIT:   "medkit",
    COFFEE:   "coffee",
    FIREWORKS:"fireworks",
    TELESCOPE:"telescope",
    CASH:     "wad_of_cash",
    COBWEB_1: "cobweb_1",
    COBWEB_2: "cobweb_2",
    /* TODO: tile definition should be moved to config/tiles */
    cobweb_1:               { x: 791, y: 229, w: 85, h: 101 },
    cobweb_2:               { x: 888, y: 242, w: 93, h: 95 },
    fireworks:              { x: 770, y: 0, w: 60, h: 149, t: Config.ITEM_TYPES.CUSTOMERRELATED },
    telescope:              { x: 839, y: 0, w: 146, h: 210, scale: .4 },
    genericItem_color_001: { x: 0, y: 322, w: 162, h: 94 },
    genericItem_color_002: { x: 136, y: 1231, w: 120, h: 110 },
    cup:                    { x: 130, y: 1791, w: 89, h: 45, t: Config.ITEM_TYPES.CONSUMABLE },
    wrench_single:          { x: 623, y: 1826, w: 70, h: 88, t: Config.ITEM_TYPES.PICKUPPABLE },
    screwdriver:            { x: 626, y: 135, w: 66, h: 105 },
    genericItem_color_006: { x: 366, y: 1095, w: 96, h: 84 },
    wrench_double:          { x: 628, y: 0, w: 60, h: 95, t: Config.ITEM_TYPES.PICKUPPABLE },
    genericItem_color_008: { x: 623, y: 1914, w: 68, h: 102 },
    genericItem_color_009: { x: 551, y: 1305, w: 76, h: 104 },
    hammer:                 { x: 553, y: 1826, w: 70, h: 104, t: Config.ITEM_TYPES.PICKUPPABLE },
    genericItem_color_011: { x: 551, y: 1495, w: 75, h: 113 },
    genericItem_color_012: { x: 261, y: 993, w: 106, h: 102 },
    genericItem_color_013: { x: 556, y: 174, w: 70, h: 119 },
    genericItem_color_014: { x: 380, y: 88, w: 94, h: 144 },
    genericItem_color_015: { x: 552, y: 366, w: 74, h: 131 },
    genericItem_color_016: { x: 276, y: 90, w: 104, h: 188 },
    saw:                    { x: 365, y: 1459, w: 98, h: 152 },
    screw:                  { x: 691, y: 1001, w: 48, h: 62 },
    nail:                   { x: 688, y: 393, w: 52, h: 68 },
    axe:                    { x: 376, y: 278, w: 94, h: 128 },
    pickaxe:                { x: 134, y: 1360, w: 123, h: 154 },
    shovel:                 { x: 464, y: 534, w: 87, h: 162 },
    genericItem_color_023: { x: 269, y: 456, w: 104, h: 176 },
    pencil:                 { x: 693, y: 461, w: 42, h: 74 },
    genericItem_color_025: { x: 691, y: 836, w: 50, h: 74 },
    genericItem_color_026: { x: 692, y: 135, w: 42, h: 74 },
    genericItem_color_027: { x: 691, y: 910, w: 49, h: 91 },
    genericItem_color_028: { x: 690, y: 1469, w: 50, h: 89 },
    genericItem_color_029: { x: 632, y: 812, w: 59, h: 130 },
    genericItem_color_030: { x: 367, y: 784, w: 57, h: 56 },
    genericItem_color_031: { x: 146, y: 776, w: 116, h: 96 },
    book:                   { x: 152, y: 649, w: 116, h: 112 },
    magazine_red_open:      { x: 0, y: 1879, w: 128, h: 114 },
    genericItem_color_034: { x: 461, y: 1314, w: 90, h: 128 },
    book_red:               { x: 256, y: 1514, w: 109, h: 125 },
    folder:                 { x: 373, y: 436, w: 94, h: 98 },
    genericItem_color_037: { x: 463, y: 1442, w: 88, h: 124 },
    genericItem_color_038: { x: 363, y: 840, w: 98, h: 124 },
    genericItem_color_039: { x: 382, y: 0, w: 90, h: 78 },
    genericItem_color_040: { x: 0, y: 1993, w: 111, h: 47 },
    genericItem_color_041: { x: 367, y: 1738, w: 72, h: 65 },
    genericItem_color_042: { x: 551, y: 613, w: 72, h: 65 },
    genericItem_color_043: { x: 256, y: 1639, w: 54, h: 37 },
    genericItem_color_044: { x: 462, y: 1057, w: 88, h: 75 },
    genericItem_color_045: { x: 365, y: 1611, w: 96, h: 70 },
    genericItem_color_046: { x: 0, y: 532, w: 152, h: 88 },
    genericItem_color_047: { x: 134, y: 1514, w: 112, h: 80 },
    genericItem_color_048: { x: 460, y: 1738, w: 93, h: 117 },
    laptop_back:            { x: 0, y: 0, w: 174, h: 99 },
    laptop:                 { x: 0, y: 1027, w: 143, h: 136 },
    monitor_old:            { x: 0, y: 1231, w: 136, h: 129 },
    monitor:                { x: 162, y: 322, w: 114, h: 134 },
    monitor_widescreen:     { x: 0, y: 191, w: 163, h: 131 },
    genericItem_color_054: { x: 363, y: 1331, w: 98, h: 128 },
    genericItem_color_055: { x: 364, y: 1804, w: 96, h: 135 },
    genericItem_color_056: { x: 0, y: 1839, w: 129, h: 40 },
    genericItem_color_057: { x: 0, y: 736, w: 152, h: 40 },
    genericItem_color_058: { x: 310, y: 1639, w: 46, h: 38 },
    genericItem_color_059: { x: 261, y: 1186, w: 51, h: 38 },
    genericItem_color_060: { x: 0, y: 1163, w: 141, h: 68 },
    genericItem_color_061: { x: 132, y: 1686, w: 52, h: 13 },
    genericItem_color_062: { x: 626, y: 1501, w: 64, h: 88 },
    genericItem_color_063: { x: 692, y: 590, w: 44, h: 96 },
    genericItem_color_064: { x: 688, y: 1068, w: 58, h: 110 },
    genericItem_color_065: { x: 688, y: 240, w: 58, h: 88 },
    genericItem_color_066: { x: 627, y: 1075, w: 60, h: 94 },
    mobile_phone:           { x: 625, y: 1740, w: 66, h: 82, t: Config.ITEM_TYPES.PICKUPPABLE },
    genericItem_color_068: { x: 550, y: 696, w: 82, h: 96 },
    genericItem_color_069: { x: 474, y: 0, w: 84, h: 98 },
    genericItem_color_070: { x: 424, y: 784, w: 24, h: 44 },
    genericItem_color_071: { x: 626, y: 358, w: 62, h: 89 },
    genericItem_color_072: { x: 553, y: 1930, w: 70, h: 92 },
    genericItem_color_073: { x: 688, y: 1178, w: 58, h: 79 },
    genericItem_color_074: { x: 261, y: 1095, w: 105, h: 91 },
    genericItem_color_075: { x: 0, y: 1360, w: 134, h: 122 },
    genericItem_color_076: { x: 155, y: 456, w: 112, h: 76 },
    genericItem_color_077: { x: 132, y: 1600, w: 124, h: 86 },
    genericItem_color_078: { x: 0, y: 99, w: 163, h: 92 },
    genericItem_color_079: { x: 626, y: 1409, w: 64, h: 92 },
    genericItem_color_080: { x: 627, y: 1279, w: 62, h: 99 },
    genericItem_color_081: { x: 367, y: 1681, w: 94, h: 57 },
    genericItem_color_082: { x: 257, y: 1449, w: 98, h: 63 },
    genericItem_color_083: { x: 632, y: 696, w: 59, h: 116 },
    genericItem_color_084: { x: 257, y: 1331, w: 106, h: 118 },
    genericItem_color_085: { x: 550, y: 874, w: 82, h: 82 },
    genericItem_color_086: { x: 367, y: 1037, w: 38, h: 41 },
    genericItem_color_087: { x: 219, y: 1791, w: 31, h: 41 },
    genericItem_color_088: { x: 550, y: 792, w: 82, h: 82 },
    pill_red:               { x: 312, y: 1186, w: 40, h: 40, t: Config.ITEM_TYPES.CONSUMABLE },
    pill_blue:              { x: 628, y: 95, w: 40, h: 40, t: Config.ITEM_TYPES.CONSUMABLE },
    genericItem_color_091: { x: 688, y: 328, w: 57, h: 65 },
    genericItem_color_092: { x: 688, y: 84, w: 51, h: 51 },
    genericItem_color_093: { x: 690, y: 1365, w: 50, h: 104 },
    genericItem_color_094: { x: 625, y: 590, w: 67, h: 106 },
    genericItem_color_095: { x: 551, y: 506, w: 74, h: 107 },
    ball_grey:              { x: 416, y: 232, w: 36, h: 36 },
    ball_pink:              { x: 626, y: 461, w: 38, h: 36 },
    genericItem_color_098: { x: 551, y: 1409, w: 75, h: 86 },
    genericItem_color_099: { x: 256, y: 1226, w: 108, h: 105 },
    genericItem_color_100: { x: 461, y: 1611, w: 91, h: 93 },
    bone:                   { x: 550, y: 956, w: 81, h: 119 },
    medkit:                 { x: 152, y: 532, w: 117, h: 117, t: Config.ITEM_TYPES.CONSUMABLE },
    genericItem_color_103: { x: 689, y: 1257, w: 53, h: 108 },
    genericItem_color_104: { x: 735, y: 461, w: 35, h: 110 },
    serum_blue:             { x: 625, y: 497, w: 68, h: 93 },
    genericItem_color_106: { x: 693, y: 1805, w: 33, h: 90 },
    genericItem_color_107: { x: 553, y: 1740, w: 72, h: 86 },
    genericItem_color_108: { x: 631, y: 956, w: 60, h: 112 },
    genericItem_color_109: { x: 143, y: 1027, w: 118, h: 89 },
    stethoscope:            { x: 364, y: 1186, w: 98, h: 128, t: Config.ITEM_TYPES.PICKUPPABLE },
    genericItem_color_111: { x: 254, y: 1804, w: 110, h: 138 },
    genericItem_color_112: { x: 464, y: 696, w: 86, h: 86 },
    crutches:               { x: 129, y: 1839, w: 125, h: 194 },
    pot:                    { x: 0, y: 776, w: 146, h: 104 },
    genericItem_color_115: { x: 470, y: 232, w: 86, h: 134 },
    genericItem_color_116: { x: 369, y: 632, w: 95, h: 152 },
    genericItem_color_117: { x: 111, y: 2033, w: 90, h: 14 },
    glass_water:            { x: 688, y: 0, w: 55, h: 84 },
    glass_beer:             { x: 626, y: 1175, w: 62, h: 104 },
    glass_wine:             { x: 688, y: 1589, w: 56, h: 121 },
    genericItem_color_121: { x: 556, y: 293, w: 69, h: 72 },
    salt_shaker:            { x: 691, y: 1914, w: 46, h: 95 },
    pepper_shaker:          { x: 691, y: 1710, w: 47, h: 95 },
    coffee:                 { x: 145, y: 880, w: 117, h: 113, t: Config.ITEM_TYPES.CONSUMABLE },
    genericItem_color_125: { x: 0, y: 620, w: 152, h: 116 },
    genericItem_color_126: { x: 558, y: 0, w: 70, h: 135 },
    genericItem_color_127: { x: 691, y: 696, w: 50, h: 140 },
    genericItem_color_128: { x: 130, y: 1709, w: 124, h: 82 },
    genericItem_color_129: { x: 734, y: 135, w: 28, h: 105 },
    genericItem_color_130: { x: 726, y: 1805, w: 27, h: 97 },
    genericItem_color_131: { x: 736, y: 571, w: 20, h: 106 },
    oven_glove:             { x: 254, y: 1686, w: 113, h: 118 },
    clipboard:              { x: 0, y: 880, w: 145, h: 147 },
    knive:                  { x: 461, y: 1855, w: 92, h: 132 },
    genericItem_color_135: { x: 462, y: 1132, w: 88, h: 140 },
    genericItem_color_136: { x: 626, y: 1589, w: 62, h: 146 },
    blender:                { x: 461, y: 921, w: 89, h: 136 },
    toaster:                { x: 174, y: 0, w: 109, h: 90 },
    genericItem_color_139: { x: 0, y: 1600, w: 132, h: 109 },
    genericItem_color_140: { x: 276, y: 278, w: 100, h: 158 },
    briefcase:              { x: 143, y: 1116, w: 118, h: 110 },
    genericItem_color_142: { x: 163, y: 99, w: 113, h: 202 },
    genericItem_color_143: { x: 254, y: 1942, w: 109, h: 98 },
    handbag:                { x: 461, y: 784, w: 89, h: 137 },
    genericItem_color_145: { x: 0, y: 416, w: 155, h: 116 },
    genericItem_color_146: { x: 0, y: 1482, w: 134, h: 118 },
    genericItem_color_147: { x: 0, y: 1709, w: 130, h: 130 },
    passport:               { x: 262, y: 840, w: 101, h: 135 },
    id_card:                { x: 373, y: 534, w: 91, h: 89 },
    badge_red:              { x: 283, y: 0, w: 99, h: 88 },
    badge_blue:             { x: 550, y: 1175, w: 76, h: 130 },
    bell:                   { x: 467, y: 406, w: 85, h: 100 },
    genericItem_color_153: { x: 553, y: 1608, w: 73, h: 132 },
    genericItem_color_154: { x: 367, y: 964, w: 94, h: 73 },
    key:                    { x: 625, y: 293, w: 63, h: 65, t: Config.ITEM_TYPES.PICKUPPABLE },
    ticket_stub:            { x: 550, y: 1075, w: 77, h: 100 },
    wallet:                 { x: 363, y: 1942, w: 98, h: 102 },
    wad_of_cash:            { x: 268, y: 649, w: 101, h: 106 },
    genericItem_color_159: { x: 405, y: 1057, w: 36, h: 36 },
    genericItem_color_160: { x: 380, y: 232, w: 36, h: 36 },
    genericItem_color_161: { x: 145, y: 993, w: 24, h: 24 },
    compass:                { x: 262, y: 761, w: 105, h: 79 },
    genericItem_color_163: { x: 474, y: 98, w: 83, h: 76 }
  }

  static ANIMALS = {
    ELEPHANT: "elephant",
    GIRAFFE:  "giraffe",
    HIPPO:    "hippo",
    MONKEY:   "monkey",
    PANDA:    "panda",
    PARROT:   "parrot",
    PENGUIN:  "penguin",
    PIG:      "pig",
    RABBIT:   "rabbit",
    SNAKE:    "snake",
    SCALE: 0.15,
    SPRITE: {
      elephant: {x: 0,    y: 0,     w: 376, h: 310},
      giraffe:  {x: 0,    y: 599,   w: 334, h: 350},
      hippo:    {x: 0,    y: 1525,  w: 294, h: 293},
      monkey:   {x: 0,    y: 312,   w: 336, h: 285},
      panda:    {x: 0,    y: 951,   w: 332, h: 285},
      parrot:   {x: 378,  y: 0,     w: 284, h: 285},
      penguin:  {x: 296,  y: 1525,  w: 284, h: 285},
      pig:      {x: 0,    y: 1238,  w: 316, h: 285},
      rabbit:   {x: 338,  y: 312,   w: 284, h: 370},
      snake:    {x: 334,  y: 951,   w: 284, h: 321}
    }
  };

  static INVENTORY = {
    POS_X: 32,
    POS_Y: 32,
    COLOR: ex.Color.White,
    SPACING: 2,
    ITEMS: {
      HEIGHT: 64,
      WIDTH: 64,
      MAX: 6
    },
    SPRITE: {      
      elephant: {x: 0,    y: 1145,  w: 284, h: 284},
      giraffe:  {x: 286,  y: 859,   w: 284, h: 284},
      hippo:    {x: 0,    y: 0,     w: 285, h: 285},
      monkey:   {x: 0,    y: 1717,  w: 284, h: 284},
      panda:    {x: 0,    y: 1431,  w: 284, h: 284},
      parrot:   {x: 286,  y: 1145,  w: 284, h: 284},
      penguin:  {x: 286,  y: 573,   w: 284, h: 284},
      pig:      {x: 0,    y: 287,   w: 285, h: 284},
      rabbit:   {x: 0,    y: 859,   w: 284, h: 284},
      snake:    {x: 0,    y: 573,   w: 284, h: 284}
    },
    SLOT: {W: 49, H: 45}
  };

  static GAME = {
    WIDTH: 1024,  // defined by electron wrapper
    HEIGHT: 768,  // defined by electron wrapper
    DEFAULTMAP: {
      W: 840,
      H: 560
    },
    DEBUG: true,
    DEBUG_PLAYERS: false,
    UI: {
      FONTSIZE: 24,
      TEXTCOLOR: ex.Color.Black,
      GUTTER: 8,
      CHECKBOX: {W: 38, H: 36},
      RADIO: {W: 36, H: 36},
      BUTTON: {W: 190, H: 49},
      OVERLAY: {W: 600, H: 400},
      BUTTONS: {
        POSITIONS: {
          center_1: {X: 1024/2, Y: 768 / 2 - 3 * (49 + 10)},
          center_2: {X: 1024/2, Y: 768 / 2 - 2 * (49 + 10)},
          center_3: {X: 1024/2, Y: 768 / 2 - 1 * (49 + 10)},
          center_4: {X: 1024/2, Y: 768 / 2},
          center_5: {X: 1024/2, Y: 768 / 2 + 1 * (49 + 10)},
          center_6: {X: 1024/2, Y: 768 / 2 + 2 * (49 + 10)},
          center_7: {X: 1024/2, Y: 768 / 2 + 3 * (49 + 10)},
          center:   {X: 1024/2, Y: 768/2},
          bottom_r: {X: 832,    Y: 664},
          bottom_l: {X: 192,     Y: 664}
        },
        W: 190,
        H: 49
      }
    },
    STORAGE: {
      NROFSCORESSAVED: 5
    }
  };

  static BLOB = {
    WIDTH: 57,
    HEIGHT: 34,
    SPEED: 200,
    ANIM_SPEED: 100,
    LIFETIME: 7,
    WORTH: 50
  };

  static HUD = {
    hud_colon:              {x: 146, y: 229, w: 32, h: 40},
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

  static TILES = { 
    box:                    {x:0, y: 864, w: 70, h: 70},
    boxAlt:                 {x:0, y: 792, w: 70, h: 70},
    boxCoin:                {x:0, y: 720, w: 70, h: 70},
    boxCoinAlt:             {x:0, y: 576, w: 70, h: 70},
    boxCoinAlt_disabled:    {x:0, y: 504, w: 70, h: 70},
    boxCoin_disabled:       {x:0, y: 648, w: 70, h: 70},
    boxEmpty:               {x:0, y: 432, w: 70, h: 70},
    boxExplosive:           {x:0, y: 360, w: 70, h: 70},
    boxExplosiveAlt:        {x:0, y: 216, w: 70, h: 70},
    boxExplosive_disabled:  {x:0, y: 288, w: 70, h: 70},
    boxItem:                {x:0, y: 144, w: 70, h: 70},
    boxItemAlt:             {x:0, y: 0, w: 70, h: 70},
    boxItemAlt_disabled:    {x:432, y: 432, w: 70, h: 70},
    boxItem_disabled:       {x:0, y: 72, w: 70, h: 70},
    boxWarning:             {x:72, y: 648, w: 70, h: 70},
    brickWall:              {x:216, y: 0, w: 70, h: 70},
    bridge:                 {x:216, y: 72, w: 70, h: 70},
    bridgeLogs:             {x:288, y: 720, w: 70, h: 70},
    castle:                 {x:288, y: 792, w: 70, h: 70},
    castleCenter:           {x:504, y: 288, w: 70, h: 70},
    castleCenter_rounded:   {x:504, y: 720, w: 70, h: 70},
    castleCliffLeft:        {x:504, y: 792, w: 70, h: 70},
    castleCliffLeftAlt:     {x:648, y: 720, w: 70, h: 70},
    castleCliffRight:       {x:648, y: 792, w: 70, h: 70},
    castleCliffRightAlt:    {x:792, y: 288, w: 70, h: 70},
    castleHalf:             {x:792, y: 360, w: 70, h: 70},
    castleHalfLeft:         {x:432, y: 720, w: 70, h: 70},
    castleHalfMid:          {x:648, y: 648, w: 70, h: 70},
    castleHalfRight:        {x:792, y: 648, w: 70, h: 70},
    castleHillLeft:         {x:648, y: 576, w: 70, h: 70},
    castleHillLeft2:        {x:792, y: 576, w: 70, h: 70},
    castleHillRight:        {x:792, y: 504, w: 70, h: 70},
    castleHillRight2:       {x:792, y: 432, w: 70, h: 70},
    castleLedgeLeft:        {x:856, y: 868, w: 5, h: 22},
    castleLedgeRight:       {x:842, y: 868, w: 5, h: 22},
    castleLeft:             {x:792, y: 216, w: 70, h: 70},
    castleMid:              {x:792, y: 144, w: 70, h: 70},
    castleRight:            {x:792, y: 72, w: 70, h: 70},
    dirt:                   {x:792, y: 0, w: 70, h: 70},
    dirtCenter:             {x:720, y: 864, w: 70, h: 70},
    dirtCenter_rounded:     {x:720, y: 792, w: 70, h: 70},
    dirtCliffLeft:          {x:720, y: 720, w: 70, h: 70},
    dirtCliffLeftAlt:       {x:720, y: 648, w: 70, h: 70},
    dirtCliffRight:         {x:720, y: 576, w: 70, h: 70},
    dirtCliffRightAlt:      {x:720, y: 504, w: 70, h: 70},
    dirtHalf:               {x:720, y: 432, w: 70, h: 70},
    dirtHalfLeft:           {x:720, y: 360, w: 70, h: 70},
    dirtHalfMid:            {x:720, y: 288, w: 70, h: 70},
    dirtHalfRight:          {x:720, y: 216, w: 70, h: 70},
    dirtHillLeft:           {x:720, y: 144, w: 70, h: 70},
    dirtHillLeft2:          {x:720, y: 72, w: 70, h: 70},
    dirtHillRight:          {x:720, y: 0, w: 70, h: 70},
    dirtHillRight2:         {x:648, y: 864, w: 70, h: 70},
    dirtLedgeLeft:          {x:842, y: 892, w: 5, h: 18},
    dirtLedgeRight:         {x:842, y: 912, w: 5, h: 18},
    dirtLeft:               {x:504, y: 432, w: 70, h: 70},
    dirtMid:                {x:504, y: 360, w: 70, h: 70},
    dirtRight:              {x:648, y: 504, w: 70, h: 70},
    door_closedMid:         {x:648, y: 432, w: 70, h: 70},
    door_closedTop:         {x:648, y: 360, w: 70, h: 70},
    door_openMid:           {x:648, y: 288, w: 70, h: 70},
    door_openTop:           {x:648, y: 216, w: 70, h: 70},
    fence:                  {x:648, y: 144, w: 70, h: 70},
    fenceBroken:            {x:648, y: 72, w: 70, h: 70},
    grass:                  {x:648, y: 0, w: 70, h: 70},
    grassCenter:            {x:576, y: 864, w: 70, h: 70},
    grassCenter_rounded:    {x:576, y: 792, w: 70, h: 70},
    grassCliffLeft:         {x:576, y: 720, w: 70, h: 70},
    grassCliffLeftAlt:      {x:576, y: 648, w: 70, h: 70},
    grassCliffRight:        {x:576, y: 576, w: 70, h: 70},
    grassCliffRightAlt:     {x:576, y: 504, w: 70, h: 70},
    grassHalf:              {x:576, y: 432, w: 70, h: 70},
    grassHalfLeft:          {x:576, y: 360, w: 70, h: 70},
    grassHalfMid:           {x:576, y: 288, w: 70, h: 70},
    grassHalfRight:         {x:576, y: 216, w: 70, h: 70},
    grassHillLeft:          {x:576, y: 144, w: 70, h: 70},
    grassHillLeft2:         {x:576, y: 72, w: 70, h: 70},
    grassHillRight:         {x:576, y: 0, w: 70, h: 70},
    grassHillRight2:        {x:504, y: 864, w: 70, h: 70},
    grassLedgeLeft:         {x:849, y: 868, w: 5, h: 24},
    grassLedgeRight:        {x:849, y: 894, w: 5, h: 24},
    grassLeft:              {x:504, y: 648, w: 70, h: 70},
    grassMid:               {x:504, y: 576, w: 70, h: 70},
    grassRight:             {x:504, y: 504, w: 70, h: 70},
    hill_large:             {x:842, y: 720, w: 48, h: 146},
    hill_largeAlt:          {x:864, y: 0, w: 48, h: 146},
    hill_small:             {x:792, y: 828, w: 48, h: 106},
    hill_smallAlt:          {x:792, y: 720, w: 48, h: 106},
    ladder_mid:             {x:504, y: 144, w: 70, h: 70},
    ladder_top:             {x:504, y: 72, w: 70, h: 70},
    liquidLava:             {x:504, y: 0, w: 70, h: 70},
    liquidLavaTop:          {x:432, y: 864, w: 70, h: 70},
    liquidLavaTop_mid:      {x:432, y: 792, w: 70, h: 70},
    liquidWater:            {x:504, y: 216, w: 70, h: 70},
    liquidWaterTop:         {x:432, y: 648, w: 70, h: 70},
    liquidWaterTop_mid:     {x:432, y: 576, w: 70, h: 70},
    lock_blue:              {x:432, y: 504, w: 70, h: 70},
    lock_green:             {x:72, y: 576, w: 70, h: 70},
    lock_red:               {x:432, y: 360, w: 70, h: 70},
    lock_yellow:            {x:432, y: 288, w: 70, h: 70},
    rockHillLeft:           {x:432, y: 216, w: 70, h: 70},
    rockHillRight:          {x:432, y: 144, w: 70, h: 70},
    ropeAttached:           {x:432, y: 72, w: 70, h: 70},
    ropeHorizontal:         {x:432, y: 0, w: 70, h: 70},
    ropeVertical:           {x:360, y: 864, w: 70, h: 70},
    sand:                   {x:360, y: 792, w: 70, h: 70},
    sandCenter:             {x:576, y: 864, w: 70, h: 70},
    sandCenter_rounded:     {x:576, y: 792, w: 70, h: 70},
    sandCliffLeft:          {x:360, y: 720, w: 70, h: 70},
    sandCliffLeftAlt:       {x:360, y: 648, w: 70, h: 70},
    sandCliffRight:         {x:360, y: 576, w: 70, h: 70},
    sandCliffRightAlt:      {x:360, y: 504, w: 70, h: 70},
    sandHalf:               {x:360, y: 432, w: 70, h: 70},
    sandHalfLeft:           {x:360, y: 360, w: 70, h: 70},
    sandHalfMid:            {x:360, y: 288, w: 70, h: 70},
    sandHalfRight:          {x:360, y: 216, w: 70, h: 70},
    sandHillLeft:           {x:360, y: 144, w: 70, h: 70},
    sandHillLeft2:          {x:360, y: 72, w: 70, h: 70},
    sandHillRight:          {x:360, y: 0, w: 70, h: 70},
    sandHillRight2:         {x:288, y: 864, w: 70, h: 70},
    sandLedgeLeft:          {x:856, y: 892, w: 5, h: 18},
    sandLedgeRight:         {x:856, y: 912, w: 5, h: 18},
    sandLeft:               {x:288, y: 648, w: 70, h: 70},
    sandMid:                {x:288, y: 576, w: 70, h: 70},
    sandRight:              {x:288, y: 504, w: 70, h: 70},
    sign:                   {x:288, y: 432, w: 70, h: 70},
    signExit:               {x:288, y: 360, w: 70, h: 70},
    signLeft:               {x:288, y: 288, w: 70, h: 70},
    signRight:              {x:288, y: 216, w: 70, h: 70},
    snow:                   {x:288, y: 144, w: 70, h: 70},
    snowCenter:             {x:720, y: 864, w: 70, h: 70},
    snowCenter_rounded:     {x:288, y: 72, w: 70, h: 70},
    snowCliffLeft:          {x:288, y: 0, w: 70, h: 70},
    snowCliffLeftAlt:       {x:216, y: 864, w: 70, h: 70},
    snowCliffRight:         {x:216, y: 792, w: 70, h: 70},
    snowCliffRightAlt:      {x:216, y: 720, w: 70, h: 70},
    snowHalf:               {x:216, y: 648, w: 70, h: 70},
    snowHalfLeft:           {x:216, y: 576, w: 70, h: 70},
    snowHalfMid:            {x:216, y: 504, w: 70, h: 70},
    snowHalfRight:          {x:216, y: 432, w: 70, h: 70},
    snowHillLeft:           {x:216, y: 360, w: 70, h: 70},
    snowHillLeft2:          {x:216, y: 288, w: 70, h: 70},
    snowHillRight:          {x:216, y: 216, w: 70, h: 70},
    snowHillRight2:         {x:216, y: 144, w: 70, h: 70},
    snowLedgeLeft:          {x:863, y: 868, w: 5, h: 18},
    snowLedgeRight:         {x:863, y: 888, w: 5, h: 18},
    snowLeft:               {x:144, y: 864, w: 70, h: 70},
    snowMid:                {x:144, y: 792, w: 70, h: 70},
    snowRight:              {x:144, y: 720, w: 70, h: 70},
    stone:                  {x:144, y: 648, w: 70, h: 70},
    stoneCenter:            {x:144, y: 576, w: 70, h: 70},
    stoneCenter_rounded:    {x:144, y: 504, w: 70, h: 70},
    stoneCliffLeft:         {x:144, y: 432, w: 70, h: 70},
    stoneCliffLeftAlt:      {x:144, y: 360, w: 70, h: 70},
    stoneCliffRight:        {x:144, y: 288, w: 70, h: 70},
    stoneCliffRightAlt:     {x:144, y: 216, w: 70, h: 70},
    stoneHalf:              {x:144, y: 144, w: 70, h: 70},
    stoneHalfLeft:          {x:144, y: 72, w: 70, h: 70},
    stoneHalfMid:           {x:144, y: 0, w: 70, h: 70},
    stoneHalfRight:         {x:72, y: 864, w: 70, h: 70},
    stoneHillLeft2:         {x:72, y: 792, w: 70, h: 70},
    stoneHillRight2:        {x:72, y: 720, w: 70, h: 70},
    stoneLedgeLeft:         {x:863, y: 908, w: 5, h: 24},
    stoneLedgeRight:        {x:864, y: 148, w: 5, h: 24},
    stoneLeft:              {x:72, y: 504, w: 70, h: 70},
    stoneMid:               {x:72, y: 432, w: 70, h: 70},
    stoneRight:             {x:72, y: 360, w: 70, h: 70},
    stoneWall:              {x:72, y: 288, w: 70, h: 70},
    tochLit:                {x:72, y: 216, w: 70, h: 70},
    tochLit2:               {x:72, y: 144, w: 70, h: 70},
    torch:                  {x:72, y: 72, w: 70, h: 70},
    window:                 {x:72, y: 0, w: 70, h: 70}
  };

  static DIGIT_WIDTH = 45;
  static DIGIT_HEIGHT = 45;
  static SCORE = {
    VALUE_OF_SERVING: 20
  };

  static DOOR = {
    W: 70,
    H: 140
  };  
  static CASSA = {
    W: 70,
    H: 70
  };
  static SCORECOUNTER = {
    X: 480,
    Y: 40,
    NROFDIGITS: 3
  };
  static TIMER = {
    X: 730,
    Y: 40,
    CLOCK: {
      W: 47,
      H: 47,
      OFFSET_X: 70,
      OFFSET_Y: 5
    },
    NROFDIGITS: 3
  };

  static MEDALS = {
    W: 44,
    H:  152 / 2,
    TYPES: {
      circle_gold: 1,
      circle_silver: 0,
      circle_copper: 3,
      sun_gold: 2,
      sun_silver: 6,
      x_silver: 4,
      x_copper: 7,
      star_silver: 8,
      star_copper: 5
    }
  };

  static POTENTIALWISHES = {
    ANIMALS: [
      Config.ANIMALS.ELEPHANT,
      Config.ANIMALS.GIRAFFE,
      Config.ANIMALS.HIPPO,
      Config.ANIMALS.MONKEY,
      Config.ANIMALS.PANDA,
      Config.ANIMALS.PARROT,
      Config.ANIMALS.PENGUIN,
      Config.ANIMALS.PIG,
      Config.ANIMALS.RABBIT,
      Config.ANIMALS.SNAKE
    ],
    ITEMS: [
      Config.ITEMS.REDPILL,
      Config.ITEMS.BLUEPILL,
      Config.ITEMS.BONE,
      Config.ITEMS.MEDKIT,
    ]
  };

  static ZINDICES = {
    LEVELMAP: 1,
    DOOR: 2,
    CUSTOMERS: 3,
    EFFECTS: 20
  };

  static GetRandomPosition(): ex.Vector {
    let getRandomX = () => {
      let minX = (Config.GAME.WIDTH - Config.GAME.DEFAULTMAP.W) / 2;
      let maxX = Config.GAME.WIDTH - minX;
      return ex.Util.randomIntInRange(minX, maxX);
    };
    let getRandomY = () => {
      let minY = (Config.GAME.HEIGHT - Config.GAME.DEFAULTMAP.H) / 2;
      let maxY = Config.GAME.HEIGHT - minY;
      return ex.Util.randomIntInRange(minY, maxY);
    };

    return new ex.Vector( getRandomX(), getRandomY() );
  };
}
