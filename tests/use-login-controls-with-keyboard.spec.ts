import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('supports keyboard navigation and submission', async ({ page }) => {
    await page.goto('http://192.168.1.4:8081/');

    // Tab through username and password, then submit with Enter from the Login button.
    await page.keyboard.press('Tab');
    await expect(page.locator('#username')).toBeFocused();
    await page.locator('#username').fill('admin');
    await page.keyboard.press('Tab');
    await expect(page.locator('#password')).toBeFocused();
    await page.locator('#password').fill('password');
    await page.keyboard.press('Tab');
    await expect(page.locator('button')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#message')).toHaveText('Login Successful');

    // Submit an invalid attempt with Space while the Login button is focused.
    await page.locator('#password').fill('wrong-password');
    await page.keyboard.press('Tab');
    await expect(page.locator('button')).toBeFocused();
    await page.keyboard.press('Space');
    await expect(page.locator('#message')).toHaveText('Login Failed');
  });
});
