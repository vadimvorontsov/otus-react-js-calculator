import {
  isBracer,
  isMathOperator,
  isNumber,
  isOneMathOperators,
  isRightMathOperators,
} from "./helpers";

export type ParsedLineType = (number | string)[];

export const parser = (line: string): ParsedLineType | null => {
  const stack: string[] = line.split(" ");

  return stack.reduce<ParsedLineType>((result, item, key) => {
    if (item === "") return result;

    const prevItem = stack[key - 1];

    const isBracerPush: boolean = isBracer(item);
    const isValidNumberPush =
      !isNumber(prevItem) && !isRightMathOperators(prevItem) && isNumber(item);

    const isValidOperatorPush =
      (isNumber(prevItem) ||
        isOneMathOperators(prevItem) ||
        isOneMathOperators(item) ||
        isBracer(prevItem)) &&
      !isNumber(item) &&
      isMathOperator(item);

    if (isValidNumberPush) {
      result.push(Number(item));
    } else if (isValidOperatorPush || isBracerPush) {
      result.push(item);
    } else {
      throw new TypeError("Unexpected string");
    }
    return result;
  }, []);
};
