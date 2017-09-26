declare var globals: any;
import * as ex from "excalibur";
import {Digit} from "../Digit";
import {Button} from "../ui/Button";
import {Medal} from "../ui/Medal";
import {Director} from "../Director";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class EndGameScene extends ex.Scene {

  private _digits:Array<Digit>;
  private _director: Director;

  constructor(engine: ex.Engine, director: Director) {
    super(engine);

    this._director = director;
  }

  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    let pos_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON_WIDTH / 2;
    let pos_y = Config.GAME.HEIGHT - 300;

    // TODO: if there's a next level, show "Continue" button

    let goToStartButton  = new Button(
      pos_x, pos_y,
      190, 49,
      "Zurück",
      Resources.ImgButton.asSprite(),
      () => {this._goToStart()}
    );

    this.add(goToStartButton);
  }

  private _goToStart():any {
    globals.startMenu();
  }

  onActivate () {
    // Make sure nothing from the previous game is left over
    if(this._digits) {
      this._digits.forEach((digit) => {
        digit.kill();
      });
    }

    this._digits = new Array<Digit>();
    
    let pos_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON_WIDTH / 2;
    let pos_y = Config.GAME.HEIGHT / 2 - Config.GAME.UI.BUTTON_HEIGHT;

    let score = this._director.getScore();
    let digitStartX = pos_x - 100;
    
    for(let i = 0; i < (""+score).length; i++) {
      let newDigit = new Digit(digitStartX + i*Config.DIGIT_WIDTH, pos_y - 100, +(""+score)[i]);
      this._digits.push(newDigit);
      this.add(newDigit);
    }

    // TODO: different medal, depending on the score
    this.add( new Medal(200, 200, "sun_silver") );
  }

  onDeactivate () {}
}