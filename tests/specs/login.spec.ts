import { test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/login';

const credentials = dotenv.parse(
  readFileSync(path.resolve(__dirname, '../../.env.sit'), 'utf8'),
);
const normalizeCredential = (value: string | undefined) =>
  value?.trim().replace(/^(['"])(.*)\1;?$/, '$2');
const username = normalizeCredential(credentials.User_Name);
const password = normalizeCredential(credentials.Password);

if (!username || !password) {
  throw new Error('User_Name or Password is missing from .env.sit');
}

test('Login successful with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login(username, password);
  await loginPage.expectLoggedIn();
});