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
  console.log(`Processing ${lines.length} lines...`);

  return 0;
};
