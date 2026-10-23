import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Reject invalid username and password together', async ({ page }) => {
    // 1. Open a fresh login page and confirm the fields are empty.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');
    await expect(username).toBeEmpty();
    await expect(password).toBeEmpty();

    // 2. Enter an invalid username and password.
    await username.fill('not-admin');
    await password.fill('not-password');

    // 3. Submit and verify rejection without navigation.
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');
    await expect(page).toHaveURL('http://localhost:8081/');
  });
});
