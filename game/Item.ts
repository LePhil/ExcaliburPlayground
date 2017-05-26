import * as ex from "excalibur";

export class Food {
  name: string;
  color: ex.Color;

  constructor(name, color) {
    this.name = name || "Food";
    this.color = color || ex.Color.Red;
  }
}
