import { describe, it, expect } from 'vitest';
import { getBigJolts, getMaxJolts, getNextJolt, part1, part2 } from './index.js';

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

describe('Day 3', () => {

  it.each([
    { input: '987654321111111', expected: 98},
    { input: '811111111111119', expected: 89},
    { input: '234234234234278', expected: 78},
    { input: '818181911112111', expected: 92},
  ])('should get max jolts', (testData) => {
    const {input, expected} = testData;
    expect(getMaxJolts(input)).toBe(expected);
  });

  it.each([
    {batteries: [9,8,7,6,5,4,3,2,1,1,1,1,1,1,1], currentIndex: -1, maxIndex: 3, expected: {jolt: 9, index: 0}},
    {batteries: [9,8,7,6,5,4,3,2,1,1,1,1,1,1,1], currentIndex: 0, maxIndex: 4, expected: {jolt: 8, index: 1}},
    {batteries: [9,8,7,6,5,4,3,2,1,1,1,1,1,1,1], currentIndex: 1, maxIndex: 5, expected: {jolt: 7, index: 2}},
  ])('should get next jolt', (testData) => {
    const {batteries, currentIndex, maxIndex, expected } = testData;
    expect(getNextJolt(batteries, currentIndex, maxIndex)).toMatchObject(expected);
  });

  it.each([
    {batteries: [9,8,7,6,5,4,3,2,1,1,1,1,1,1,1], size: 12, expected: 987654321111},
    {batteries: [8,1,1,1,1,1,1,1,1,1,1,1,1,1,9], size: 12, expected: 811111111119},
  ])('should get the jolts', (testData) => {
    const { batteries, size, expected} = testData;
    expect(getBigJolts(batteries, size)).toBe(expected);
  })

  describe('Part 1', () => {
    it('should solve example input', () => {
      expect(part1(exampleInput)).toBe(357);
    });
  });

  describe('Part 2', () => {
    it('should solve example input', () => {
      expect(part2(exampleInput)).toBe(0);
    });
  });
});
