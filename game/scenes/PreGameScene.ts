declare var globals: any;
import * as ex from "excalibur";
import {Button} from "../ui/Button";
import {TextOverlay} from "../ui/TextOverlay";
import {Director} from "../Director";


export class PreGameScene extends ex.Scene {

  private _director: Director;

  constructor(engine: ex.Engine, director: Director) {
    super(engine);

    this._director = director;
  }

  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    this._director.loadLevelData("Map_00");
    
    let textOverlay = new TextOverlay(this._director.getLevelData("INTRO"));
    this.add(textOverlay);
    
    let pos_x = globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2;
    let pos_y = globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT;

    let startGameButton = new Button(
      pos_x, pos_y,
      190, 49,
      "Start",
      globals.resources.ImgButton.asSprite(),
      () => {this._startGame()}
    );

    this.add(startGameButton);

  }

  private _startGame():any {
    globals.startGame();
  }

  onActivate () {}

  onDeactivate () {}
}