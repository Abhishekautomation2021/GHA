import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('accepts the configured valid credentials', async ({ page }) => {
    // Open the login page and capture its initial URL.
    await page.goto('http://192.168.1.4:8081/');
    const loginUrl = page.url();
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');

    await expect(page).toHaveTitle('Agent Demo');
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginButton).toBeVisible();

    // Submit the observed valid credentials.
    await username.fill('admin');
    await password.fill('password');
    await loginButton.click();

    await expect(page.locator('#message')).toHaveText('Login Successful');
    expect(page.url()).toBe(loginUrl);
  });
});
