import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class HTMLDialogue {
    private dlg: HTMLElement;
    private title: HTMLElement;
    private text: HTMLElement;
    private btnNope: HTMLElement;
    private btnOkay: HTMLElement;

    constructor() {
        this.dlg = document.getElementsByClassName("dlg--start")[0] as HTMLElement;
        this.title = document.getElementsByClassName("dlg__title")[0] as HTMLElement;
        this.text = document.getElementsByClassName("dlg__text")[0] as HTMLElement;
        this.btnNope = document.getElementsByClassName("dlg__btn--nope")[0] as HTMLElement;
        this.btnOkay = document.getElementsByClassName("dlg__btn--okay")[0] as HTMLElement;
    }

    public setup(setup: any, callback: () => void, callbackNope?: () => void): void {
        this.title.innerHTML = setup.NAME;
        this.text.innerHTML = setup.INTRO;
        this.btnOkay.addEventListener("click", callback);

        if(callbackNope) {
            this.btnNope.addEventListener("click", callbackNope);
            this.btnNope.style.display = "";
        } else {
            this.btnNope.style.display = "none";
        }
    }

    public show(): void {
        this.dlg.style.display = "block";
    }

    public hide(): void {
        this.dlg.style.display = "none";
    }
}
