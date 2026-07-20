import { test, expect } from '../fixtures/pages.js';
import { uiTestData } from '../testdata/test-data.js';
import {
    addProductsAndGetCartCounts,
    expectCartCountIncrease,
    expectAscending,
    expectDescending,
    getDefaultProductNames,
} from '../helpers/ui-helpers.js';

test.describe('Inventory Management Tests', () => {
    const cartProducts = getDefaultProductNames(uiTestData.products);

    test('Verify shopping cart count is updated when items are added', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;
        const counts = await addProductsAndGetCartCounts(inventoryPage, cartProducts);
        expectCartCountIncrease(counts, cartProducts.length);
        expect(counts.updatedCount).toBeGreaterThan(0);
    });

    test('Verify items are removed from cart and count is updated', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;
        const counts = await addProductsAndGetCartCounts(inventoryPage, cartProducts);
        expectCartCountIncrease(counts, cartProducts.length);
        await inventoryPage.removeProductFromCart(uiTestData.products.backpack.name);

        const updatedCount = await inventoryPage.getCartQuantity();
        expect(updatedCount).toBe(2);
    });

    test('Verify product sorting', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;

        await test.step('Verify products are sorted by price (low to high)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.priceLowToHigh);
            const productPrices = await inventoryPage.getProductPrices();
            expectAscending(productPrices);
        });

        await test.step('Verify products are sorted by price (high to low)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.priceHighToLow);
            const productPrices = await inventoryPage.getProductPrices();
            expectDescending(productPrices);
        });

        await test.step('Verify products are sorted by name (A to Z)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.nameAtoZ);
            const productNames = await inventoryPage.getProductNames();
            expectAscending(productNames);
        });

        await test.step('Verify products are sorted by name (Z to A)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.nameZtoA);
            const productNames = await inventoryPage.getProductNames();
            expectDescending(productNames);
        });
    });
});
