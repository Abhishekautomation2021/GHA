import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('requires exact case-sensitive credentials without surrounding whitespace', async ({ page }) => {
    await page.goto('http://192.168.1.4:8081/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');
    const message = page.locator('#message');
    const variants: Array<[string, string]> = [
      ['Admin', 'password'],
      [' admin', 'password'],
      ['admin ', 'password'],
      ['admin', 'Password'],
      ['admin', ' password'],
      ['admin', 'password '],
    ];

    // Every credential variation differs by case or whitespace and should be rejected.
    for (const [usernameValue, passwordValue] of variants) {
      await username.fill(usernameValue);
      await password.fill(passwordValue);
      await loginButton.click();
      await expect(message).toHaveText('Login Failed');
    }
  });
});
