import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Reject a missing password', async ({ page }) => {
    // 1. Open a fresh login page and leave the password empty.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');
    await expect(password).toBeEmpty();

    // 2. Enter the valid username without a password.
    await username.fill('admin');

    // 3. Submit and verify the missing password is rejected.
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');
  });
});
