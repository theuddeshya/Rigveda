/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

// Vitest configuration. This file intentionally only contains test-related
// config (it's separate from `vite.config.ts` which configures the dev server
// and build). Using `vitest/config` ensures the `test` property is recognized
// by the TypeScript types and avoids the error seen previously.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./test/setup.ts'],
      pool: 'forks',
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
      maxWorkers: 1,
      minWorkers: 1,
    },
  })
);