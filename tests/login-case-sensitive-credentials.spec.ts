import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Treat username and password case differences as invalid', async ({ page }) => {
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');

    // 1. Open fresh login page and submit a username with different capitalization.
    await page.goto('http://localhost:8081');
    await username.fill('Admin');
    await password.fill('password');
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');

    // 2. Reset the page and submit a password with different capitalization.
    await page.goto('http://localhost:8081');
    await username.fill('admin');
    await password.fill('Password');
    await page.locator('#signinBtn').click();
    await expect(message).toHaveText('Login Failed');
  });
});
