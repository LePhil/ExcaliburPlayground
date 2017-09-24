declare var globals: any;
import * as ex from "excalibur";

export class Storage {

  static set(key:string, value:object):void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key:string):any {
    return JSON.parse(localStorage.getItem(key));
  }
}
