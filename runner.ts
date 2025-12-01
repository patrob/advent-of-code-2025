import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function run() {
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

  try {
    const inputPath = join(dayPath, 'input.txt');
    const input = readFileSync(inputPath, 'utf-8');

    const solution = await import(`./src/day${dayStr}/index.js`);

    console.log(`\n🎄 Advent of Code 2025 - Day ${dayNum} 🎄\n`);

    console.time('Part 1');
    const result1 = solution.part1(input);
    console.timeEnd('Part 1');
    console.log('Part 1:', result1);

    console.log();

    console.time('Part 2');
    const result2 = solution.part2(input);
    console.timeEnd('Part 2');
    console.log('Part 2:', result2);

    console.log();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error running day ${dayNum}:`, error.message);
    }
    process.exit(1);
  }
}

run();
