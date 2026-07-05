import { test, expect } from '../fixtures/pages.js';
import { uiTestData } from '../test-data.js';

test.describe('Inventory Management Tests', () => {
    test('should update shopping cart count when items are added', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;
        const initialCount = Number(await inventoryPage.getCartQuantity()) || 0;

        await inventoryPage.addProductsToCart([
            uiTestData.products.backpack.name,
            uiTestData.products.bikeLight.name,
            uiTestData.products.boltTShirt.name,
        ]);

        const updatedCount = Number(await inventoryPage.getCartQuantity());
        expect(updatedCount).toBe(initialCount + 3);

        console.log(`Initial Count: ${initialCount + 3}, Updated Count: ${updatedCount}`);
    });

    test('Verify items are removed from cart and count is updated', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;
        const initialCount = Number(await inventoryPage.getCartQuantity()) || 0;

        await inventoryPage.addProductsToCart([
            uiTestData.products.backpack.name,
            uiTestData.products.bikeLight.name,
            uiTestData.products.boltTShirt.name,
        ]);
        await inventoryPage.removeProductFromCart(uiTestData.products.backpack.name);

        const updatedCount = Number(await inventoryPage.getCartQuantity());
        expect(updatedCount).toBe(initialCount + 2);

        console.log(`Initial Count: ${initialCount + 2}, Updated Count: ${updatedCount}`);
    });

    test('Verify product sorting', async ({ authenticatedInventoryPage }) => {
        const inventoryPage = authenticatedInventoryPage;
        await test.step('Verify products are sorted by price (low to high)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.priceLowToHigh);
            const productPrices = await inventoryPage.page.$$eval('.inventory_item_price', prices =>
                prices.map(price => parseFloat(price.textContent.replace(/[^\d.]/g, '')))
            );
            const sortedPrices = [...productPrices].sort((a, b) => a - b);
            expect(productPrices).toEqual(sortedPrices);
            console.log(`Sorted Prices (Low to High): ${productPrices.join(', ')}`);
        });

        await test.step('Verify products are sorted by price (high to low)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.priceHighToLow);
            const productPrices = await inventoryPage.page.$$eval('.inventory_item_price', prices =>
                prices.map(price => parseFloat(price.textContent.replace(/[^\d.]/g, '')))
            );
            const sortedPrices = [...productPrices].sort((a, b) => b - a);
            expect(productPrices).toEqual(sortedPrices);
            console.log(`Sorted Prices (High to Low): ${productPrices.join(', ')}`);
        });

        await test.step('Verify products are sorted by name (A to Z)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.nameAtoZ);
            const productNames = await inventoryPage.page.$$eval('.inventory_item_name', names =>
                names.map(name => name.textContent.trim())
            );
            const sortedNames = [...productNames].sort();
            expect(productNames).toEqual(sortedNames);
            console.log(`Sorted Names (A to Z): ${productNames.join(', ')}`);
        });

        await test.step('Verify products are sorted by name (Z to A)', async () => {
            await inventoryPage.sortProducts(uiTestData.sortOptions.nameZtoA);
            const productNames = await inventoryPage.page.$$eval('.inventory_item_name', names =>
                names.map(name => name.textContent.trim())
            );
            const sortedNames = [...productNames].sort().reverse();
            expect(productNames).toEqual(sortedNames);
            console.log(`Sorted Names (Z to A): ${productNames.join(', ')}`);
        });
    });

});
