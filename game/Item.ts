import * as ex from "excalibur";

export class Food {
  name: string;
  color: ex.Color;

  constructor(name = "Generic Food", color = ex.Color.Magenta) {
    this.name = name;
    this.color = color;
  }
}
