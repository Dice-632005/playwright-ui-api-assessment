import { test, expect } from '../fixtures/pages.js';
import { uiTestData } from '../testdata/test-data.js';

test.describe('Cart Checkout Tests', () => {
  test('Verify cart totals and checkout completion', async ({ authenticatedInventoryPage, cartPage, checkoutPage }) => {
    const inventoryPage = authenticatedInventoryPage;
    let cartQuantityAfterRemove = 0;

    await test.step('Verify items are added to cart', async () => {
      await inventoryPage.addProductsToCart([
        uiTestData.products.backpack.name,
        uiTestData.products.bikeLight.name,
        uiTestData.products.boltTShirt.name,
      ]);

      const cartQuantityAfterAdd = await inventoryPage.getCartQuantity();
      expect(cartQuantityAfterAdd).toBe(3);
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

      // Retrieve financial summary calculations from checkout overview
      const cartItemTotal = await checkoutPage.calculateItemsTotal();
      const cartSubTotal = await checkoutPage.getSummarySubtotal();
      const cartTax = await checkoutPage.getSummaryTax();
      const cartTotal = await checkoutPage.getSummaryTotal();
      const cartCalculatedTotal = cartSubTotal + cartTax;

      // Assert item calculation accuracy and non-zero total
      expect(cartItemTotal).toBe(cartSubTotal);
      expect(cartCalculatedTotal).toBeCloseTo(cartTotal, 2);
      expect(cartTotal).toBeGreaterThan(0);
    });
  });
});