declare var globals: any;
import * as ex from "excalibur";

export class Resources {
    static TexturePlayers       = new ex.Texture("game/assets/textures/players.png");

    static TextureInventory     = new ex.Texture("game/assets/textures/animals/inventory.png");
    static TextureStations      = new ex.Texture("game/assets/textures/animals/stations.png");
    static TextureRabbit        = new ex.Texture("game/assets/textures/animals/rabbit.png");
    static TextureElephant      = new ex.Texture("game/assets/textures/animals/elephant.png");
    static TextureBlob          = new ex.Texture("game/assets/textures/animals/sprite_blob_pink.png");

    static TextureBubbles       = new ex.Texture("game/assets/textures/animals/bubbles.png");

    static ImgButton            = new ex.Texture("game/assets/ui/blue_button00.png");
    static ImgClock             = new ex.Texture("game/assets/ui/clock.png");
    static ImgInventorySlot     = new ex.Texture("game/assets/ui/grey_button13.png");

    static Cassa                = new ex.Texture("game/assets/textures/store/chimneyLow.png");

    static HUDSpriteSheet       = new ex.Texture("game/assets/ui/hud_spritesheet.png");
    static TextureTiles         = new ex.Texture("game/assets/textures/tiles_spritesheet.png");
    static ItemSpriteSheet      = new ex.Texture("game/assets/textures/genericItems_spritesheet_colored.png");
    
    static MedalsSheet          = new ex.Texture("game/assets/textures/medals.png");

    static Map_00               = new ex.Texture("game/assets/textures/map_00.png");
    static Map_intro_01         = new ex.Texture("game/assets/maps/intro.png");
    static Map_forest           = new ex.Texture("game/assets/maps/forest.png");

    static Sound_ChaChing       = new ex.Sound("game/assets/sounds/cha_ching.mp3", "game/assets/sounds/cha_ching.wav");
    static Sound_Intro          = new ex.Sound("game/assets/sounds/Whimsical-Popsicle.mp3");
}
