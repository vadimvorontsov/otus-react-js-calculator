import { ParsedLineType, parser } from "./parser";

import {
  trigonometricCalc,
  rightOperatorCalc,
  thirdPrioritiesCalc,
  fourthPrioritiesCalc,
  fifthPrioritiesCalc,
  complexMathCalc,
} from "./engine";

import {
  isContainComplexMathOperators,
  getBracersPairIndexes,
} from "./helpers";

function calculateMath(stack: ParsedLineType): number {
  const firstPrioritiesRes = trigonometricCalc(stack);
  if (firstPrioritiesRes.length === 1) {
    return Number(firstPrioritiesRes[0]);
  }

  const secondPrioritiesRes = rightOperatorCalc(firstPrioritiesRes);
  if (secondPrioritiesRes.length === 1) {
    return Number(secondPrioritiesRes[0]);
  }

  const thirdPrioritiesRes = thirdPrioritiesCalc(secondPrioritiesRes);
  if (thirdPrioritiesRes.length === 1) {
    return Number(thirdPrioritiesRes[0]);
  }

  const fourthPrioritiesRes = fourthPrioritiesCalc(thirdPrioritiesRes);
  if (fourthPrioritiesRes.length === 1) {
    return Number(fourthPrioritiesRes[0]);
  }

  return fifthPrioritiesCalc(fourthPrioritiesRes);
}

export const runner = (line: string): number | string => {
  const stack = parser(line);

  if (stack === null || stack.length <= 1) {
    throw new TypeError("Unexpected string: empty or too small");
  }

  /* first check complex functions exist (fib, ...) */
  if (isContainComplexMathOperators(stack)) {
    if (stack.length == 2) {
      return complexMathCalc(stack);
    } else {
      throw new TypeError("Not use complex functions in expressions.");
    }
  }

  /* calculate bracers expressions from inner to outer and replace them in stack by results */
  let lastResult = 0;
  let bracersPairIndexes: [number, number] = getBracersPairIndexes(stack);

  while (bracersPairIndexes[0] != -1 && bracersPairIndexes[1] != -1) {
    const openBracerIndex: number = bracersPairIndexes[0];
    const closeBracerIndex: number = bracersPairIndexes[1];

    const expression: ParsedLineType = stack.slice(
      openBracerIndex + 1,
      closeBracerIndex
    );

    lastResult = calculateMath(expression);

    stack.splice(openBracerIndex, expression.length + 2, lastResult);
    bracersPairIndexes = getBracersPairIndexes(stack);
  }

  return calculateMath(stack);
};
