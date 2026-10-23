import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Reject an incorrect password for the valid username', async ({ page }) => {
    // 1. Open a fresh login page and confirm the fields start empty.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');
    await expect(username).toBeEmpty();
    await expect(password).toBeEmpty();

    // 2. Enter the valid username and an incorrect password.
    await username.fill('admin');
    await password.fill('wrong-password');

    // 3. Submit and verify the invalid credentials are rejected.
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');
    await expect(message).not.toHaveText('Login Successful');
    await expect(page).toHaveURL('http://localhost:8081/');
  });
});
