import { test, expect } from '@playwright/test';

test.describe('Login form and credential validation', () => {
  test('Log in with valid demo credentials', async ({ page }) => {
    // 1. Open the login page and confirm the initial form is ready.
    await page.goto('http://localhost:8081');
    const username = page.locator('#username');
    const password = page.locator('#password');
    await expect(page.getByRole('heading', { name: 'Employee Portal' })).toBeVisible();
    await expect(username).toBeEmpty();
    await expect(password).toBeEmpty();

    // 2. Enter valid demo credentials and verify the password field is masked.
    await username.fill('admin');
    await password.fill('password');
    await expect(username).toHaveValue('admin');
    await expect(password).toHaveAttribute('type', 'password');

    // 3. Submit and verify successful feedback without leaving the login page.
    await page.locator('#loginBtn').click();
    await expect(page.locator('#message')).toHaveText('Login Successful');
    await expect(page).toHaveURL('http://localhost:8081/');
  });
});
