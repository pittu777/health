// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    // Test 1 — page loads
    test('should show login form', async ({ page }) => {
        await expect(page.getByPlaceholder('Email')).toBeVisible();
        await expect(page.getByPlaceholder('Password')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });

    // Test 2 — successful login
    test('should login successfully', async ({ page }) => {
        await page.getByPlaceholder('Email').fill('test1@example.com');
        await page.getByPlaceholder('Password').fill('password123');
        await page.getByRole('button', { name: 'Login' }).click();

        // should redirect to dashboard
        await expect(page).toHaveURL('/');
    });

    // Test 3 — loading state
    test('should show loading while submitting', async ({ page }) => {
        await page.getByPlaceholder('Email').fill('test1@example.com');
        await page.getByPlaceholder('Password').fill('password123');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByRole('button', { name: 'Processing...' })).toBeVisible();
    });

    // Test 4 — navigate to register
    test('should navigate to register page', async ({ page }) => {
        await page.getByText('Register here').click();
        await expect(page).toHaveURL('/register');
    });
});