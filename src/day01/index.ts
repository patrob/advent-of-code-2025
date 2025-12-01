import { parseLines } from '../utils/parsing.js';
import type { Solution } from '../types.js';

export type RotationEvent = {
  direction: 'L' | 'R';
  distance: number;
}

export type RotationResult = {
  value: number;
  boundaryCrossings: number;
}

export type Answers = {
  zeros: number;
  crossings: number;
}

export const circularBoundary = (value: number, boundary: number): number => {
  return value < 0 ? boundary + value : value % boundary;
}

export const rotate = (current: number, event: RotationEvent): RotationResult => {
  const { direction, distance } = event;
  let boundaryCrossings = 0;
  for(let i = 0; i < distance; i++) {
    const next = direction === 'L' ? current - 1 : current + 1;
    if (next === 0 || next === 100) {
      boundaryCrossings++;
      current = 0;
    }
    else if (next < 0) {
      current = 99;
    } else {
      current = next;
    }
  }
  return { value: current, boundaryCrossings };
}

export const solve = (lines: string[]): Answers => {
  let zeros = 0;
  let crossings = 0;
  lines.reduce((acc, line) => {
    const direction = line.charAt(0) as 'L' | 'R';
    const distance = parseInt(line.slice(1), 10);
    const result = rotate(acc, { direction, distance });
    if (result.value === 0) {
      zeros++;
    }
    crossings += result.boundaryCrossings;
    return result.value;
  }, 50);
  return { zeros, crossings };
}

export const part1: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  return solve(lines).zeros;
};

export const part2: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  return solve(lines).crossings;
};
