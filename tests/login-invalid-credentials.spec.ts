// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentication and error handling', () => {
  test('Reject an incorrect password', async ({ page }) => {
    // 1. Enter a known test account username with an intentionally incorrect password and activate Login.
    await page.goto('http://192.168.1.5:8080/');
    const username = page.getByRole('textbox', { name: 'Enter Username' });
    const password = page.getByRole('textbox', { name: 'Enter Password' });

    await username.fill('invalid-test-user');
    await password.fill('invalid-test-password');
    await expect(password).toHaveAttribute('type', 'password');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();
    await expect(page).toHaveURL('http://192.168.1.5:8080/');
    await expect(page.getByRole('heading', { name: 'Employee Portal' })).toBeVisible();
    await expect(page.getByText('invalid-test-password')).toHaveCount(0);
  });
});
