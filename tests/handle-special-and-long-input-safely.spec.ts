import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('handles markup-like and long input as plain text', async ({ page }) => {
    await page.goto('http://192.168.1.4:8081/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');
    const message = page.locator('#message');
    const markupLikeValue = '<b>sample</b>';

    // Submit markup-like text and a long but reasonable password.
    await username.fill(markupLikeValue);
    await password.fill('a-long-but-reasonable-test-value-1234567890');
    await loginButton.click();

    await expect(message).toHaveText('Login Failed');
    await expect(username).toHaveValue(markupLikeValue);
    await expect(page.locator('#message b')).toHaveCount(0);
    await expect(loginButton).toBeEnabled();
  });
});
