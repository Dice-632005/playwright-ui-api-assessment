import { expect } from '@playwright/test';

/**
 * Returns the default product set used across cart and inventory tests.
 * @param {typeof import('../testdata/test-data.js').uiTestData.products} products
 * @returns {string[]}
 */
export function getDefaultProductNames(products) {
  return [
    products.backpack.name,
    products.bikeLight.name,
    products.boltTShirt.name,
  ];
}

/**
 * Adds a list of products and returns the cart quantity before/after.
 * @param {import('../../pages/ui/inventoryPage.js').InventoryPage} inventoryPage
 * @param {string[]} productNames
 * @returns {Promise<{initialCount: number, updatedCount: number}>}
 */
export async function addProductsAndGetCartCounts(inventoryPage, productNames) {
  const initialCount = await inventoryPage.getCartQuantity();
  await inventoryPage.addProductsToCart(productNames);
  const updatedCount = await inventoryPage.getCartQuantity();

  return { initialCount, updatedCount };
}

/**
 * Asserts cart quantity increased by the expected product count.
 * @param {{initialCount: number, updatedCount: number}} counts
 * @param {number} addedProductsCount
 */
export function expectCartCountIncrease(counts, addedProductsCount) {
  expect(counts.updatedCount).toBe(counts.initialCount + addedProductsCount);
}

/**
 * Validates that the array values are sorted in ascending order.
 * @param {(number|string)[]} values
 */
export function expectAscending(values) {
  expect(values.length).toBeGreaterThan(0);
  const sortedValues = [...values].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
  expect(values).toEqual(sortedValues);
}

/**
 * Validates that the array values are sorted in descending order.
 * @param {(number|string)[]} values
 */
export function expectDescending(values) {
  expect(values.length).toBeGreaterThan(0);
  const sortedValues = [...values].sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
  expect(values).toEqual(sortedValues);
}