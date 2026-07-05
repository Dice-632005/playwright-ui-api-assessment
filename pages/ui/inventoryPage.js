export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown =  this.page.locator('[data-test="product-sort-container"]');
  }

  productCard(productName) {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async addProductToCart(productName) {
    const item = this.productCard(productName);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async addProductsToCart(productNames) {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  async removeProductFromCart(productName) {
    const item = this.page.locator('.inventory_item').filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async removeProductsFromCart(productNames) {
    for (const productName of productNames) {
      await this.removeProductFromCart(productName);
    }
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getProductCount() {
    return await this.page.locator('.inventory_item').count();
  }

  async getCartQuantity() {
    const badge = await this.page.$('[data-test="shopping-cart-badge"], .shopping_cart_badge');
    if (!badge) {
      return '0';
    }
    return await badge.innerText();
  }

  async sortProducts(option) {
    await this.sortDropdown.waitFor({ state: 'visible' });
    await this.sortDropdown.selectOption(option);
  }
}