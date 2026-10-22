// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and error handling', () => {
  test('Handle whitespace and padded credentials', async ({ page }) => {
    // 1. Submit username and password fields containing only spaces.
    await page.goto('http://192.168.1.5:8080/');
    await page.getByRole('textbox', { name: 'Enter Username' }).fill('   ');
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('   ');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();

    // 2. Submit a designated test username with leading/trailing spaces and a deliberately invalid password with surrounding spaces.
    await page.goto('http://192.168.1.5:8080/');
    await page.getByRole('textbox', { name: 'Enter Username' }).fill(' padded-test-user ');
    await page.getByRole('textbox', { name: 'Enter Password' }).fill(' padded-invalid-pass ');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();
    await expect(page).toHaveURL('http://192.168.1.5:8080/');
  });
});
