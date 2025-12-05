import { describe, it, expect } from 'vitest';
import { getInvalidIds, isSequentiallyInvalidId, isIdValid, part1, part2, getSequentiallyInvalidIds } from './index.js';

const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

describe('Day 2', () => {
  describe('isIdValid', () => {
    it.each([
      '111'
    ])('should be valid if no repeats', (input: string) => {
      expect(isIdValid(input)).toBeTruthy();
    });

    it.each([
      '11',
      '22',
      '1010',
      '1188511885',
      '222222'
    ])('should be invalid if repeats', (input: string) => {
      expect(isIdValid(input)).toBeFalsy();
    });
  });

  describe('getInvalidIds', () => {
    it.each([
      {range: {first: 11, last: 22}, expected: [11, 22]}
    ])('should get invalid ids from range', (testData) => {
      const { range, expected} = testData;
      expect(getInvalidIds(range)).toMatchObject(expected);
    })
  });

  describe('isSequentiallyInvalidId', () => {
    it.each([
      111,
      11111,
    ])('should get all 1\'s as invalid if 3 or more', (input) => {
      expect(isSequentiallyInvalidId(input)).toBeTruthy();
    });

    it.each([
      1212,
      565656
    ])('should get get repeated sequential ids', (input) => {
      expect(isSequentiallyInvalidId(input)).toBeTruthy();
    })
  });

  describe('getSequentiallyInvalidIds', () => {
    it.each([
      {range: {first: 95, last: 115}, expected: 111}
    ])('should return expected value', (testData) => {
      const { range, expected} = testData;
      expect(getSequentiallyInvalidIds(range).includes(expected)).toBeTruthy();
    });

    it.each([
      {range: {first: 95, last: 115}, unexpected: 102}
    ])('should not return unexpected value', (testData) => {
      const { range, unexpected} = testData;
      expect(getSequentiallyInvalidIds(range).includes(unexpected)).toBeFalsy();
    });
  });

  describe('Part 1', () => {
    it('should solve example input', () => {
      expect(part1(exampleInput)).toBe(1227775554);
    });
  });

  describe('Part 2', () => {
    it('should solve example input', () => {
      expect(part2(exampleInput)).toBe(4174379265);
    });
  });
});
