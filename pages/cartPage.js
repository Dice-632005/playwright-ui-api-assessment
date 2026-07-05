export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.shoppingCartLink = page.getByTestId('[data-test="shopping-cart-link"]');
  }

  async itemCount() {
    return await this.cartItems.count();
  }

  async shoppingCartLink() {
    this.shoppingCartLink.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async hasItem(itemName) {
    return await this.cartItems.filter({ hasText: itemName }).count();
  }

}
