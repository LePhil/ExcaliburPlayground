declare var globals: any;
import * as ex from "excalibur";

export class Resources {
    static TexturePlayers      = new ex.Texture("game/assets/textures/players.png");

    static TextureInventory    = new ex.Texture("game/assets/textures/animals/inventory.png");
    static TextureRabbit       = new ex.Texture("game/assets/textures/animals/rabbit.png");
    static TextureElephant     = new ex.Texture("game/assets/textures/animals/elephant.png");


    static TextureMonsterDown  = new ex.Texture("game/assets/textures/minotaurv2.png");
    static TextureMonsterRight = new ex.Texture("game/assets/textures/minotaurv2right.png");
    static TextureMonsterUp    = new ex.Texture("game/assets/textures/minotaurv2back.png");
}
