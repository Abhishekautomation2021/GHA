// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and error handling', () => {
  test('Handle special characters and long input safely', async ({ page }) => {
    // 1. Enter punctuation, Unicode characters, and representative long strings in username and password fields, then submit.
    await page.goto('http://localhost:8081/');
    const username = page.getByRole('textbox', { name: 'Enter Username' });
    const password = page.getByRole('textbox', { name: 'Enter Password' });

    await username.fill('qa+user_élise-2026');
    await password.fill('qa!pass#é2026');
    await username.fill('qa-long-user-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    await password.fill('qa-long-pass-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');
    await expect(password).toHaveAttribute('type', 'password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();
    await expect(page).toHaveURL('http://localhost:8081/');
    await expect(page.getByText('qa-long-pass')).toHaveCount(0);
  });
});
