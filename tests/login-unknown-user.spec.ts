// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and error handling', () => {
  test('Reject an unknown username', async ({ page }) => {
    // 1. Enter a syntactically ordinary but nonexistent test username and a non-sensitive invalid password, then activate Login.
    await page.goto('http://localhost:8081/');
    await page.getByRole('textbox', { name: 'Enter Username' }).fill('unknown-test-user');
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('unknown-test-pass');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();
    await expect(page).toHaveURL('http://192.168.1.5:8080/');
    await expect(page.getByRole('heading', { name: 'Employee Portal' })).toBeVisible();
  });
});
