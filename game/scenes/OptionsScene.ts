declare var globals: any;
import * as ex from "excalibur";
import {Pos, Button} from "../ui/Button";
import {TextOverlay} from "../ui/TextOverlay";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";
import {Storage} from "../Storage";
import {AudioManager} from "../AudioManager";

export class OptionsScene extends ex.Scene {
    private _playerPreview: PlayerPreview;

    private _muteButton: Button;
    private _backButton: Button;
    private _changePlayerButton: Button;
    private _muteText: ex.Label;

    constructor(engine: ex.Engine) {
        super(engine);

        
        this._playerPreview = new PlayerPreview(100, 100);
        this.add(this._playerPreview);
        
        let buttonPos = Config.GAME.UI.BUTTONS.POSITIONS;

        this._backButton = new Button(
            Pos.make(buttonPos.bottom_l),
            "Back",
            () => {engine.goToScene("menu");},
        );
      
        this._changePlayerButton = new Button(
            Pos.make(buttonPos.center_1),
            "Change",
            () => {this.changePlayer()}
        );

        this._muteButton = new Button(
            Pos.make(buttonPos.center_2),
            "Mute/Unmute",
            () => {this.toggleMute();}
        );

        this._muteText = new ex.Label(this._getMutedText(AudioManager.isMuted), 500, 600);

        this.add(this._muteButton);
        this.add(this._muteText);
        this.add(this._backButton);
        this.add(this._changePlayerButton);
    }

    public changePlayer() {
        this._playerPreview.changePlayer();
    }
    
    public toggleMute() {
        let isMuted = AudioManager.toggleMute();

        this._muteText.text = this._getMutedText(isMuted);
    }

    private _getMutedText(isMuted: boolean): string {
        return isMuted ? "Currently muted" : "Currently not muted";
    }
}

class PlayerPreview extends ex.Actor {
    private _playerTypes: any;
    private _currentPlayerTypeIndex: number;
  
    constructor(x,y) {
        super(x, y, Config.PLAYER.WIDTH, Config.PLAYER.HEIGHT);
    
        this._playerTypes = Config.PLAYER.TYPES;
    
        if (Storage.get("playerColor") ) {
            this._currentPlayerTypeIndex = this._playerTypes.indexOf(this._playerTypes.filter( type => type.color === Storage.get("playerColor") )[0]);
        } else {
            this._currentPlayerTypeIndex = 0;
        }
    
        let scale = Config.PLAYER.SPRITE_SCALE;
        let spriteSheet = new ex.SpriteSheet(Resources.TexturePlayers, 7, 8, 128, 256);
    
        this._playerTypes.forEach((type) => {
            let sprite = spriteSheet.getSprite(type.coords.idle);
            sprite.scale.setTo(scale, scale);
            this.addDrawing(type.color, sprite);
        });
    
        this.setDrawing(this._playerTypes[this._currentPlayerTypeIndex].color);
    
        this.collisionType = ex.CollisionType.PreventCollision;
    }
  
    public changePlayer() {
      this._currentPlayerTypeIndex++;
  
      if(this._currentPlayerTypeIndex >= this._playerTypes.length) {
        this._currentPlayerTypeIndex = 0;
      }
  
      let newPlayerColor = this._playerTypes[this._currentPlayerTypeIndex].color;
      this.setDrawing(newPlayerColor);
      Storage.set("playerColor", newPlayerColor);
    }
  }