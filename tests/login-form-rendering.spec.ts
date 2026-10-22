import { test, expect } from '@playwright/test';

test.describe('Login form rendering and interaction', () => {
  test('Render the employee portal login form', async ({ page }) => {
    // 1. Open the employee portal in a fresh browser context and verify it loads
    await page.goto('http://localhost:8081/');
    await expect(page).toHaveTitle('Agent Demo');

    // 2. Inspect the page heading and controls. Verify the heading, fields, button, masking, empty state, and absence of an authentication result message.
    const username = page.getByRole('textbox', { name: 'Enter Username' });
    const password = page.getByRole('textbox', { name: 'Enter Password' });
    const loginButton = page.getByRole('button', { name: 'Login' });

    await expect(page.getByRole('heading', { name: 'Employee Portal', level: 1 })).toBeVisible();
    await expect(username).toBeVisible();
    await expect(username).toBeEnabled();
    await expect(password).toBeVisible();
    await expect(password).toBeEnabled();
    await expect(password).toHaveAttribute('type', 'password');
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
    await expect(username).toBeEmpty();
    await expect(password).toBeEmpty();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toHaveCount(0);
  });
});
