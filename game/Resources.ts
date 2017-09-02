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

    static ImgButton           = new ex.Texture("game/assets/ui/blue_button00.png");

    static OptionBtn           = new ex.Texture("game/assets/ui/btn_option.png");
    static OptionBtnHover      = new ex.Texture("game/assets/ui/btn_option_hover.png");
    static StartBtn            = new ex.Texture("game/assets/ui/btn_start.png");
    static StartBtnHover       = new ex.Texture("game/assets/ui/btn_start_hover.png");
}
