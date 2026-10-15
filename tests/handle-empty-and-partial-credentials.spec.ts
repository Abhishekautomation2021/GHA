import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('rejects empty and partially completed credentials', async ({ page }) => {
    await page.goto('http://192.168.1.4:8081/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');
    const message = page.locator('#message');

    // Reject an empty submission.
    await loginButton.click();
    await expect(message).toHaveText('Login Failed');

    // Reject username without password.
    await username.fill('admin');
    await loginButton.click();
    await expect(message).toHaveText('Login Failed');

    // Reject password without username.
    await username.fill('');
    await password.fill('password');
    await loginButton.click();
    await expect(message).toHaveText('Login Failed');
  });
});
