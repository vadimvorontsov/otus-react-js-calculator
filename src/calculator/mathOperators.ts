import { PRECISION } from "./helpers";

export type ScalarOperationType = (first: number, second: number) => number;
export type OneScalarOperationType = (first: number) => number;
export type TrigonometricOperationType = OneScalarOperationType;
export type FibonacciOperationType = (first: number) => string;

export const mul: ScalarOperationType = (
  first: number,
  second: number
): number => first * second;

export const div: ScalarOperationType = (
  first: number,
  second: number
): number => first / second;

export const add: ScalarOperationType = (
  first: number,
  second: number
): number => first + second;

export const minus: ScalarOperationType = (
  first: number,
  second: number
): number => first - second;

export const pow: ScalarOperationType = (
  first: number,
  second: number
): number => Math.pow(first, second);

export const factorial: OneScalarOperationType = (first: number): number =>
  first <= 1 ? 1 : first * factorial(first - 1);

export const square: OneScalarOperationType = (first: number): number =>
  first * first;

const degreesToRadians: OneScalarOperationType = (first: number): number =>
  Number((first * (Math.PI / 180)).toFixed(PRECISION));

export const sin: TrigonometricOperationType = (first: number): number =>
  Number(Math.sin(degreesToRadians(first)).toFixed(PRECISION));

export const cos: TrigonometricOperationType = (first: number): number =>
  Number(Math.cos(degreesToRadians(first)).toFixed(PRECISION));

export const tg: TrigonometricOperationType = (first: number): number =>
  Number(Math.tan(degreesToRadians(first)).toFixed(PRECISION));

export const ctg: TrigonometricOperationType = (first: number): number =>
  Number((1 / tg(first)).toFixed(PRECISION));

export const fib: FibonacciOperationType = (first: number): string => {
  const fibonacci: number[] = [0, 1];

  function getFibonacci() {
    for (let i = 1; i < first; i++) {
      fibonacci.push(fibonacci[i] + fibonacci[i - 1]);
    }

    return fibonacci;
  }

  return getFibonacci().toString();
};

/* Solo opeartors which shows result only */
export const complexMathOperators: { [key: string]: FibonacciOperationType } = {
  fib: fib,
};

export const trigonometricMathOperators: {
  [key: string]: TrigonometricOperationType;
} = {
  sin: sin,
  cos: cos,
  tg: tg,
  ctg: ctg,
};

export const rightMathOperators: { [key: string]: OneScalarOperationType } = {
  "!": factorial,
  "**": square,
};
export const mathOperators: { [key: string]: ScalarOperationType } = {
  "^": pow,
  "*": mul,
  "/": div,
  "+": add,
  "-": minus,
};

export const mathPriorities: number[] = [1, 2, 3, 4, 5];

/*
FIRST - trigonometry
SECOND - one argument; operator after operand
THIRD, FOURTH, FIFTH - two arguments; processes in math sequence
*/
const [FIRST, SECOND, THIRD, FOURTH, FIFTH] = mathPriorities;

export const mathOperatorsPriorities: { [key: string]: number } = {
  sin: FIRST,
  cos: FIRST,
  tg: FIRST,
  ctg: FIRST,
  "!": SECOND,
  "**": SECOND,
  "^": THIRD,
  "*": FOURTH,
  "/": FOURTH,
  "+": FIFTH,
  "-": FIFTH,
};
