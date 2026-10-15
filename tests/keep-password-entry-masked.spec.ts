import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('keeps password entry masked', async ({ page }) => {
    await page.goto('http://192.168.1.4:8081/');
    const password = page.locator('#password');
    await password.fill('sample-password');

    await expect(password).toHaveAttribute('type', 'password');
    await expect(page.locator('button[aria-label*="password" i], button[title*="password" i]')).toHaveCount(0);
  });
});
