import type { Solution } from '../types.js';
import { Range } from './models.js';

export const parseRange = (input: string): Range => {
  const split = input.split('-');
  return { first: parseInt(split[0]!), last: parseInt(split[1]!) };
};

export const getInvalidIds = (range: Range): number[] => {
  const length = range.last - range.first + 1;
  const resultArray = [];
  for (let i = 0; i < length; i++) {
    const id = range.first + i;
    if (!isIdValid(id.toString())) {
      resultArray.push(id);
    }
  }
  return resultArray;
};

const numberToStringArray = (input: number): string[] => input.toString().split('');
const numberToNumberArray = (input: number): number[] =>
  numberToStringArray(input).map((i) => parseInt(i));
const sum = (numbers: number[]): number =>
  numbers.reduce((sum: number, current: number) => sum + current, 0);

export const isSequentiallyInvalidId = (input: number): boolean => {
  if (input.toString().length <= 2) return false;

  const numberArray: number[] = numberToNumberArray(input);
  if (input.toString().replaceAll(numberArray[0]!.toString(), '').length === 0) return true;
  for (let i = 2; i <= numberArray.length - 1; i++) {
    const search = numberArray.slice(0, i);
    const searchText = search.join('');
    if (input.toString().replaceAll(searchText, '').length === 0) {
      return true;
    }
  }
  return false;
};

export const getSequentiallyInvalidIds = (range: Range): number[] => {
  const length = range.last - range.first + 1;
  const resultArray = [];
  for (let i = 0; i < length; i++) {
    const id = range.first + i;
    if (isSequentiallyInvalidId(id)) {
      resultArray.push(id);
    }
  }
  return resultArray;
};

export const isIdValid = (input: string): boolean => {
  if (input.slice(0, input.length / 2) === input.slice(input.length / 2, input.length))
    return false;
  return true;
};

export const part1: Solution = (input: string): number | string => {
  const lines = input.split(',');
  let acc = 0;
  lines.forEach((line) => {
    const range = parseRange(line);
    const ids = getInvalidIds(range);
    acc += sum(ids);
  });

  return acc;
};

export const part2: Solution = (input: string): number | string => {
  const lines = input.split(',');
  let acc = 0;
  lines.forEach((line) => {
    const range = parseRange(line);
    const ids: number[] = [];
    ids.push(...getInvalidIds(range));
    getSequentiallyInvalidIds(range).forEach((id) => {
      if (!ids.includes(id)) ids.push(id);
    });
    // console.log(ids.sort((a, b) => a < b ? -1 : 1));
    acc += sum(ids);
  });

  return acc;
};
