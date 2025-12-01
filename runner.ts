import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { PerformanceTimer } from './src/utils/performance.js';
import type { DaySolution } from './src/types.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(__filename);

async function run(): Promise<void> {
  const dayArg = process.argv[2];

  if (!dayArg) {
    console.error('Usage: npm start <day>');
    console.error('Example: npm start 1');
    process.exit(1);
  }

  const dayNum = parseInt(dayArg, 10);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
    console.error('Day must be a number between 1 and 25');
    process.exit(1);
  }

  const dayStr = dayNum.toString().padStart(2, '0');
  const dayPath = join(__dirname, 'src', `day${dayStr}`);

  if (!existsSync(dayPath)) {
    console.error(`Day ${dayNum} does not exist. Create it with: npm run new-day ${dayNum}`);
    process.exit(1);
  }

  try {
    const inputPath = join(dayPath, 'input.txt');
    if (!existsSync(inputPath)) {
      console.error(`Input file not found: ${inputPath}`);
      console.error('Please add your puzzle input to this file');
      process.exit(1);
    }

    const input = readFileSync(inputPath, 'utf-8');
    if (input.trim() === '') {
      console.warn('Warning: input.txt is empty. Add your puzzle input!');
    }

    const solution = (await import(`./src/day${dayStr}/index.js`)) as DaySolution;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!solution.part1 || !solution.part2) {
      console.error('Solution must export part1 and part2 functions');
      process.exit(1);
    }

    console.log(`\n🎄 Advent of Code 2025 - Day ${dayNum} 🎄\n`);

    const timer = new PerformanceTimer();

    const result1 = timer.measure('Part 1', () => solution.part1(input));
    console.log('Part 1:', result1);

    console.log();

    const result2 = timer.measure('Part 2', () => solution.part2(input));
    console.log('Part 2:', result2);

    console.log();
    timer.printReport();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error running day ${dayNum}:`, error.message);
      if (error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
      }
    } else {
      console.error(`Unknown error running day ${dayNum}:`, error);
    }
    process.exit(1);
  }
}

run().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
