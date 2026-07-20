import { test, expect } from '../fixtures/pages.js';
import { uiTestData } from '../testdata/test-data.js';

test.describe('Inventory Management Tests', () => {
    test('Verify shopping cart count is updated when items are added', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;
        const initialCount = await inventoryPage.getCartQuantity();

        await inventoryPage.addProductsToCart([
            uiTestData.products.backpack.name,
            uiTestData.products.bikeLight.name,
            uiTestData.products.boltTShirt.name,
        ]);

        const updatedCount = await inventoryPage.getCartQuantity();
        expect(updatedCount).toBe(initialCount + 3);
    });

    test('Verify items are removed from cart and count is updated', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;
        const initialCount = await inventoryPage.getCartQuantity();

        await inventoryPage.addProductsToCart([
            uiTestData.products.backpack.name,
            uiTestData.products.bikeLight.name,
            uiTestData.products.boltTShirt.name,
        ]);
        await inventoryPage.removeProductFromCart(uiTestData.products.backpack.name);

        const updatedCount = await inventoryPage.getCartQuantity();
        expect(updatedCount).toBe(initialCount + 2);
    });

    test('Verify product sorting', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;

        await test.step('Verify products are sorted by price (low to high)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.priceLowToHigh);
            const productPrices = await inventoryPage.getProductPrices();
            expect(productPrices.length).toBeGreaterThan(0);
            const sortedPrices = [...productPrices].sort((a, b) => a - b);
            expect(productPrices).toEqual(sortedPrices);
        });

        await test.step('Verify products are sorted by price (high to low)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.priceHighToLow);
            const productPrices = await inventoryPage.getProductPrices();
            expect(productPrices.length).toBeGreaterThan(0);
            const sortedPrices = [...productPrices].sort((a, b) => b - a);
            expect(productPrices).toEqual(sortedPrices);
        });

        await test.step('Verify products are sorted by name (A to Z)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.nameAtoZ);
            const productNames = await inventoryPage.getProductNames();
            expect(productNames.length).toBeGreaterThan(0);
            const sortedNames = [...productNames].sort();
            expect(productNames).toEqual(sortedNames);
        });

        await test.step('Verify products are sorted by name (Z to A)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.nameZtoA);
            const productNames = await inventoryPage.getProductNames();
            expect(productNames.length).toBeGreaterThan(0);
            const sortedNames = [...productNames].sort().reverse();
            expect(productNames).toEqual(sortedNames);
        });
    });
});
