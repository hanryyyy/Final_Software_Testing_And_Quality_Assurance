const { test, expect } = require('@playwright/test');
test.describe('Product cannot be removed from cart', () => {
    test('Not Remove', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('problem_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        //Verify that the login was successful
        await expect(page.getByText('Swag Labs')).toBeVisible();
        //Verify the page "All Items" is displayed
        await expect(page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs Backpackcarry.' }).nth(1)).toBeVisible();
        await expect(page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs Bike LightA red' }).nth(1)).toBeVisible();
        await expect(page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs Bolt T-ShirtGet' }).nth(1)).toBeVisible();
        await expect(page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs Fleece JacketIt\'s' }).nth(1)).toBeVisible();
        await expect(page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Sauce Labs OnesieRib snap' }).nth(1)).toBeVisible();
        await expect(page.locator('[data-test="inventory-list"] div').filter({ hasText: 'Test.allTheThings() T-Shirt (' }).nth(1)).toBeVisible();
        //Add an item to the cart
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        //Verify the product is added to the cart successfully
        await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
        //On all items page
        await page.locator('[data-test="continue-shopping"]').click();
        //Remove the item from the cart
        await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')).toBeVisible();
        //Cart icon is not decreased by 1
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
    });
});