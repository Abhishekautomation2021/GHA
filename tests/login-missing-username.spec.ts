import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Reject a missing username', async ({ page }) => {
    // 1. Open a fresh login page and leave the username empty.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');
    await expect(username).toBeEmpty();

    // 2. Enter the password without a username.
    await password.fill('password');

    // 3. Submit and verify the missing username is rejected.
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');
  });
});
