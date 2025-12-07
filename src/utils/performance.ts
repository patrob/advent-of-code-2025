/**
 * Performance measurement utilities for optimization
 */

export interface TimerResult {
  name: string;
  duration: number;
  result: unknown;
}

export class PerformanceTimer {
  private readonly timings: TimerResult[] = [];

  measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const duration = performance.now() - start;

    this.timings.push({ name, duration, result });
    return result;
  }

  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const duration = performance.now() - start;

    this.timings.push({ name, duration, result });
    return result;
  }

  getTimings(): TimerResult[] {
    return [...this.timings];
  }

  printReport(): void {
    console.log('\nPerformance Report:');
    console.log('===================');

    for (const timing of this.timings) {
      const ms = timing.duration.toFixed(3);
      const seconds = (timing.duration / 1000).toFixed(3);
      console.log(`${timing.name}: ${ms}ms (${seconds}s)`);
    }

    const total = this.timings.reduce((sum, t) => sum + t.duration, 0);
    console.log('-------------------');
    console.log(`Total: ${total.toFixed(3)}ms (${(total / 1000).toFixed(3)}s)`);
  }

  clear(): void {
    this.timings.length = 0;
  }
}

export function benchmark<T>(
  _label: string,
  fn: () => T,
  iterations = 1000,
): { mean: number; median: number; min: number; max: number; result: T } {
  const times: number[] = [];
  let result: T;

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    result = fn();
    times.push(performance.now() - start);
  }

  times.sort((a, b) => a - b);

  return {
    mean: times.reduce((a, b) => a + b, 0) / times.length,
    median: times[Math.floor(times.length / 2)],
    min: times[0],
    max: times[times.length - 1],
    result: result!,
  };
}

export function profileMemory<T>(label: string, fn: () => T): T {
  const before = process.memoryUsage();
  const result = fn();
  const after = process.memoryUsage();

  console.log(`Memory usage for ${label}:`);
  console.log(`  Heap: ${((after.heapUsed - before.heapUsed) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  RSS: ${((after.rss - before.rss) / 1024 / 1024).toFixed(2)} MB`);

  return result;
}
