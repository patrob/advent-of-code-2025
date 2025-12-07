/**
 * Common parsing utilities for Advent of Code puzzles
 */

export function parseLines(input: string): string[] {
  return input.trim().split('\n');
}

export function parseNumbers(input: string): number[] {
  return input
    .trim()
    .split(/\s+/)
    .map(Number)
    .filter((n) => !isNaN(n));
}

export function parseRange(input: string): { start: number; end: number } {
  return input
    .trim()
    .split('-')
    .map(Number)
    .reduce(
      (acc, current, index) =>
        index === 0 ? { start: current, end: 0 } : { start: acc.start, end: current },
      { start: 0, end: 0 },
    );
}

export function parseGrid<T = string>(input: string, transform?: (char: string) => T): T[][] {
  const lines = parseLines(input);
  return lines.map((line) => line.split('').map(transform ?? ((c) => c as unknown as T)));
}

export function parseNumberGrid(input: string): number[][] {
  return parseGrid(input, (c) => parseInt(c, 10));
}

export function parseSections(input: string, separator = '\n\n'): string[] {
  return input.trim().split(separator);
}

export function parseIntegers(line: string): number[] {
  const matches = line.match(/-?\d+/g);
  return matches ? matches.map(Number) : [];
}

export function parseDelimited(input: string, delimiter: string | RegExp = ','): string[][] {
  return parseLines(input).map((line) => line.split(delimiter).map((s) => s.trim()));
}

export function transpose<T>(grid: T[][]): T[][] {
  if (grid.length === 0) {
    return [];
  }
  return grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));
}
