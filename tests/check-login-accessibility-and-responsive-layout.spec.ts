import { test, expect } from '@playwright/test';

test.describe('Employee Portal Login', () => {
  test('keeps login controls and feedback accessible across viewport sizes', async ({ page }) => {
    await page.goto('http://localhost:8081/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const loginButton = page.locator('button');
    const message = page.locator('#message');

    // Check the labelled controls and their result feedback at common viewport widths.
    await username.fill('invalid');
    await password.fill('invalid');
    await loginButton.click();
    await expect(message).toHaveText('Login Failed');

    for (const viewport of [{ width: 1280, height: 800 }, { width: 768, height: 1024 }, { width: 375, height: 812 }]) {
      await page.setViewportSize(viewport);
      await expect(username).toBeVisible();
      await expect(password).toBeVisible();
      await expect(loginButton).toBeVisible();
      await expect(message).toBeVisible();
      await expect(page.locator('h1')).toHaveText('Employee Portal');
    }
  });
});
