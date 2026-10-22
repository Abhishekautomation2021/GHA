// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login form rendering and interaction', () => {
  test('Submit login form using the keyboard', async ({ page }) => {
    // 1. On a fresh page, focus the username field, enter designated test values, and submit using Enter from the password field.
    await page.goto('http://localhost:8080/');
    const username = page.getByRole('textbox', { name: 'Enter Username' });
    const password = page.getByRole('textbox', { name: 'Enter Password' });

    await username.fill('keyboard-test-user');
    await password.fill('keyboard-test-pass');
    await expect(password).toHaveAttribute('type', 'password');
    await password.press('Enter');

    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();
    await expect(page).toHaveURL('http://192.168.1.5:8080/');
    await expect(page.getByText('keyboard-test-pass')).toHaveCount(0);
  });
});
