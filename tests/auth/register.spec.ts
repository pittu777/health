// tests/auth/register.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Register', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/register');
    });

    // Test 1 — page loads correctly
    test('should show register form', async ({ page }) => {
        await expect(page.getByPlaceholder('Full Name')).toBeVisible();
        await expect(page.getByPlaceholder('Email')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    });

    // Test 4 — empty form
    test('should not submit empty form', async ({ page }) => {
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page).toHaveURL('/register'); // stays on same page
    });
});