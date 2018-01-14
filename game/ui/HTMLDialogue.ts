import * as ex from "excalibur";
import {Config} from "../config/Config";
import {Resources} from "../config/Resources";

export class HTMLDialogue {
    private dlg: HTMLElement;
    private title: HTMLElement;
    private btn: HTMLElement;

    constructor() {
        this.dlg = document.getElementsByClassName("dlg--start")[0] as HTMLElement;
        this.title = document.getElementsByClassName("dlg__title")[0] as HTMLElement;
        this.btn = document.getElementsByClassName("dlg__btn")[0] as HTMLElement;
    }

    public setup(setup: any, callback: () => void): void {
        this.title.innerHTML = setup.NAME;
        this.btn.addEventListener("click", callback);
    }

    public show(): void {
        this.dlg.style.display = "block";
    }

    public hide(): void {
        this.dlg.style.display = "none";
    }
}
