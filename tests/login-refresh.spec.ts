// spec: login-test-plan/login-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Security, accessibility, and resilience', () => {
  test('Handle refresh and browser navigation safely', async ({ page }) => {
    // 1. Submit invalid credentials, refresh the page, then verify a clean unauthenticated login state.
    await page.goto('http://192.168.1.5:8080/');
    await page.getByRole('textbox', { name: 'Enter Username' }).fill('refresh-test-user');
    await page.getByRole('textbox', { name: 'Enter Password' }).fill('refresh-test-pass');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toBeVisible();

    await page.reload();

    await expect(page.getByRole('heading', { name: 'Employee Portal' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Enter Username' })).toBeEmpty();
    await expect(page.getByRole('textbox', { name: 'Enter Password' })).toBeEmpty();
    await expect(page.getByRole('heading', { name: 'Login Failed' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Employee Portal' })).toBeVisible();
  });
});
