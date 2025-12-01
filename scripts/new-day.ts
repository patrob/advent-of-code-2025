import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
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

const template = `import { parseLines } from '../utils/parsing.js';
import type { Solution } from '../types.js';

export const part1: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  console.log(\`Processing \${lines.length} lines...\`);

  return 0;
};

export const part2: Solution = (input: string): number | string => {
  const lines = parseLines(input);
  console.log(\`Processing \${lines.length} lines...\`);

  return 0;
};
`;

const testTemplate = `import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index.js';

const exampleInput = \`\`;

describe('Day ${dayNum}', () => {
  describe('Part 1', () => {
    it('should solve example input', () => {
      expect(part1(exampleInput)).toBe(0);
    });

    it.skip('should handle edge cases', () => {
      expect(part1('')).toBe(0);
    });
  });

  describe('Part 2', () => {
    it('should solve example input', () => {
      expect(part2(exampleInput)).toBe(0);
    });
  });
});
`;

writeFileSync(join(dayDir, 'index.ts'), template);
writeFileSync(join(dayDir, 'index.test.ts'), testTemplate);
writeFileSync(join(dayDir, 'input.txt'), '');

console.log(`✨ Created day ${dayNum} at ${dayDir}`);
console.log(`📝 Add your input to: src/day${dayStr}/input.txt`);
console.log(`🧪 Add example input to: src/day${dayStr}/index.test.ts`);
console.log(`🚀 Run with: npm start ${dayNum}`);
console.log(`🧪 Test with: npm test day${dayStr}`);
