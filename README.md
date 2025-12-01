# Advent of Code 2025

TypeScript solutions for [Advent of Code 2025](https://adventofcode.com/2025).

## Setup

```bash
npm install
```

## Quick Start

### Create a new day

```bash
npm run new-day <day>
# Example: npm run new-day 3
```

This scaffolds a new day with:
- `index.ts` - Solution template with utility imports
- `index.test.ts` - Test file with example cases
- `input.txt` - Empty file for puzzle input

### Workflow

1. **Create the day**: `npm run new-day 3`
2. **Add example input**: Paste from puzzle into test file
3. **Write tests first**: TDD approach with `npm run test:watch`
4. **Implement solution**: Use utility functions for common patterns
5. **Add puzzle input**: Paste into `input.txt`
6. **Run solution**: `npm start 3`

## Project Structure

```
src/
├── day01/
│   ├── index.ts       # Solution exports part1() and part2()
│   ├── index.test.ts  # Tests with example input
│   └── input.txt      # Puzzle input
├── utils/             # Shared utilities
│   ├── parsing.ts     # Input parsing helpers
│   ├── algorithms.ts  # Common algorithms
│   ├── collections.ts # Data structures
│   └── performance.ts # Performance tools
└── types.ts          # Shared type definitions
```

## Available Scripts

```bash
npm start <day>        # Run solution for a specific day
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run lint          # Check code quality
npm run format        # Format code with Prettier
npm run typecheck     # Type-check without compiling
npm run validate      # Run all checks (type, lint, format, test)
```

## Utility Functions

### Parsing (`src/utils/parsing.ts`)
- `parseLines(input)` - Split input into lines
- `parseNumbers(input)` - Extract all numbers
- `parseGrid(input)` - Parse 2D grid
- `parseIntegers(line)` - Extract integers from line
- `parseSections(input)` - Split by double newlines
- `transpose(grid)` - Transpose 2D array

### Algorithms (`src/utils/algorithms.ts`)
- `manhattan(a, b)` - Manhattan distance
- `getNeighbors(grid, point)` - Get adjacent cells
- `permutations(items)` - Generate permutations
- `combinations(items, size)` - Generate combinations
- `gcd(a, b)`, `lcm(a, b)` - Math operations
- `memoize(fn)` - Function memoization

### Collections (`src/utils/collections.ts`)
- `Counter` - Frequency counter class
- `DefaultMap` - Map with default values
- `sum(numbers)`, `product(numbers)` - Array operations
- `range(start, end, step)` - Generate number ranges
- `chunk(array, size)` - Split array into chunks
- `zip(a, b)` - Combine arrays pairwise

### Performance (`src/utils/performance.ts`)
- `PerformanceTimer` - Track execution times
- `benchmark(fn)` - Benchmark function performance
- `profileMemory(fn)` - Profile memory usage

## Development Practices

### Code Quality
- **TypeScript strict mode** - Full type safety
- **ESLint** - Code quality rules
- **Prettier** - Consistent formatting
- **Test coverage** - Track test completeness

### Clean Code Principles
- **Single Responsibility** - Small, focused functions
- **DRY** - Use utility functions, avoid repetition
- **KISS** - Simple solutions over clever ones
- **YAGNI** - Build only what's needed
- **Self-documenting** - Clear names, minimal comments

### Testing Strategy
1. **TDD Approach** - Write tests first
2. **Example cases** - From puzzle description
3. **Edge cases** - Empty input, single elements
4. **Performance tests** - For optimization

## Example Solution Pattern

```typescript
import { parseLines, parseIntegers } from '../utils/parsing.js';
import type { Solution } from '../types.js';

export const part1: Solution = (input: string): number | string => {
  const lines = parseLines(input);

  // Solution logic using utility functions

  return result;
};

export const part2: Solution = (input: string): number | string => {
  // Often builds on part1 logic

  return result;
};
```

## Performance Optimization

When solutions are slow:

1. **Measure first**: Use `PerformanceTimer` to identify bottlenecks
2. **Optimize algorithms**: Consider time complexity
3. **Use memoization**: For repeated calculations
4. **Profile memory**: For large datasets
5. **Benchmark changes**: Ensure improvements work

## Tips

- Use the `test:watch` mode for rapid TDD feedback
- The runner shows execution time for performance tracking
- Utility functions handle most common AoC patterns
- Run `npm run validate` before commits to ensure quality
- Use the scaffolding to maintain consistency

## Technologies

- **TypeScript 5.7** - Type-safe JavaScript
- **Vitest** - Fast unit testing
- **tsx** - TypeScript execution without build
- **ESLint** - Code quality
- **Prettier** - Code formatting

## License

MIT