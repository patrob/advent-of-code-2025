# Advent of Code 2025

TypeScript solutions for [Advent of Code 2025](https://adventofcode.com/2025).

## Setup

```bash
npm install
```

## Usage

### Create a new day

```bash
npm run new-day <day>
```

Example:
```bash
npm run new-day 1
```

This creates `src/day01/` with:
- `index.ts` - Template with `part1()` and `part2()` functions
- `index.test.ts` - Vitest test file with example input
- `input.txt` - Empty file for your puzzle input

### Add your inputs

1. Paste the example input from the puzzle into `src/dayXX/index.test.ts`
2. Paste your puzzle input into `src/dayXX/input.txt`

### Test your solution

```bash
npm test              # Run all tests once
npm run test:watch    # Run tests in watch mode
npm test day01        # Run tests for specific day
```

### Run a solution

```bash
npm start <day>
```

Example:
```bash
npm start 1
```

## Structure

```
src/
├── day01/
│   ├── index.ts       # Solution code
│   ├── index.test.ts  # Tests with example input
│   └── input.txt      # Puzzle input
├── day02/
│   └── ...
└── ...
```

Each day exports two functions:
- `part1(input: string)` - Solution for part 1
- `part2(input: string)` - Solution for part 2

## Workflow

1. Run `npm run new-day <day>` to scaffold the day
2. Add example input to the test file
3. Implement the solution with TDD using `npm run test:watch`
4. Add your puzzle input to `input.txt`
5. Run `npm start <day>` to get your answer

## Notes

- Solutions run directly with `tsx` - no build step needed
- Execution times are displayed for each part
- Input files are automatically read and passed to your functions
- Use Vitest for testing with example inputs from the puzzle
