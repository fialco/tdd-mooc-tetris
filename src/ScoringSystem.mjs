// Using Original Nintendo scoring system
// More on: https://tetris.wiki/Scoring

export class ScoringSystem {
  #score;
  #level;
  #totalLines;

  constructor() {
    this.#score = 0;
    this.#level = 0;
    this.#totalLines = 0;
  }

  linesCleared(lineCount) {
    this.#score += this.#getBasePoints(lineCount);
    this.#totalLines += lineCount;
    this.#updateLevel();
  }

  #getBasePoints(lineCount) {
    switch (lineCount) {
      case 1:
        return 40;
      case 2:
        return 100;
      case 3:
        return 300;
      case 4:
        return 1200;
      default:
        return 0;
    }
  }

  #updateLevel() {
    this.#level = Math.floor(this.#totalLines / 10);
  }

  get score() {
    return this.#score;
  }

  get level() {
    return this.#level;
  }
}
