import { parseLines } from '../utils/parsing.js';
import type { Solution } from '../types.js';

export const part1: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  const numbers = lines.slice(0, lines.length - 1).map(line => line.match(/[0-9]+/g)!.map(String).map(Number));
  const correctedNumbers: number[][] = [];
  for (let i = 0; i < numbers[0].length; i++) {
    const newArray = [];
    for (let j = 0; j < numbers.length; j++) {
      newArray.push(numbers[j][i]);
    }
    correctedNumbers.push(newArray);
  }
  const operations = lines[lines.length -1].match(/\S/g)!.map(String);

  return operations.reduce((acc, current, index) => {
    let mathOp: (a: number, b: number) => number;
    let innerStart: number;
    if (current === "+") {
      mathOp = (a, b) => a + b;
      innerStart = 0;
    } else {
      mathOp = (a, b) => a * b;
      innerStart = 1;
    }

    return acc + correctedNumbers[index].reduce((innerAcc, innerCurrent) => mathOp(innerAcc, innerCurrent), innerStart);
  }, 0);
};

export const part2: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  const numRows = lines.length;
  const maxCols = Math.max(...lines.map((l) => l.length));
  const paddedLines = lines.map((l) => l.padEnd(maxCols));

  let total = 0;
  let currentNumbers: number[] = [];
  let currentOperator: string | null = null;

  const processCurrentProblem = () => {
    if (currentOperator && currentNumbers.length > 0) {
      const result =
        currentOperator === '+'
          ? currentNumbers.reduce((a, b) => a + b, 0)
          : currentNumbers.reduce((a, b) => a * b, 1);
      total += result;
    }
    currentNumbers = [];
    currentOperator = null;
  };

  for (let col = maxCols - 1; col >= 0; col--) {
    const columnChars = paddedLines.map((l) => l[col] || ' ');
    const bottomChar = columnChars[numRows - 1];
    const digitChars = columnChars.slice(0, numRows - 1);
    const digitString = digitChars.join('').replace(/ /g, '');

    const isOperator = bottomChar === '+' || bottomChar === '*';
    const isAllSpaces = digitString === '' && bottomChar === ' ';

    if (isAllSpaces) {
      processCurrentProblem();
    } else {
      if (digitString) {
        currentNumbers.push(parseInt(digitString, 10));
      }
      if (isOperator) {
        currentOperator = bottomChar;
      }
    }
  }

  processCurrentProblem();

  return total;
};
