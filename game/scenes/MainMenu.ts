declare var globals: any;
import * as ex from "excalibur";
import {Button} from "../ui/Button";
import {Resources} from "../config/Resources";

export class MainMenu extends ex.Scene {

  private _introButton: ex.UIActor;

  private _startButton: ex.UIActor;
  private _optionsButton: ex.UIActor;
  private _backButton: ex.UIActor;
  private _changePlayerButton: ex.UIActor;

  private _playerPreview: PlayerPreview;

  constructor(engine: ex.Engine) {
    super(engine);
    
    let pos0_y = globals.conf.GAME.HEIGHT / 2 - 3 * globals.conf.GAME.UI.BUTTON_HEIGHT;
    let pos1_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos1_y = globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT;
    let pos2_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos2_y = globals.conf.GAME.HEIGHT / 2 + globals.conf.GAME.UI.BUTTON_HEIGHT;

    this._introButton  = new Button(
      pos1_x, pos0_y,
      190, 49,
      "Intro",
      Resources.ImgButton.asSprite(),
      () => {this.startCutscene()}
    );

    this._startButton  = new Button(
      pos1_x, pos1_y,
      190, 49,
      "Start",
      Resources.ImgButton.asSprite(),
      () => {this.startGame()}
    );

    this._optionsButton  = new Button(
      pos2_x, pos2_y,
      190, 49,
      "Options",
      Resources.ImgButton.asSprite(),
      () => {this.openOptions()}
    );

    this._backButton = new Button(
      pos1_x, pos1_y,
      190, 49,
      "Back",
      Resources.ImgButton.asSprite(),
      () => {this.back()},
    );

    this._changePlayerButton = new Button(
      pos2_x, pos2_y,
      190, 49,
      "Change",
      Resources.ImgButton.asSprite(),
      () => {this.changePlayer()}
    );

    this.add(this._introButton);
    this.add(this._startButton);
    this.add(this._optionsButton);
    this.add(this._backButton);
    this.add(this._changePlayerButton);
  }

  // start-up logic, called once
  onInitialize(engine: ex.Engine) {
  }

  // each time the scene is activated by Engine.goToScene
  onActivate () {
    this._introButton.visible = true;
    this._startButton.visible = true;
    this._optionsButton.visible = true;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;
  }
  // each time the scene is deactivated by Engine.goToScene
  onDeactivate () {
    this._introButton.visible = false;
    this._startButton.visible = false;
    this._optionsButton.visible = false;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;
  }

  public startGame() {
    if ( !this._startButton.visible ) { return; }

    globals.preScreen();
  }

  public startCutscene() {
    if ( !this._introButton.visible ) { return; }
    globals.startCutscene();    
  }

  public openOptions() {
    if ( !this._optionsButton.visible ) { return; }

    // Hacky fix (TODO?) - option and changePlayer buttons are on top of each other
    // --> click triggers both. Have to delay enabling option button a tiny bit...
    setTimeout(() => {
      this._introButton.visible = false;
      this._startButton.visible = false;
      this._optionsButton.visible = false;
      this._backButton.visible = true;
      this._changePlayerButton.visible = true;
    }, 0);

    this._playerPreview = new PlayerPreview(100, 100);
    this.add(this._playerPreview);
  }

  public back() {
    if ( !this._backButton.visible ) { return; }

    this._introButton.visible = true;
    this._startButton.visible = true;
    this._optionsButton.visible = true;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;
    this._playerPreview.kill();
  }

  public changePlayer() {
    if ( !this._changePlayerButton.visible ) { return; }

    this._playerPreview.changePlayer();
  }
}

class PlayerPreview extends ex.Actor {
  private _playerTypes:any;
  private _currentPlayerTypeIndex:number;

  constructor(x,y) {
    super(x,
          y,
          globals.conf.PLAYER.WIDTH,
          globals.conf.PLAYER.HEIGHT);

    this._playerTypes = globals.conf.PLAYER.TYPES;

    if ( globals.storage.get("playerColor") ) {
      this._currentPlayerTypeIndex = this._playerTypes.indexOf(this._playerTypes.filter( type => type.color === globals.storage.get("playerColor") )[0]);
    } else {
      this._currentPlayerTypeIndex = 0;
    }

    let scale = globals.conf.PLAYER.SPRITE_SCALE;
    let spriteSheet = new ex.SpriteSheet(Resources.TexturePlayers, 7, 8, 128, 256);

    this._playerTypes.forEach((type) => {
      let sprite = spriteSheet.getSprite(type.coords.idle);
      sprite.scale.setTo(scale, scale);
      this.addDrawing(type.color, sprite);
    });

    this.setDrawing(this._playerTypes[this._currentPlayerTypeIndex].color);

    this.collisionType = ex.CollisionType.PreventCollision;
  }

  public changePlayer() {
    this._currentPlayerTypeIndex++;

    if(this._currentPlayerTypeIndex >= this._playerTypes.length) {
      this._currentPlayerTypeIndex = 0;
    }

    let newPlayerColor = this._playerTypes[this._currentPlayerTypeIndex].color;
    this.setDrawing(newPlayerColor);
    globals.storage.set("playerColor", newPlayerColor);
  }
}
