import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index.js';

const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe('Day 5', () => {
  describe('Part 1', () => {
    it('should solve example input', () => {
      expect(part1(exampleInput)).toBe(3);
    });
  });

  describe('Part 2', () => {
    it('should solve example input', () => {
      expect(part2(exampleInput)).toBe(14);
    });
  });
});
