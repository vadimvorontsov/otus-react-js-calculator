import {
  rightOperatorCalc,
  thirdPrioritiesCalc,
  fourthPrioritiesCalc,
  fifthPrioritiesCalc,
  trigonometricCalc,
  complexMathCalc,
} from "./engine";

describe("complexMathCalc simple cases", () => {
  it("[fib, 5]", () => {
    expect(complexMathCalc(["fib", 5])).toEqual("0,1,1,2,3,5");
  });
});

describe("complexMathCalc invalid cases", () => {
  it("[sin, 5]", () => {
    expect(() => complexMathCalc(["sin", 5])).toThrow(
      TypeError("Unexpected item for complex math!")
    );
  });

  it("[5, **]", () => {
    expect(() => complexMathCalc([5, "**"])).toThrow(
      TypeError("Unexpected stack for complex math!")
    );
  });

  it("[5, ^, 5]", () => {
    expect(() => complexMathCalc([5, "^", 5])).toThrow(
      TypeError("Unexpected stack for complex math!")
    );
  });

  it("[5, /, 5]", () => {
    expect(() => complexMathCalc([5, "/", 5])).toThrow(
      TypeError("Unexpected stack for complex math!")
    );
  });

  it("[5, +, 5]", () => {
    expect(() => complexMathCalc([5, "+", 5])).toThrow(
      TypeError("Unexpected stack for complex math!")
    );
  });
});

describe("firstPrioritiesCalc simple cases", () => {
  it("[sin, 90]", () => {
    expect(trigonometricCalc(["sin", 90])).toEqual([1]);
  });

  it("[cos, 90]", () => {
    expect(trigonometricCalc(["cos", 180])).toEqual([-1]);
  });

  it("[tg, 18]", () => {
    expect(trigonometricCalc(["tg", 18])).toEqual([0.32492]);
  });

  it("[ctg, 18]", () => {
    expect(trigonometricCalc(["ctg", 18])).toEqual([3.07768]);
  });
});

describe("firstPrioritiesCalc mixed with lower priorities cases", () => {
  it("[sin, 90, +, 10, *, 10, -, 4, !, +, cos, 180, ^, 2]", () => {
    expect(
      trigonometricCalc([
        "sin",
        90,
        "+",
        10,
        "*",
        10,
        "-",
        4,
        "!",
        "+",
        "cos",
        180,
        "^",
        2,
      ])
    ).toEqual([1, "+", 10, "*", 10, "-", 4, "!", "+", -1, "^", 2]);
  });
});

describe("secondPrioritiesCalc simple cases", () => {
  it("[3, **]", () => {
    expect(rightOperatorCalc([3, "**"])).toEqual([9]);
  });

  it("[32, !]", () => {
    expect(rightOperatorCalc([6, "!"])).toEqual([720]);
  });
});

describe("secondPrioritiesCalc mixed with lower priorities cases", () => {
  it("[10, *, 10, -, 4, !, 3, ^, 2]", () => {
    expect(
      rightOperatorCalc([10, "*", 10, "-", 4, "!", "+", 3, "^", 2])
    ).toEqual([10, "*", 10, "-", 24, "+", 3, "^", 2]);
  });
});

describe("thirdPrioritiesCalc simple cases", () => {
  it("[5, ^, 3]", () => {
    expect(thirdPrioritiesCalc([5, "^", 3])).toEqual([125]);
  });
});

describe("thirdPrioritiesCalc mixed with lower priorities cases", () => {
  it("[10, *, 10, -, 4, +, -2, ^, 2]", () => {
    expect(thirdPrioritiesCalc([10, "*", 10, "-", 4, "+", -2, "^", 2])).toEqual(
      [10, "*", 10, "-", 4, "+", 4]
    );
  });
});

describe("fourthPrioritiesCalc simple cases", () => {
  it("[1, * 32]", () => {
    expect(fourthPrioritiesCalc([1, "*", 32])).toEqual([32]);
  });

  it("[32, /, 32]", () => {
    expect(fourthPrioritiesCalc([32, "/", 32])).toEqual([1]);
  });
});

describe("fourthPrioritiesCalc mixed with lower priorities cases", () => {
  it("[10, *, 10, -, 4, +, -2]", () => {
    expect(fourthPrioritiesCalc([10, "*", 10, "-", 4, "+", -2])).toEqual([
      100,
      "-",
      4,
      "+",
      -2,
    ]);
  });
});

describe("fifthPrioritiesCalc simple cases", () => {
  it("[1, +, 32]", () => {
    expect(fifthPrioritiesCalc([1, "+", 32])).toEqual(33);
  });

  it("[32, -, 31]", () => {
    expect(fifthPrioritiesCalc([32, "-", 31])).toEqual(1);
  });
});
