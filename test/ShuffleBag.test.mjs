import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

describe("Shuffle bag", () => {
  let bag;
  let items = ["I", "T", "L", "J", "T", "S", "Z", "O"];

  beforeEach(() => {
    bag = new ShuffleBag(items);
  });

  test("can hold items", () => {
    expect(Object.keys(bag.bag).length).to.equal(items.length);
  });

  test("items can be pulled", () => {
    bag.next();
    expect(Object.keys(bag.bag).length).to.equal(items.length - 1);
  });
});
