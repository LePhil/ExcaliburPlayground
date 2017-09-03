declare var globals: any;
import * as ex from "excalibur";

export class Storage {
  constructor() {

  }

  public set(key:string, value:object):void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public get(key:string):object {
    return JSON.parse(localStorage.getItem(key));
  }
}
