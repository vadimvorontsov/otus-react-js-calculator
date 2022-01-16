import {
  mul,
  div,
  add,
  minus,
  pow,
  square,
  factorial,
  sin,
  cos,
  tg,
  ctg,
  fib,
} from "./mathOperators";

describe("mathOperators test cases", () => {
  it("mul 1 * 2 to equal 2", () => {
    expect(mul(1, 2)).toBe(2);
  });

  it("mul 2 * 2 to equal 4", () => {
    expect(mul(2, 2)).toBe(4);
  });

  it("div 2 / 2 to equal 1", () => {
    expect(div(2, 2)).toBe(1);
  });

  it("div 4 / 2 to equal 2", () => {
    expect(div(4, 2)).toBe(2);
  });

  it("add 4 + 2 to equal 6", () => {
    expect(add(4, 2)).toBe(6);
  });

  it("minus 4 - 2 to equal 2", () => {
    expect(minus(4, 2)).toBe(2);
  });

  it("pow 5 ^ 3 to equal 125", () => {
    expect(pow(5, 3)).toBe(125);
  });

  it("square 4 ** to equal 16", () => {
    expect(square(4)).toBe(16);
  });

  it("factorial 4 ! to equal 24", () => {
    expect(factorial(4)).toBe(24);
  });

  it("sin 45 to equal 0.70711", () => {
    expect(sin(45)).toBe(0.70711);
  });

  it("cos 60 to equal 0.5", () => {
    expect(cos(60)).toBe(0.5);
  });

  it("tg 60 to equal 5.67117", () => {
    expect(tg(80)).toBe(5.67117);
  });

  it("ctg 60 to equal 0.17633", () => {
    expect(ctg(80)).toBe(0.17633);
  });

  it("fib 6 to equal 0,1,1,2,3,5,8", () => {
    expect(fib(6)).toBe("0,1,1,2,3,5,8");
  });
});
