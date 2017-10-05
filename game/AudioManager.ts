import * as ex from "excalibur";
import {Resources} from "./config/Resources";
import {Storage} from "./Storage";

export class AudioManager {
    static setup() {
        AudioManager.isMuted = Storage.get("muted", false);
    }

    static isMuted: boolean = false;

    static toggleMute():boolean {
        if (AudioManager.isMuted) {
            AudioManager.unmute();
        } else {
            AudioManager.mute();
        }
        return AudioManager.isMuted;
    }

    static mute(): void {
        AudioManager.isMuted = true;
        Storage.set("muted", true);
    }

    static unmute(): void {
        AudioManager.isMuted = false;
        Storage.set("muted", false);
    }

    static play(audio: string, looped: boolean = false): void {
        if(!AudioManager.isMuted) {
            Resources[audio].play();

            if (looped) {
                Resources[audio].setLoop(true);
            }
        }
    }

    static stop(audio: string): void {
        Resources[audio].stop();
    }

    static playRandom(audios: Array<string>, looped: boolean = false): void {
        if(!AudioManager.isMuted) {
            let audio = audios[ex.Util.randomInRange(0, audios.length-1)];
            AudioManager.play(audio, looped);
        }
    }
}