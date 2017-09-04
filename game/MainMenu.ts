declare var globals: any;
import * as ex from "excalibur";

export class MainMenu extends ex.UIActor {

  private _level1Button: ex.UIActor;
  private _level2Button: ex.UIActor;

  private _startButton: ex.UIActor;
  private _optionsButton: ex.UIActor;
  private _backButton: ex.UIActor;
  private _changePlayerButton: ex.UIActor;

  private _playerPreview: PlayerPreview;

  constructor() {
    super();
  }

  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    let pos1_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos1_y = globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT;
    let pos2_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos2_y = globals.conf.GAME.HEIGHT / 2 + globals.conf.GAME.UI.BUTTON_HEIGHT;

    this._level1Button  = new MenuButton(
      globals.resources.Level1_1_Btn.asSprite(),
      globals.resources.Level1_1_BtnHover.asSprite(),
      () => {this.startGame()},
      200, 200, 100, 100
    );

    this._level2Button  = new MenuButton(
      globals.resources.Level1_2_Btn.asSprite(),
      globals.resources.Level1_2_BtnHover.asSprite(),
      () => {this.startGame()},
      200, 600, 100, 100
    );

    this._startButton   = new MenuButton(
      globals.resources.StartBtn.asSprite(),
      globals.resources.StartBtnHover.asSprite(),
      () => {this.startGame()},
      pos1_x, pos1_y
    );

    this._optionsButton = new MenuButton(
      globals.resources.OptionBtn.asSprite(),
      globals.resources.OptionBtnHover.asSprite(),
      () => {this.openOptions()},
      pos2_x, pos2_y
    );

    this._backButton = new MenuButton(
      globals.resources.BackBtn.asSprite(),
      globals.resources.BackBtnHover.asSprite(),
      () => {this.back()},
      pos1_x, pos1_y
    );

    this._changePlayerButton = new MenuButton(
      globals.resources.ChangePlayerBtn.asSprite(),
      globals.resources.ChangePlayerBtnHover.asSprite(),
      () => {this.changePlayer()},
      pos2_x, pos2_y
    );

    globals.game.add(this._level1Button);
    globals.game.add(this._level2Button);
    globals.game.add(this._startButton);
    globals.game.add(this._optionsButton);
    globals.game.add(this._backButton);
    globals.game.add(this._changePlayerButton);

    this._startButton.visible = true;
    this._optionsButton.visible = true;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;
  }

  public startGame() {
    if ( !this._startButton.visible ) { return; }

    this._level1Button.visible = false;
    this._level2Button.visible = false;
    this._startButton.visible = false;
    this._optionsButton.visible = false;
    this._backButton.visible = false;
    this._changePlayerButton.visible = false;

    globals.startGame();
  }

  public openOptions() {
    if ( !this._optionsButton.visible ) { return; }

    this._level1Button.visible = false;
    this._level2Button.visible = false;
    this._startButton.visible = false;
    this._optionsButton.visible = false;
    this._backButton.visible = true;
    this._changePlayerButton.visible = true;

    this._playerPreview = new PlayerPreview(100, 100);
    globals.game.add(this._playerPreview);
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

class MenuButton extends ex.UIActor {
  constructor(sprite: ex.Sprite, hoverSprite: ex.Sprite, public action: () => void, x: number, y: number, w = globals.conf.GAME.UI.BUTTON_WIDTH, h = globals.conf.GAME.UI.BUTTON_HEIGHT) {
    super(x, y, w, h);

    this.off("pointerup", this.action);
    this.on("pointerup", this.action);

    this.addDrawing("normal", sprite);
    this.addDrawing("hover", hoverSprite);
    this.setDrawing("normal");

    this.on("pointerdown", (event) => {
      this.setDrawing("hover");
    });

    this.on("pointerup", (event) => {
      this.setDrawing("normal");
    });
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

  onInitialize(engine: ex.Engine): void {
      let scale = globals.conf.SPRITE_SCALE;
      let spriteSheet = new ex.SpriteSheet(globals.resources.TexturePlayers, 7, 8, 128, 256);

      this._playerTypes.forEach((type) => {
        let sprite = spriteSheet.getSprite(type.coords.idle);
        sprite.scale.setTo(scale, scale);
        this.addDrawing(type.color, sprite);
      });

      this.setDrawing(this._playerTypes[this._currentPlayerTypeIndex].color);
  }
}
