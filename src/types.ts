/**
 * Common type definitions for AoC solutions
 */

export type Solution = (input: string) => number | string;

export interface DaySolution {
  part1: Solution;
  part2: Solution;
}

export type Grid<T = string> = T[][];
export type NumberGrid = number[][];
export type BooleanGrid = boolean[][];
