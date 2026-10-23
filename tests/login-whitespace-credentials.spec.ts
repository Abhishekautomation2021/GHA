import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Do not silently normalize whitespace in credentials', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');

    // 1. Submit the valid password with a leading-space username.
    await page.goto('http://localhost:8081');
    await username.fill(' admin');
    await password.fill('password');
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');

    // 2. Reload and submit the valid username with a trailing-space password.
    await page.goto('http://localhost:8081');
    await username.fill('admin');
    await password.fill('password ');
    await page.locator('#signinBtn').click();
    await expect(message).toHaveText('Login Failed');
  });
});
