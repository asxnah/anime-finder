import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: '/anime-finder/',
  resolve: {
    alias: {
      // Современный и безопасный способ получения пути без __dirname
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Меняем пул на threads, чтобы избежать бага с undici на CI
    pool: 'threads',
  },
});
