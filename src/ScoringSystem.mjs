// Using Original Nintendo scoring system
// More on: https://tetris.wiki/Scoring

export class ScoringSystem {
  #score;
  #startingLevel;
  #level;
  #totalLines;

  constructor(level = 0) {
    this.#score = 0;
    this.#startingLevel = level;
    this.#level = level;
    this.#totalLines = 0;
  }

  linesCleared(lineCount) {
    this.#score += this.#getPointsForLines(lineCount);
    this.#totalLines += lineCount;
    this.#updateLevel();
  }

  #getPointsForLines(lineCount) {
    const basePoints = this.#getBasePoints(lineCount);
    return basePoints * (this.#level + 1);
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

  // Levels up every with every 10 line clears
  // Works with any starting level
  #updateLevel() {
    this.#level = this.#startingLevel + Math.floor(this.#totalLines / 10);
  }

  get score() {
    return this.#score;
  }

  get level() {
    return this.#level;
  }

  get totalLines() {
    return this.#totalLines;
  }
}
