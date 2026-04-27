import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("Scoring system", () => {
  let scoring;

  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("scoring starts from 0", () => {
    expect(scoring.score).to.equal(0);
  });

  test("levels starts from 0", () => {
    expect(scoring.level).to.equal(0);
  });

  test("clearing 1 line on level 0 scores 40 points", () => {
    scoring.linesCleared(1);
    expect(scoring.score).to.equal(40);
  });

  test("clearing 2 lines on level 0 scores 100 points", () => {
    scoring.linesCleared(2);
    expect(scoring.score).to.equal(100);
  });

  test("clearing 3 lines on level 0 scores 300 points", () => {
    scoring.linesCleared(3);
    expect(scoring.score).to.equal(300);
  });

  test("clearing 4 lines on level 0 scores 1200 points", () => {
    scoring.linesCleared(4);
    expect(scoring.score).to.equal(1200);
  });
});
