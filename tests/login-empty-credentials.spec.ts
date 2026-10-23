import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Handle submission with both credentials empty', async ({ page }) => {
    // 1. Open a fresh login page and leave both fields empty.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const message = page.locator('#message');
    await expect(username).toBeEmpty();
    await expect(password).toBeEmpty();

    // 2. Submit the empty credentials and verify the failure result.
    await page.locator('#loginBtn').click();
    await expect(message).toHaveText('Login Failed');
    await expect(page).toHaveURL('http://localhost:8081/');
  });
});
