declare var globals: any;
import * as ex from "excalibur";
import {Button} from "../ui/Button";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";
import {AudioManager} from "../AudioManager";
import {Storage} from "../Storage";

export class MainMenu extends ex.Scene {

  private _introButton: Button;
  private _startButton: Button;
  private _optionsButton: Button;
  private _backButton: Button;
  private _changePlayerButton: Button;
  private _creditsButton: Button;

  private _playerPreview: PlayerPreview;

  constructor(engine: ex.Engine) {
    super(engine);
    
    let pos0_y = Config.GAME.HEIGHT / 2 - 3 * Config.GAME.UI.BUTTON_HEIGHT;
    let pos1_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON_WIDTH / 2;
    let pos1_y = Config.GAME.HEIGHT / 2 - Config.GAME.UI.BUTTON_HEIGHT;
    let pos2_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON_WIDTH / 2;
    let pos2_y = Config.GAME.HEIGHT / 2 + Config.GAME.UI.BUTTON_HEIGHT;

    this._introButton = new Button(
      pos1_x, pos0_y,
      "Intro",
      () => {this.startCutscene()}
    );

    this._startButton = new Button(
      pos1_x, pos1_y,
      "Start",
      () => {this.startGame()}
    );

    this._optionsButton = new Button(
      pos2_x, pos2_y,
      "Options",
      () => {this.openOptions()}
    );

    this._backButton = new Button(
      pos1_x, pos1_y,
      "Back",
      () => {this.back()},
    );

    this._changePlayerButton = new Button(
      pos2_x, pos2_y,
      "Change",
      () => {this.changePlayer()}
    );

    this._creditsButton = new Button(
      500, 500,
      "Credits",
      () => {globals.credits();}
    )

    this.add(this._introButton);
    this.add(this._startButton);
    this.add(this._optionsButton);
    this.add(this._backButton);
    this.add(this._changePlayerButton);

    this.add(this._creditsButton);
  }

  // start-up logic, called once
  onInitialize(engine: ex.Engine) {
  }

  onActivate () {
    this._introButton.visible = true;
    this._startButton.visible = true;
    this._optionsButton.visible = true;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;

    AudioManager.play("Sound_Intro", true);
  }

  onDeactivate () {
    this._introButton.visible = false;
    this._startButton.visible = false;
    this._optionsButton.visible = false;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;

    AudioManager.stop("Sound_Intro");
  }

  public startGame() {
    if ( !this._startButton.visible ) { return; }

    globals.startGame();
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
          Config.PLAYER.WIDTH,
          Config.PLAYER.HEIGHT);

    this._playerTypes = Config.PLAYER.TYPES;

    if ( Storage.get("playerColor") ) {
      this._currentPlayerTypeIndex = this._playerTypes.indexOf(this._playerTypes.filter( type => type.color === Storage.get("playerColor") )[0]);
    } else {
      this._currentPlayerTypeIndex = 0;
    }

    let scale = Config.PLAYER.SPRITE_SCALE;
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
    Storage.set("playerColor", newPlayerColor);
  }
}
