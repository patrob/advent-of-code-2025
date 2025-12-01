/**
 * Common algorithms and data structures for Advent of Code
 */

export interface Point {
  x: number;
  y: number;
}

export interface Point3D extends Point {
  z: number;
}

export const DIRECTIONS_4 = [
  { x: 0, y: -1 }, // Up
  { x: 1, y: 0 }, // Right
  { x: 0, y: 1 }, // Down
  { x: -1, y: 0 }, // Left
] as const;

export const DIRECTIONS_8 = [
  ...DIRECTIONS_4,
  { x: -1, y: -1 }, // Up-Left
  { x: 1, y: -1 }, // Up-Right
  { x: -1, y: 1 }, // Down-Left
  { x: 1, y: 1 }, // Down-Right
] as const;

export function manhattan(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function euclidean(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export function inBounds<T>(grid: T[][], point: Point): boolean {
  return point.y >= 0 && point.y < grid.length && point.x >= 0 && point.x < (grid[0]?.length ?? 0);
}

export function getNeighbors<T>(grid: T[][], point: Point, diagonal = false): Point[] {
  const directions = diagonal ? DIRECTIONS_8 : DIRECTIONS_4;
  return directions
    .map((d) => ({ x: point.x + d.x, y: point.y + d.y }))
    .filter((p) => inBounds(grid, p));
}

export function* permutations<T>(items: T[]): Generator<T[]> {
  if (items.length <= 1) {
    yield items;
    return;
  }

  for (let i = 0; i < items.length; i++) {
    const current = items[i]!;
    const remaining = [...items.slice(0, i), ...items.slice(i + 1)];

    for (const perm of permutations(remaining)) {
      yield [current, ...perm];
    }
  }
}

export function* combinations<T>(items: T[], size: number): Generator<T[]> {
  if (size === 0) {
    yield [];
    return;
  }

  if (items.length < size) {
    return;
  }

  for (let i = 0; i <= items.length - size; i++) {
    const first = items[i]!;
    const rest = items.slice(i + 1);

    for (const combo of combinations(rest, size - 1)) {
      yield [first, ...combo];
    }
  }
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  keyFn: (...args: TArgs) => string = (...args) => JSON.stringify(args),
): (...args: TArgs) => TResult {
  const cache = new Map<string, TResult>();

  return (...args: TArgs): TResult => {
    const key = keyFn(...args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
