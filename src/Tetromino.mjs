import { ArikaRotatingShape } from "./ArikaRotatingShape.mjs";

export class Tetromino {
  #currentOrientation;
  #orientations;

  constructor(currentOrientation, orientations) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  static T_SHAPE = new Tetromino(0, [
    ArikaRotatingShape.fromString(
      `....
       TTT.
       .T..
       ....`
    ),
    ArikaRotatingShape.fromString(
      `.T..
       TT..
       .T..
       ....`
    ),
    ArikaRotatingShape.fromString(
      `....
       .T..
       TTT.
       ....`
    ),
    ArikaRotatingShape.fromString(
      `.T..
       .TT.
       .T..
       ....`
    ),
  ]);

  static I_SHAPE = new Tetromino(0, [
    ArikaRotatingShape.fromString(
      `....
       IIII
       ....
       ....`
    ),
    ArikaRotatingShape.fromString(
      `..I.
       ..I.
       ..I.
       ..I.`
    ),
  ]);

  static O_SHAPE = new Tetromino(0, [
    ArikaRotatingShape.fromString(
      `....
       .OO.
       .OO.
       ....`
    ),
  ]);

  rotateRight() {
    return new Tetromino(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft() {
    return new Tetromino(this.#currentOrientation - 1, this.#orientations);
  }

  #shape() {
    return this.#orientations[this.#currentOrientation];
  }

  width() {
    return this.#shape().width();
  }

  height() {
    return this.#shape().height();
  }

  blockAt(row, col) {
    return this.#shape().blockAt(row, col);
  }

  toString() {
    return this.#shape().toString();
  }
}
