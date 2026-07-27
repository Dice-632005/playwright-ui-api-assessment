/**
 * Page Object encapsulating inventory product listing, sorting, and cart interaction.
 */
export class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  /**
   * Locates an inventory card by exact product name.
   * @param {string} productName
   * @returns {import('@playwright/test').Locator}
   */
  productCard(productName) {
    return this.inventoryItems.filter({ hasText: productName });
  }

  /**
   * Adds a single product to the cart by name.
   * @param {string} productName
   */
  async addProductToCart(productName) {
    const item = this.productCard(productName);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  /**
   * Adds multiple products to the cart in sequence.
   * @param {string[]} productNames
   */
  async addProductsToCart(productNames) {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  /**
   * Removes a product from the cart directly from the inventory list.
   * @param {string} productName
   */
  async removeProductFromCart(productName) {
    const item = this.productCard(productName);
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  /**
   * Removes multiple products from the cart in sequence.
   * @param {string[]} productNames
   */
  async removeProductsFromCart(productNames) {
    for (const productName of productNames) {
      await this.removeProductFromCart(productName);
    }
  }

  /**
   * Navigates to the shopping cart page.
   */
  async openCart() {
    await this.shoppingCartLink.click();
  }

  /**
   * Returns total number of displayed product cards.
   * @returns {Promise<number>}
   */
  async getProductCount() {
    return await this.inventoryItems.count();
  }

  /**
   * Retrieves current shopping cart badge number as an integer.
   * Uses modern locator methods instead of deprecated ElementHandle APIs.
   * @returns {Promise<number>}
   */
  async getCartQuantity() {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.innerText();
      return parseInt(text.trim(), 10) || 0;
    }
    return 0;
  }

  /**
   * Selects a sorting option from the dropdown container.
   * @param {string} option - Option value (e.g. 'lohi', 'az')
   */
  async sortProducts(option) {
    await this.sortDropdown.waitFor({ state: 'visible' });
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Extracts numeric prices for all currently displayed product cards.
   * Encapsulates DOM evaluation within the Page Object.
   * @returns {Promise<number[]>}
   */
  async getProductPrices() {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(price => parseFloat(price.replace(/[^\d.]/g, '')));
  }

  /**
   * Extracts text titles for all currently displayed product cards.
   * Encapsulates DOM evaluation within the Page Object.
   * @returns {Promise<string[]>}
   */
  async getProductNames() {
    const nameTexts = await this.page.locator('.inventory_item_name').allTextContents();
    return nameTexts.map(name => name.trim());
  }
}