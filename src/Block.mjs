import { shapeToString } from "./shapes.mjs";

export class Block {
  #color;

  constructor(color) {
    this.#color = color;
  }

  width() {
    return 1;
  }

  height() {
    return 1;
  }

  toString() {
    return shapeToString(this);
  }
}
