declare var globals: any;
import * as ex from "excalibur";
import {Digit} from "./Digit";
import {Button} from "./ui/Button";

export class EndGameScene extends ex.Scene {

  private _goToStartButton: ex.UIActor;
  private _digits:Array<Digit>;

  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    let pos_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos_y = globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT;

    this._goToStartButton = new Button(
      globals.resources.BackBtn.asSprite(),
      globals.resources.BackBtnHover.asSprite(),
      () => {this._goToStart()},
      pos_x, pos_y
    );

    this.add(this._goToStartButton);
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
    
    let pos_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos_y = globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT;

    let score = globals.currentLevelOptions.score;
    let digitStartX = pos_x - 100;
    
    for(let i = 0; i < (""+score).length; i++) {
      let newDigit = new Digit(digitStartX + i*globals.conf.DIGIT_WIDTH, pos_y - 100, +(""+score)[i]);
      this._digits.push(newDigit);
      this.add(newDigit);
    }
  }

  onDeactivate () {}
}