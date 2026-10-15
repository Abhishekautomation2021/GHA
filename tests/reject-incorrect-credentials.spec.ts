import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('rejects incorrect usernames and passwords', async ({ page }) => {
    await page.goto('http://192.168.1.4:8081/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');
    const message = page.locator('#message');

    // Reject a non-existent username with the known password.
    await username.fill('guest');
    await password.fill('password');
    await loginButton.click();
    await expect(message).toHaveText('Login Failed');

    // Reject an incorrect password for the configured username.
    await username.fill('admin');
    await password.fill('wrong-password');
    await loginButton.click();
    await expect(message).toHaveText('Login Failed');
  });
});
