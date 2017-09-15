declare var globals: any;
import * as ex from "excalibur";
import {Button} from "./ui/Button";

export class MainMenu extends ex.Scene {

  private _level1Button: ex.UIActor;
  private _level2Button: ex.UIActor;

  private _startButton: ex.UIActor;
  private _optionsButton: ex.UIActor;
  private _backButton: ex.UIActor;
  private _changePlayerButton: ex.UIActor;

  private _playerPreview: PlayerPreview;

  constructor(engine: ex.Engine) {
    super(engine);

    let pos1_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos1_y = globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT;
    let pos2_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos2_y = globals.conf.GAME.HEIGHT / 2 + globals.conf.GAME.UI.BUTTON_HEIGHT;

    // TODO: yeah no...
    this._level1Button  = new Button(
      globals.resources.Level1_1_Btn.asSprite(),
      globals.resources.Level1_1_BtnHover.asSprite(),
      () => {this.startCutscene()},
      200, 200, 100, 100
    );

    this._level2Button  = new Button(
      globals.resources.Level1_2_Btn.asSprite(),
      globals.resources.Level1_2_BtnHover.asSprite(),
      () => {this.startGame()},
      200, 600, 100, 100
    );

    this._startButton   = new Button(
      globals.resources.StartBtn.asSprite(),
      globals.resources.StartBtnHover.asSprite(),
      () => {this.startGame()},
      pos1_x, pos1_y
    );

    this._optionsButton = new Button(
      globals.resources.OptionBtn.asSprite(),
      globals.resources.OptionBtnHover.asSprite(),
      () => {this.openOptions()},
      pos2_x, pos2_y
    );

    this._backButton = new Button(
      globals.resources.BackBtn.asSprite(),
      globals.resources.BackBtnHover.asSprite(),
      () => {this.back()},
      pos1_x, pos1_y
    );

    this._changePlayerButton = new Button(
      globals.resources.ChangePlayerBtn.asSprite(),
      globals.resources.ChangePlayerBtnHover.asSprite(),
      () => {this.changePlayer()},
      pos2_x, pos2_y
    );

    this.add(this._level1Button);
    this.add(this._level2Button);
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
    this._level1Button.visible = true;
    this._level2Button.visible = true;
    this._startButton.visible = true;
    this._optionsButton.visible = true;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;
  }
  // each time the scene is deactivated by Engine.goToScene
  onDeactivate () {
    this._level1Button.visible = false;
    this._level2Button.visible = false;
    this._startButton.visible = false;
    this._optionsButton.visible = false;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;
  }

  public startGame() {
    if ( !this._startButton.visible ) { return; }

    globals.startGame();
  }

  public startCutscene() {
    if ( !this._level1Button.visible ) { return; }
    globals.startCutscene();    
  }

  public openOptions() {
    if ( !this._optionsButton.visible ) { return; }

    // Hacky fix (TODO?) - option and changePlayer buttons are on top of each other
    // --> click triggers both. Have to delay enabling option button a tiny bit...
    setTimeout(() => {
      this._level1Button.visible = false;
      this._level2Button.visible = false;
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

    this._level1Button.visible = true;
    this._level2Button.visible = true;
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
    super(x, y, globals.conf.PLAYER_WIDTH, globals.conf.PLAYER_HEIGHT);

    this._playerTypes = globals.conf.PLAYER_TYPES;

    if ( globals.storage.get("playerColor") ) {
      this._currentPlayerTypeIndex = this._playerTypes.indexOf(this._playerTypes.filter( type => type.color === globals.storage.get("playerColor") )[0]);
    } else {
      this._currentPlayerTypeIndex = 0;
    }

    let scale = globals.conf.SPRITE_SCALE;
    let spriteSheet = new ex.SpriteSheet(globals.resources.TexturePlayers, 7, 8, 128, 256);

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
