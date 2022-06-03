const hello = () => "Hello world!";
import * as assert from "assert";
import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

function greet(name) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US");
  return `Hello, ${name}! Today is ${formattedDate}`;
}

describe("testing the greeter", function () {
  it("checks the greet function", function () {
    const newDate = new Date(2022, 4, 31);
    const clock = sinon.useFakeTimers(newDate);
    assert.equal(greet("Alice"), "Hello, Alice! Today is 5/31/2022");
    clock.restore();
  });
});

describe("Hello function", () => {
  it("should return hello world", () => {
    const result = hello();
    expect(result).to.equal("Hello world!");
  });
});

describe("Array", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
