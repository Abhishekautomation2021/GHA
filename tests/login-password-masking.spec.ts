import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Mask the password while retaining entered values', async ({ page }) => {
    // 1. Open a fresh login page and enter credentials without submitting.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    await username.fill('admin');
    await password.fill('password');

    // 2. Verify the username value and password masking.
    await expect(username).toHaveValue('admin');
    await expect(password).toHaveAttribute('type', 'password');
    await expect(password).toHaveValue('password');
    await expect(page.locator('#message')).toBeEmpty();
  });
});
