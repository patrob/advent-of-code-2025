import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    globals: false,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules', 'scripts', '**/*.test.ts', '**/*.config.ts', 'runner.ts'],
    },
    testTimeout: 10000,
    hookTimeout: 10000,
  },
  resolve: {
    alias: {
      '@utils': join(__dirname, 'src/utils'),
    },
  },
});
