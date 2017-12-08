import * as ex from "excalibur";
import {Digit} from "../Digit";
import {TextOverlay} from "../ui/TextOverlay";
import {Pos, Button} from "../ui/Button";
import {Medal} from "../ui/Medal";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";
import {Storage, SavedLevelData} from "../Storage";

export class EndGameScene extends ex.Scene {
    private _textOverlay: TextOverlay;  
    private _digits:Array<Digit>;
    private _button: Button;
    private _medal: Medal;

    constructor(engine: ex.Engine) {
        super(engine);
    
        this._textOverlay = new TextOverlay();
        this.add(this._textOverlay);
    
        this._digits = new Array<Digit>();
    
        this._medal = new Medal(200, 200);
        this.add( this._medal );
        this._medal.visible = false;
    
        this.add(new Button(
            Pos.make(Config.GAME.UI.BUTTONS.POSITIONS.bottom_l),
            "Back",
            () => { engine.goToScene("menu"); }
        ));

        this._button = new Button(
            Pos.make(Config.GAME.UI.BUTTONS.POSITIONS.bottom_r),
            "Continue",
            () => {}
        );
        this.add(this._button);
    }

    onInitialize(engine: ex.Engine) {
        super.onInitialize(engine);
    }

    onActivate () {
    }

    _clearDigits () {
        // Make sure nothing from the previous level is left over
        if(this._digits.length > 0) {
            this._digits.forEach((digit) => {
                digit.kill();
            });
        }
        this._digits = [];
    }

    public load(setup: any, results: number, passed: boolean, callback: () => void) {
        let outroText = [""];

        if (passed && setup.OUTRO) {
            outroText = setup.OUTRO;
        } else if (setup.OUTRO_FAILED) {
            outroText = setup.OUTRO_FAILED;
        }

        this._textOverlay.setText(outroText);

        this._medal.visible = false;

        this._button.action = callback;
        
        // only show Next button if there's a next level or the user can retry
        this._button.visible = !!setup.NEXT || !passed;

        this._clearDigits();
        
        let pos_x = Config.GAME.WIDTH / 2 - Config.GAME.UI.BUTTON.W / 2;
        let pos_y = Config.GAME.HEIGHT / 2 - Config.GAME.UI.BUTTON.H;

        let digitStartX = pos_x - 100;
        
        for(let i = 0; i < (""+results).length; i++) {
            let newDigit = new Digit(digitStartX + i*Config.DIGIT_WIDTH, pos_y - 100, +(""+results)[i]);
            this._digits.push(newDigit);
            this.add(newDigit);
        }

        let scores = Storage.saveScore(setup.NAME, results);

        digitStartX = pos_x;
        pos_y += 200;

        // TODO: Nicer and with an explanation..
        let sortedScores = scores.getSortedScores();
        for(let scoreCounter = 0; scoreCounter < sortedScores.length; scoreCounter++) {
            let score = sortedScores[scoreCounter];

            // Draw score
            for(let i = 0; i < (""+score).length; i++) {
                let pos_x = digitStartX + i*Config.DIGIT_WIDTH;

                let newDigit = new Digit(pos_x, pos_y, +(""+score)[i]);
                this._digits.push(newDigit);
                this.add(newDigit);
            }

            // If this run's score is under the top 3, show the medal
            if (score === results && scoreCounter < 3) {
                this._medal.pos.setTo(digitStartX - 100, pos_y - 30);
                this._medal.visible = true;


                this._medal.setValueByNumber(scoreCounter);
            }

            pos_y += Config.DIGIT_HEIGHT;
        }
    }
}
