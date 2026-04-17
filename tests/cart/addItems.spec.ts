import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).nth(1).click();
    await page.getByRole('button', { name: 'Add to Cart' }).nth(2).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('button', { name: '+' }).first().dblclick();
    await page.getByRole('button', { name: '-' }).first().dblclick();
    await page.getByRole('button', { name: '+' }).nth(1).click();
    await page.getByRole('button', { name: '-' }).nth(1).dblclick();
    await page.getByRole('button', { name: 'Remove' }).nth(1).click();
    await page.getByRole('button', { name: 'Remove' }).first().click();
    await page.getByRole('link', { name: 'Cart' }).click();
});