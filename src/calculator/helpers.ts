import {
  complexMathOperators,
  mathOperators,
  rightMathOperators,
  trigonometricMathOperators,
} from "./mathOperators";
import { ParsedLineType } from "./parser";

export const PRECISION = 5;

export const isNumber = (item: string | undefined): boolean =>
  !isNaN(Number(item)) && item != "";

export const isOneMathOperators = (operator: string): boolean => {
  const oneOperator: string[] = ["**", "!", "ctg", "tg", "cos", "sin", "fib"];

  return oneOperator.includes(operator);
};

export const isRightMathOperators = (operator: string): boolean => {
  const oneOperator: string[] = ["**", "!"];

  return oneOperator.includes(operator);
};

export const isMathOperator = (operator: string): boolean => {
  return (
    mathOperators.hasOwnProperty(operator) ||
    rightMathOperators.hasOwnProperty(operator) ||
    trigonometricMathOperators.hasOwnProperty(operator) ||
    complexMathOperators.hasOwnProperty(operator)
  );
};

export const isContainComplexMathOperators = (
  line: ParsedLineType
): boolean => {
  const complexOperators: string[] = Object.keys(complexMathOperators);
  for (const complexOperator of complexOperators) {
    if (line.includes(complexOperator)) {
      return true;
    }
  }

  return false;
};

// export const getAllIndexes = (stack: ParsedLineType, element: string): number[] => {
//     let indexes: number[] = [];
//     for (let i: number = 0; i < stack.length; i++) {
//         if (stack[i] === element) {
//             indexes.push(i);
//         }
//     }

//     return indexes;
// }

export const getBracersPairIndexes = (
  bracerExpression: ParsedLineType
): [number, number] => {
  const lastOpenBracerIndex: number = bracerExpression.lastIndexOf("(");
  if (lastOpenBracerIndex === -1) return [-1, -1];

  const stackAfterOpenBrace: ParsedLineType = bracerExpression.slice(
    lastOpenBracerIndex,
    bracerExpression.length
  );
  const nextCloseBracerIndex: number =
    stackAfterOpenBrace.indexOf(")") + lastOpenBracerIndex;
  if (nextCloseBracerIndex === -1) return [-1, -1];

  return [lastOpenBracerIndex, nextCloseBracerIndex];
};

export const isBracer = (item: string | undefined): boolean =>
  !isNumber(item) && (item === "(" || item === ")");
