import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Submit credentials using Enter from the password field', async ({ page }) => {
    test.fixme(true, 'The current application does not submit the login form when Enter is pressed.');
    // 1. Open a fresh login page and enter valid demo credentials.
    await page.goto('http://localhost:8081');
    await page.locator('#username').fill('admin');
    const password = page.locator('#password');
    await password.fill('password');

    // 2. Press Enter while focused in the password field and verify submission succeeds.
    await password.press('Enter');
    await expect(page.locator('#message')).toHaveText('Login Successful');
  });
});
