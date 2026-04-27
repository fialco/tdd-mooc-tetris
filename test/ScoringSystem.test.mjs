import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

describe("Scoring system", () => {
  let scoring;

  beforeEach(() => {
    scoring = new ScoringSystem();
  });

  test("scoring starts from 0", () => {
    expect(scoring.score).to.be.equal(0);
  });
});
