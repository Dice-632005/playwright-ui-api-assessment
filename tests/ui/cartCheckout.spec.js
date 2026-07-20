import { test, expect } from '../fixtures/pages.js';
import { uiTestData } from '../testdata/test-data.js';
import { getDefaultProductNames } from '../helpers/ui-helpers.js';

test.describe('Cart Checkout Tests', () => {
  const cartProducts = getDefaultProductNames(uiTestData.products);

  test('Verify cart totals and checkout completion', async ({ authenticatedInventoryPage, cartPage, checkoutPage }) => {
    const inventoryPage = authenticatedInventoryPage;
    let cartQuantityAfterRemove = 0;

    await test.step('Verify items are added to cart', async () => {
      await inventoryPage.addProductsToCart(cartProducts);

      const cartQuantityAfterAdd = await inventoryPage.getCartQuantity();
      expect(cartQuantityAfterAdd).toBe(cartProducts.length);
    });

    await test.step('Verify items are removed from cart', async () => {
      await inventoryPage.removeProductFromCart(uiTestData.products.backpack.name);

      cartQuantityAfterRemove = await inventoryPage.getCartQuantity();
      expect(cartQuantityAfterRemove).toBe(2);
    });

    await test.step('Verify items total is calculated correctly and checkout successfully', async () => {
      await inventoryPage.openCart();

      // Assert item count in cart matches expected quantity
      const itemCount = await cartPage.itemCount();
      expect(itemCount).toBe(cartQuantityAfterRemove);

      await cartPage.checkout();
      await checkoutPage.fillCustomerInformation(uiTestData.checkoutCustomer);
      await checkoutPage.continueToOverview();

      const summary = await checkoutPage.getOverviewFinancialSummary();

      // Assert item calculation accuracy and non-zero total
      expect(summary.itemTotal).toBe(summary.subtotal);
      expect(summary.calculatedTotal).toBeCloseTo(summary.total, 2);
      expect(summary.total).toBeGreaterThan(0);
    });
  });
});