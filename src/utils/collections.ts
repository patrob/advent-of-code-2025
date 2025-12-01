/**
 * Collection utilities and data structures for AoC
 */

export class DefaultMap<K, V> extends Map<K, V> {
  constructor(
    private readonly defaultFactory: () => V,
    entries?: readonly (readonly [K, V])[] | null,
  ) {
    super(entries);
  }

  override get(key: K): V {
    if (!this.has(key)) {
      this.set(key, this.defaultFactory());
    }
    return super.get(key)!;
  }
}

export class Counter<T> extends DefaultMap<T, number> {
  constructor(items?: Iterable<T>) {
    super(() => 0);
    if (items) {
      for (const item of items) {
        this.increment(item);
      }
    }
  }

  increment(key: T, amount = 1): void {
    this.set(key, this.get(key) + amount);
  }

  decrement(key: T, amount = 1): void {
    this.set(key, Math.max(0, this.get(key) - amount));
  }

  mostCommon(n?: number): Array<[T, number]> {
    const sorted = [...this.entries()].sort((a, b) => b[1] - a[1]);
    return n === undefined ? sorted : sorted.slice(0, n);
  }
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function zip<T, U>(a: T[], b: U[]): Array<[T, U]> {
  const length = Math.min(a.length, b.length);
  const result: Array<[T, U]> = [];

  for (let i = 0; i < length; i++) {
    result.push([a[i]!, b[i]!]);
  }

  return result;
}

export function range(start: number, end?: number, step = 1): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}

export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

export function product(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc * n, 1);
}

export function min<T>(items: T[], keyFn: (item: T) => number): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  let minItem = items[0]!;
  let minValue = keyFn(minItem);

  for (let i = 1; i < items.length; i++) {
    const item = items[i]!;
    const value = keyFn(item);
    if (value < minValue) {
      minItem = item;
      minValue = value;
    }
  }

  return minItem;
}

export function max<T>(items: T[], keyFn: (item: T) => number): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  let maxItem = items[0]!;
  let maxValue = keyFn(maxItem);

  for (let i = 1; i < items.length; i++) {
    const item = items[i]!;
    const value = keyFn(item);
    if (value > maxValue) {
      maxItem = item;
      maxValue = value;
    }
  }

  return maxItem;
}
