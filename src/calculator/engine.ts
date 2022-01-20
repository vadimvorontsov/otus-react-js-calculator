import { ParsedLineType } from "./parser";
import { isNumber } from "./helpers";
import {
  mathOperators,
  mathPriorities,
  mathOperatorsPriorities,
  complexMathOperators,
  trigonometricMathOperators,
  rightMathOperators,
} from "./mathOperators";

const [FIRST, SECOND, THIRD, FOURTH, FIFTH] = mathPriorities;

export const complexMathCalc = (stack: ParsedLineType): string => {
  const item = stack[0];
  const value = stack[1];

  if (!isNumber(String(item))) {
    if (!complexMathOperators[item]) {
      throw new TypeError("Unexpected item for complex math!");
    }
    return complexMathOperators[item](Number(value));
  } else {
    throw new TypeError("Unexpected stack for complex math!");
  }
};

export const trigonometricCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FIRST) {
      if (!trigonometricMathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -1),
        trigonometricMathOperators[item](Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const rightOperatorCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const item = result[result.length - 1];

    if (
      !isNumber(String(nextItem)) &&
      mathOperatorsPriorities[nextItem] === SECOND
    ) {
      if (!rightMathOperators[nextItem]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -1),
        rightMathOperators[nextItem](Number(item)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const thirdPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === THIRD) {
      if (!mathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const fourthPrioritiesCalc = (stack: ParsedLineType): ParsedLineType =>
  stack.reduce<ParsedLineType>((result, nextItem) => {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FOURTH) {
      if (!mathOperators[item]) {
        throw new TypeError("Unexpected stack!");
      }
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
    return result;
  }, []);

export const fifthPrioritiesCalc = (stack: ParsedLineType): number =>
  stack.reduce<number>((result, nextItem, key) => {
    const item = stack[key - 1];

    if (
      mathOperatorsPriorities[item] === FIRST ||
      mathOperatorsPriorities[item] === SECOND ||
      mathOperatorsPriorities[item] === THIRD ||
      mathOperatorsPriorities[item] === FOURTH
    ) {
      throw new TypeError("Unexpected stack!");
    }

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === FIFTH) {
      result = mathOperators[item](Number(result), Number(nextItem));
    }
    return result;
  }, Number(stack[0]));
