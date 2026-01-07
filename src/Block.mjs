import { shapeToString } from "./shapes.mjs";

export class Block {
  #color;

  constructor(color) {
    this.#color = color;
  }

  toString() {
    return shapeToString(this);
  }
}
