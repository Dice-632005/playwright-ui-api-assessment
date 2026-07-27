/**
 * Page Object encapsulating shopping cart item review and navigation to checkout.
 */
export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.shoppingCartLinkLocator = page.locator('.shopping_cart_link');
  }

  /**
   * Returns number of items listed in the cart.
   * @returns {Promise<number>}
   */
  async itemCount() {
    return await this.cartItems.count();
  }

  /**
   * Clicks the shopping cart link in the header navigation.
   */
  async openShoppingCart() {
    await this.shoppingCartLinkLocator.click();
  }

  /**
   * Proceeds to the checkout step.
   */
  async checkout() {
    await this.checkoutButton.click();
  }

  /**
   * Checks if a specific product exists in the cart list.
   * @param {string} itemName
   * @returns {Promise<boolean>}
   */
  async hasItem(itemName) {
    const count = await this.cartItems.filter({ hasText: itemName }).count();
    return count > 0;
  }
}