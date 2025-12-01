import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dayArg = process.argv[2];

if (!dayArg) {
  console.error('Usage: npm run new-day <day>');
  console.error('Example: npm run new-day 1');
  process.exit(1);
}

const dayNum = parseInt(dayArg, 10);
if (isNaN(dayNum) || dayNum < 1 || dayNum > 25) {
  console.error('Day must be a number between 1 and 25');
  process.exit(1);
}

const dayStr = dayNum.toString().padStart(2, '0');
const dayDir = join(__dirname, '..', 'src', `day${dayStr}`);

if (existsSync(dayDir)) {
  console.error(`Day ${dayNum} already exists at ${dayDir}`);
  process.exit(1);
}

mkdirSync(dayDir, { recursive: true });

const template = `export function part1(input: string): number | string {
  const lines = input.trim().split('\\n');

  // TODO: Implement solution
  return 0;
}

export function part2(input: string): number | string {
  const lines = input.trim().split('\\n');

  // TODO: Implement solution
  return 0;
}
`;

writeFileSync(join(dayDir, 'index.ts'), template);
writeFileSync(join(dayDir, 'input.txt'), '');

console.log(`✨ Created day ${dayNum} at ${dayDir}`);
console.log(`📝 Add your input to: src/day${dayStr}/input.txt`);
console.log(`🚀 Run with: npm start ${dayNum}`);
