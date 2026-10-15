import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('updates feedback on repeated login attempts', async ({ page }) => {
    await page.goto('http://192.168.1.4:8081/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');
    const message = page.locator('#message');
    const initialUrl = page.url();

    // Valid credentials display success.
    await username.fill('admin');
    await password.fill('password');
    await loginButton.click();
    await expect(message).toHaveText('Login Successful');

    // A subsequent invalid attempt replaces the previous result.
    await password.fill('wrong-password');
    await loginButton.click();
    await expect(message).toHaveText('Login Failed');

    // Correcting the password restores the success result without adding extra messages.
    await password.fill('password');
    await loginButton.click();
    await expect(message).toHaveText('Login Successful');
    await expect(message).toHaveCount(1);
    expect(page.url()).toBe(initialUrl);
  });
});
