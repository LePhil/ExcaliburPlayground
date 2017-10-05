import * as ex from "excalibur";

export class Storage {

  static set(key:string, value:any):void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key:string, defaultValue?: any):any {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else if (typeof defaultValue !== "undefined") {
      return defaultValue;
    } else {
      console.warn(`Key "${key}" not found in LocalStorage.`);
      return false;
    }
  }
}
