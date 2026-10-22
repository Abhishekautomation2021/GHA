// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login form rendering and interaction', () => {
  test('Enter, edit, and clear username and password values', async ({ page }) => {
    // 1. Enter a designated non-sensitive test username and password in their respective fields.
    await page.goto('http://localhost:8081/');
    const username = page.getByRole('textbox', { name: 'Enter Username' });
    const password = page.getByRole('textbox', { name: 'Enter Password' });
    const loginButton = page.getByRole('button', { name: 'Login' });

    await username.fill('test-user-123');
    await password.fill('test-pass-456');
    await expect(username).toHaveValue('test-user-123');
    await expect(password).toHaveAttribute('type', 'password');

    // 2. Select and replace part of the username, then clear both fields.
    await username.click();
    await page.keyboard.press('Control+A');
    await username.fill('edited-user');
    await expect(username).toHaveValue('edited-user');
    await username.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await password.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await expect(username).toBeEmpty();
    await expect(password).toBeEmpty();
    await expect(page).toHaveURL('http://localhost:8081/');
    await expect(page.getByText(/login successful/i)).toHaveCount(0);

    // 3. Use Tab and Shift+Tab to move between fields and Login button.
    await page.keyboard.press('Shift+Tab');
    await expect(username).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(password).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(loginButton).toBeFocused();
  });
});
