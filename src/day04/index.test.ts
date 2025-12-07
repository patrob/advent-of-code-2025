import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index.js';

const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

describe('Day 4', () => {
  describe('Part 1', () => {
    it('should solve example input', () => {
      expect(part1(exampleInput)).toBe(13);
    });
  });

  describe('Part 2', () => {
    it('should solve example input', () => {
      expect(part2(exampleInput)).toBe(43);
    });
  });
});
