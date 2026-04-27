// Using Original Nintendo scoring system
// More on: https://tetris.wiki/Scoring

export class ScoringSystem {
  #score;
  #level;

  constructor() {
    this.#score = 0;
    this.#level = 0;
  }

  get score() {
    return this.#score;
  }

  get level() {
    return this.#level;
  }
}
