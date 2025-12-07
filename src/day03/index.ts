import { parseLines } from '../utils/parsing.js';
import type { Solution } from '../types.js';

export const getFirstJolt = (input: string): { jolt: number; index: number } => {
  const batteries = input.split('').map((i) => parseInt(i));
  return batteries.reduce(
    (acc, current, index) => (index < batteries.length - 1 && acc.jolt < current ? { jolt: current, index } : acc),
    { jolt: -1, index: -1 },
  );
};

export const getSecondJolt = (
  input: string,
  firstJolt: { jolt: number; index: number },
): { jolt: number; index: number } => {
  const batteries = input.split('').map((i) => parseInt(i));
  return batteries.reduce(
    (acc, current, index) => (index > firstJolt.index && acc.jolt < current ? { jolt: current, index } : acc),
    { jolt: -1, index: -1 },
  );
};

export const getNextJolt = (batteries: number[], currentIndex: number, maxIndex: number): {jolt: number, index: number } => {
  let jolt = -1;
  let index = -1;
  for (let i = currentIndex + 1; i <= maxIndex; i++) {
    if ( batteries[i]! > jolt) {
      jolt = batteries[i]!;
      index = i;
    }
  }
  return { jolt, index};
}

export const getBigJolts = (batteries: number[], size: number): number => {
  const jolts: number[] = [];
  let index = -1;
  for (let i = 0; i < size; i++) {
    const jolt = getNextJolt(batteries, index, batteries.length - (size - i));
    jolts.push(jolt.jolt);
    index = jolt.index;
  }
  return parseInt(jolts.join(""));
}

export const getJolts = (input: string, numJolts: number): number[] => {
  const batteries = input.split('').map((i) => parseInt(i));
  const jolts: number[] = [-1];
  // let firstJoltIndex = -1;
  for (let i = 0; i < batteries.length - numJolts; i++) {
    if (batteries[i]! > jolts[0]!) {
      jolts[0] = batteries[0]!;
      // firstJoltIndex = i;
    }
  }
  return jolts;
}

export const getMaxJolts = (input: string): number => {
  const firstJolt = getFirstJolt(input);

  const secondJolt = getSecondJolt(input, firstJolt);

  const maxJolts = parseInt(`${firstJolt.jolt}${secondJolt.jolt}`);
  return maxJolts;
};

export const part1: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  console.log(`Processing ${lines.length} lines...`);
  const maxJolts = lines.reduce((acc, line) => acc + getMaxJolts(line), 0);

  return maxJolts;
};

export const part2: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  console.log(`Processing ${lines.length} lines...`);
  const maxJolts = lines.reduce((acc, line) => acc + getBigJolts(line.split("").map(i => parseInt(i)), 12), 0);

  return maxJolts;
};
