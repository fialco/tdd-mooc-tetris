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
});
