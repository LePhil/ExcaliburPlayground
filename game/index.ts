declare var globals: any;
import * as ex from "excalibur";
import {Config} from "./config/Config";
import {Levels} from "./config/Levels";
import {Resources} from "./config/Resources";
import {AudioManager} from "./AudioManager";
import {Storage} from "./Storage";

import {MainMenu} from "./scenes/MainMenu";

import {LevelScene} from "./scenes/LevelScene";
import {AreaSetupObject, MapScene} from "./scenes/MapScene";
import {Cutscene} from "./scenes/Cutscene";
import {DebugScene} from "./scenes/DebugScene";

import {Director} from "./Director";

AudioManager.setup();

let game = new ex.Engine({
    canvasElementId: 'game',
    width: Config.GAME.WIDTH,
    height: Config.GAME.HEIGHT,
    pointerScope: ex.Input.PointerScope.Canvas,
    displayMode: ex.DisplayMode.FullScreen
});

game.add("loading", new ex.Scene(game));
game.add("menu", new MainMenu(game));
game.add("debug", new DebugScene(game));

Object.keys(Levels.AREAS).forEach(areaObj => {
    let area: AreaSetupObject = Levels.AREAS[areaObj];
    let mapScene = new MapScene(area, game);
    game.add(MapScene.createSceneName(area), mapScene);
});

let loader = new ex.Loader();

for (let r in Resources) {
    loader.addResource(Resources[r]);
}

game.start(loader).then(function(){
    game.goToScene("menu");
});
