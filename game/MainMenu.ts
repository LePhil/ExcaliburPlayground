declare var globals: any;
import * as ex from "excalibur";

export class MainMenu extends ex.UIActor {
  private _startButton: ex.UIActor;
  private _optionsButton: ex.UIActor;

  constructor() {
    super();
    this.color = new ex.Color(0, 0, 0, 0.9);
  }

  public onInitialize(engine: ex.Engine) {
    super.onInitialize(engine);

    this._startButton   = new MenuButton(globals.resources.StartBtn.asSprite(),
                                         globals.resources.StartBtnHover.asSprite(),
                                         MainMenu.StartGame,
                                         globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2,
                                         globals.conf.GAME.HEIGHT / 2 - globals.conf.GAME.UI.BUTTON_HEIGHT);
    this._optionsButton = new MenuButton(globals.resources.OptionBtn.asSprite(),
                                         globals.resources.OptionBtnHover.asSprite(),
                                         MainMenu.OpenOptions,
                                         globals.conf.GAME.WIDTH / 2 - globals.conf.GAME.UI.BUTTON_WIDTH / 2,
                                         globals.conf.GAME.HEIGHT / 2 + globals.conf.GAME.UI.BUTTON_HEIGHT);

    globals.game.add(this._startButton);
    globals.game.add(this._optionsButton);
  }

  public static StartGame() {
    console.log("start game");
  }

  public static OpenOptions() {
    console.log("open options");
  }
}

class MenuButton extends ex.UIActor {
  constructor(sprite: ex.Sprite, hoverSprite: ex.Sprite, public action: () => void, x: number, y: number) {
    super(x, y, globals.conf.GAME.UI.BUTTON_WIDTH, globals.conf.GAME.UI.BUTTON_HEIGHT);

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
