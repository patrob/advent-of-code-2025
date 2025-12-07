import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index.js';

const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

describe('Day 6', () => {
  describe('Part 1', () => {
    it('should solve example input', () => {
      expect(part1(exampleInput)).toBe(4277556);
    });
  });

  describe('Part 2', () => {
    it('should solve example input', () => {
      expect(part2(exampleInput)).toBe(3263827);
    });
  });
});
