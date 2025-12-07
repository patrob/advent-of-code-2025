import { parseLines, parseRange } from '../utils/parsing.js';
import type { Solution } from '../types.js';
import { withinRange } from '@utils/collections.js';

export type Range = {
  start: number;
  end: number;
};

export const part1: Solution = (input: string): number | string => {
  const lines = parseLines(input);

  const ranges = lines.filter((line) => line.includes('-')).map(parseRange);
  const ingredientIds = lines
    .filter((line) => line.trim().length > 0 && !line.includes('-'))
    .map(Number);

  return ingredientIds.reduce(
    (acc, current) =>
      (acc +=
        ranges.filter((range) => withinRange(range.start, range.end, current)).length > 0 ? 1 : 0),
    0,
  );
};

export const hasOverlappingRange = (ranges: Range[]): boolean => {
  let overlap = false;
  ranges.forEach((range, index) => {
    const foundIndex = ranges.findIndex(
      (range2) =>
        withinRange(range.start, range.end, range2.start) ||
        withinRange(range.start, range.end, range2.end),
    );
    if (foundIndex > -1 && foundIndex !== index) {
      overlap = true;
      return;
    }
  });
  return overlap;
};

export const part2: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  let ranges: Range[] = lines.filter((line) => line.includes('-')).map(parseRange);
  while (hasOverlappingRange(ranges)) {
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      const overlapIndex = ranges.findIndex(
        (rng, index) =>
          i !== index &&
          (withinRange(range.start, range.end, rng.start) ||
            withinRange(range.start, range.end, rng.end)),
      );
      if (overlapIndex > -1) {
        ranges[i].start = Math.min(range.start, ranges[overlapIndex].start);
        ranges[i].end = Math.max(range.end, ranges[overlapIndex].end);
        ranges = [...ranges.slice(0,overlapIndex), ...ranges.slice(overlapIndex + 1)];
        break;
      }
    }
  }
  return ranges.reduce((acc, current) => acc + (current.end - current.start + 1), 0);
};
