// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Security, accessibility, and resilience', () => {
  test('Verify keyboard and assistive-technology access', async ({ page }) => {
    // 1. Navigate the login page using only the keyboard, checking focus order and activating Login with the keyboard.
    await page.goto('http://localhost:8080/');
    const username = page.getByRole('textbox', { name: 'Enter Username' });
    const password = page.getByRole('textbox', { name: 'Enter Password' });
    const loginButton = page.getByRole('button', { name: 'Login' });

    await page.keyboard.press('Tab');
    await expect(username).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(password).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(loginButton).toBeFocused();
    await page.keyboard.press('Enter');

    // 2. Inspect accessible names and relationships for username/password controls and result message.
    await expect(page.getByRole('heading', { name: 'Login Failed', level: 2 })).toBeVisible();
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginButton).toBeVisible();
  });
});
