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
- `input.txt` - Empty file for your puzzle input

### Add your puzzle input

Paste your puzzle input into the corresponding `src/dayXX/input.txt` file.

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
│   ├── index.ts    # Solution code
│   └── input.txt   # Puzzle input
├── day02/
│   └── ...
└── ...
```

Each day exports two functions:
- `part1(input: string)` - Solution for part 1
- `part2(input: string)` - Solution for part 2

## Notes

- Solutions run directly with `tsx` - no build step needed
- Execution times are displayed for each part
- Input files are automatically read and passed to your functions
