import { parser } from "./parser";

describe("Parser correct cases", () => {
  it("1 + 32", () => {
    expect(parser("1 + 32")).toEqual([1, "+", 32]);
  });

  it("11 + 3 * 22", () => {
    expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
  });

  it("1 + 32 - 2 + 2", () => {
    expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
  });

  it("sin 45 + 5", () => {
    expect(parser("sin 45 + 5")).toEqual(["sin", 45, "+", 5]);
  });

  it("sin 45 + 5 !", () => {
    expect(parser("sin 45 + 5 !")).toEqual(["sin", 45, "+", 5, "!"]);
  });

  it("fib 32", () => {
    expect(parser("fib 32")).toEqual(["fib", 32]);
  });
});

describe("Parser invalid cases", () => {
  it("1 + + 33 - 2", () => {
    expect(() => parser("1 + + 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("1 ! 33 - 2", () => {
    expect(() => parser("1 ! 33 - 2")).toThrow(TypeError("Unexpected string"));
  });

  it("sin ! 33 - 2", () => {
    expect(() => parser("sin ! 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("33 sin ! 33 - 2", () => {
    expect(() => parser("sin ! 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });
});
