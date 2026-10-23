import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Allow a valid login attempt after a failed attempt', async ({ page }) => {
    // 1. Open a fresh page and submit an invalid password.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');
    await username.fill('admin');
    await password.fill('wrong-password');
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');

    // 2. Correct the password, retry, and verify the result is updated.
    await password.fill('password');
    await page.locator('#signinBtn').click();
    await expect(message).toHaveText('Login Successful');
  });
});
