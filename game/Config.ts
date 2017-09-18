declare var globals: any;
import * as ex from "excalibur";

enum ActionType {
  Move = "move",
  Talk = "talk"
};

export class Config {
  static PLAYER = {
    STARTX: 500,
    STARTY: 200,
    WIDTH: 50,
    HEIGHT: 50,
    SPEED: 200,
    INITIAL_TYPE: "green",
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
    WIDTH: 128/2,
    HEIGHT: 256/2,
    SPEED: 200,
    NAMES: [
      "Thomas",
      "Gimli",
      "James",
      "Mr. Man",
      "Albert",
      "Stephanie",
      "Frieda",
      "Polly"
    ],
    THINKBUBBLE: {
      WIDTH: 30,
      HEIGHT: 30,
      OFFSET_X: 20,
      OFFSET_Y: 20,
      SPRITE: {
        giraffe:    {x: 0,    y: 0,     w: 284, h: 285},
        monkey:     {x: 0,    y: 1148,  w: 284, h: 285},
        panda:      {x: 286,  y: 287,   w: 284, h: 285},
        parrot:     {x: 286,  y: 0,     w: 284, h: 285},
        penguin:    {x: 0,    y: 1722,  w: 284, h: 285},
        rabbit:     {x: 0,    y: 1435,  w: 284, h: 285},
        hippo:      {x: 286,  y: 574,   w: 284, h: 285},
        pig:        {x: 0,    y: 861,   w: 284, h: 285},
        elephant:   {x: 0,    y: 574,   w: 284, h: 285},
        snake:      {x: 0,    y: 287,   w: 284, h: 285}
      }
    },
    INITIAL_PATIENCE: 100,
    PATIENCE_DELTA: 5,
    PATIENCE_DECREASE_INTERVAL: 1000,
    QUEUE_LENGTH: 5
  };

  static STATIONS = {
    CONF: {
      SCALE: 0.2
    },
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

  static FOODS = [
    "elephant",
    "giraffe",
    "hippo",
    "monkey",
    "panda",
    "parrot",
    "penguin",
    "pig",
    "rabbit",
    "snake"
  ];

  static GAME = {
    WIDTH: 1024,  // defined by electron wrapper
    HEIGHT: 768,  // defined by electron wrapper
    DEBUG: false,
    UI: {
      BUTTON_WIDTH: 190,
      BUTTON_HEIGHT: 49
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

  static DIGIT_WIDTH = 50;
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

  static LEVEL_TYPES = {
    NORMAL: "normal",   // Normal time management
    CUTSCENE: "cutscene"  // For some story
  };

  static MAPS = [
    {
      NAME: "Map_00",
      TYPE: Config.LEVEL_TYPES.NORMAL,
      IMG: "Map_00",
      W: 840,
      H: 560,
      CASSA: {X: 250, Y: 500},
      DOOR:  {X: 800, Y: 595, SPAWN_TIME_S: 5},
      FOODS: ["rabbit", "elephant", "giraffe"],
      STATION_PLACEMENTS: [
        {X: 700, Y: 500, T: "rabbit"},
        {X: 300, Y: 300, T: "elephant"},
        {X: 600, Y: 300, T: "giraffe"}
      ],
      BLOB: true,
      DURATION_S: 60
    },
    {
      NAME: "Map_01",
      TYPE: Config.LEVEL_TYPES.CUTSCENE,
      IMG: "Map_00",
      W: 840,
      H: 560,
      LOCATIONS: [
        {Name: "player_entry", X: 800, Y: 595},
        {Name: "player_main",  X: 600, Y: 600}
      ],
      CHARACTERS: [
        {Id: "player", Name: "Player", Color: "green", Initial: "player_entry"}
      ],
      SCRIPT: [
        {T: 3,  S: "player", A: ActionType.Move, O: {to: "player_main"} },
        {T: 5,  S: "player", A: ActionType.Talk, O: {text: "Hi!"} },
        {T: 9,  S: "player", A: ActionType.Talk, O: {text: "My name is Har-As!"} },
        {T: 13, S: "player", A: ActionType.Talk, O: {text: "I'm a Choch. You might not have heard of us."} },
        {T: 20, S: "player", A: ActionType.Talk, O: {text: "I'm from a planet far, far away."} },
        {T: 25, S: "player", A: ActionType.Talk, O: {text: "And today I'll tell you how I got here."} }
      ]
    }
  ];

  static ActionType = ActionType;
}
