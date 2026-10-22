// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and error handling', () => {
  test('Handle empty login submission', async ({ page }) => {
    // 1. On a fresh page leave both fields empty and activate Login.
    await page.goto('http://localhost:8081/');
    const loginButton = page.getByRole('button', { name: 'Login' });
    await loginButton.click();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:8081/');
    await expect(page.getByRole('heading', { name: 'Employee Portal' })).toBeVisible();

    // 2. Reload to reset the page and submit with only username entered, then reset and submit with only password entered.
    await page.getByRole('textbox', { name: 'Enter Username' }).fill('incomplete-test-user');
    await loginButton.click();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();

    await page.goto('http://localhost:8081/');
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('incomplete-test-pass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:8081/');
  });
});
