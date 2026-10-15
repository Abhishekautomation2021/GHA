import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('resets login state after refresh without navigating away', async ({ page }) => {
    await page.goto('http://localhost:8081/');
    const initialUrl = page.url();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');
    const message = page.locator('#message');

    // Submit valid credentials and confirm success stays on the login URL.
    await username.fill('admin');
    await password.fill('password');
    await loginButton.click();
    await expect(message).toHaveText('Login Successful');
    expect(page.url()).toBe(initialUrl);

    // A fresh reload should clear the form and transient result message.
    await page.reload();
    await expect(username).toHaveValue('');
    await expect(password).toHaveValue('');
    await expect(message).toHaveText('');
    expect(page.url()).toBe(initialUrl);
  });
});
