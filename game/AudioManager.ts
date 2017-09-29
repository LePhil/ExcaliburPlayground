import {Resources} from "./config/Resources";
import {Storage} from "./Storage";

export class AudioManager {
    static isMuted: boolean = false;

    static mute(): void {
        AudioManager.isMuted = true;
    }

    static unmute(): void {
        AudioManager.isMuted = false;
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
}