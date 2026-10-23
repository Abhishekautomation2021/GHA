import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Handle unusually long invalid input safely', async ({ page }) => {
    // 1. Open a fresh login page.
    await page.goto('http://localhost:8081');
    const longInput = 'x'.repeat(256);
    const username = page.locator('#username');
    const password = page.locator('#password');

    // 2. Enter long invalid values and verify the form accepts the input without breaking.
    await username.fill(longInput);
    await password.fill(longInput);
    await expect(username).toHaveValue(longInput);
    await expect(password).toHaveAttribute('type', 'password');
    await expect(password).toHaveValue(longInput);

    // 3. Submit and verify the page handles the invalid values safely.
    await page.locator('#loginBtn').click();
    await expect(page.locator('#message')).toHaveText('Login Failed');
    await expect(page).toHaveURL('http://localhost:8081/');
  });
});
