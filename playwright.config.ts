import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
const ENV = process.env.TEST_ENV || 'sit';
dotenv.config({
  path: path.resolve(__dirname, `.env.${ENV}`),
  override: true,
});
console.log({
  DB_USER_length: process.env.DB_USER?.length,
  DB_PASS_length: process.env.DB_PASS?.length,
  DB_PASS_hasHash: process.env.DB_PASS?.includes('#'),
});
export default defineConfig({
  testDir: './tests/specs',
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'https://business-sit2.abbank.vn/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on',
  },
  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    
  ],
});