declare var globals: any;
import * as ex from "excalibur";
import {Digit} from "./Digit";

export class EndGameScreen extends ex.UIActor {

  private _goToStartButton: ex.UIActor;
  private _digits:Array<Digit>;

  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    let pos_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos_y = globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT;

    this._goToStartButton = new MenuButton(
      globals.resources.BackBtn.asSprite(),
      globals.resources.BackBtnHover.asSprite(),
      () => {this._goToStart()},
      pos_x, pos_y
    );

    // TODO: once it's a scene, we have to re-creat digit array because it can be larger...
    this._digits = new Array<Digit>();

    let score = globals.currentLevelOptions.score;
    let digitStartX = pos_x - 100;
    for(let i = 0; i < (""+score).length; i++) {
      let newDigit = new Digit(digitStartX + i*globals.conf.DIGIT_WIDTH, pos_y - 100, +(""+score)[i]);
      this._digits.push(newDigit);
      this.add(newDigit);
    }

    //TODO: make into a scene, use onactivate to reset digits!

    this.add(this._goToStartButton);
  }

  private _goToStart():any {
    globals.startMenu();
    this._digits.forEach((digit) => {
      digit.setDrawing("0");
    });
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
