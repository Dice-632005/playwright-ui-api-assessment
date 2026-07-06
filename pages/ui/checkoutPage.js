export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillCustomerInformation(customer) {
    await this.firstName.fill(customer.firstName);
    await this.lastName.fill(customer.lastName);
    await this.postalCode.fill(customer.postalCode);
  }

  async finish() {
    await this.finishButton.click();
  }

  async continueToOverview() {
    await this.continueButton.click();
    await this.page.locator('.summary_total_label').waitFor({ state: 'visible' });
  }

  async calculateItemsTotal() {
    const itemPrices = await this.page.locator('.cart_item .inventory_item_price').allTextContents();

    let total = 0;
    for (const priceText of itemPrices) {
      const value = Number(priceText.replace(/[^\d.]/g, ''));
      total += value;
    }

    return total;
  }

  async getSummarySubtotal() {
    const text = await this.page.locator('.summary_subtotal_label').textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
  }

  async getSummaryTax() {
    const text = await this.page.locator('.summary_tax_label').textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
  }

  async getSummaryTotal() {
    const text = await this.page.locator('.summary_total_label').textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
  }

  async getConfirmationText() {
    return this.completeHeader.textContent();
  }
}