declare var globals: any;
import * as ex from "excalibur";
import {Button} from "../ui/Button";
import {Config} from "../config/Config";
import {AudioManager} from "../AudioManager";

export class MainMenu extends ex.Scene {

  private _introButton: Button;
  private _startButton: Button;
  private _optionsButton: Button;
  private _creditsButton: Button;  

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
      () => {globals.startCutscene();}
    );

    this._startButton = new Button(
      pos1_x, pos1_y,
      "Start",
      () => {globals.startGame();}
    );

    this._optionsButton = new Button(
      pos2_x, pos2_y,
      "Options",
      () => {globals.optionsScene();}
    );

    this._creditsButton = new Button(
      500, 500,
      "Credits",
      () => {globals.credits();}
    )

    this.add(this._introButton);
    this.add(this._startButton);
    this.add(this._optionsButton);
    this.add(this._creditsButton);
  }

  // start-up logic, called once
  onInitialize(engine: ex.Engine) {
  }

  onActivate () {
    AudioManager.play("Sound_Intro", true);
  }

  onDeactivate () {
    AudioManager.stop("Sound_Intro");
  } 
}
