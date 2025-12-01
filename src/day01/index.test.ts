import { describe, it, expect } from 'vitest';
import { part1, part2, rotate } from './index.js';

const exampleInput = [
      'L68',
      'L30',
      'R48',
      'L5',
      'R60',
      'L55',
      'L1',
      'L99',
      'R14',
      'L82',
    ].join('\n');

describe('Day 1', () => {
  describe('rotate function', () => {
    it('should rotate left correctly', () => {
      expect(rotate(10, { direction: 'L', distance: 3 }).value).toBe(7);
      expect(rotate(0, { direction: 'L', distance: 5 }).value).toBe(95);
      expect(rotate(10, { direction: 'L', distance: 9000 }).value).toBe(10);
    });
  });

  describe('Part 1', () => {
    it('should solve example input', () => {
      expect(part1(exampleInput)).toBe(3);
    });
  });

  describe('Part 2', () => {
    it('should solve example input', () => {
      expect(part2(exampleInput)).toBe(6);
    });
  });
});
