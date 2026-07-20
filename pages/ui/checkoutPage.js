/**
 * Page Object encapsulating checkout customer information entry and order summary verification.
 */
export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
    this.summarySubtotalLabel = page.locator('.summary_subtotal_label');
    this.summaryTaxLabel = page.locator('.summary_tax_label');
    this.summaryTotalLabel = page.locator('.summary_total_label');
    this.itemPriceLocators = page.locator('.cart_item .inventory_item_price');
  }

  /**
   * Fills checkout shipping information form.
   * @param {{firstName: string, lastName: string, postalCode: string}} customer
   */
  async fillCustomerInformation(customer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  /**
   * Completes the checkout order.
   */
  async finish() {
    await this.finishButton.click();
  }

  /**
   * Submits shipping information and navigates to order summary overview.
   */
  async continueToOverview() {
    await this.continueButton.click();
    await this.summaryTotalLabel.waitFor({ state: 'visible' });
  }

  /**
   * Sums item prices displayed on the overview page.
   * Encapsulates DOM parsing inside the Page Object.
   * @returns {Promise<number>}
   */
  async calculateItemsTotal() {
    const itemPrices = await this.itemPriceLocators.allTextContents();
    let total = 0;
    for (const priceText of itemPrices) {
      const value = parseFloat(priceText.replace(/[^\d.]/g, ''));
      if (!isNaN(value)) {
        total += value;
      }
    }
    return total;
  }

  /**
   * Parses item subtotal from summary label.
   * @returns {Promise<number>}
   */
  async getSummarySubtotal() {
    const text = await this.summarySubtotalLabel.textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
  }

  /**
   * Parses estimated tax from summary label.
   * @returns {Promise<number>}
   */
  async getSummaryTax() {
    const text = await this.summaryTaxLabel.textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
  }

  /**
   * Parses final order total from summary label.
   * @returns {Promise<number>}
   */
  async getSummaryTotal() {
    const text = await this.summaryTotalLabel.textContent();
    return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
  }

  /**
   * Retrieves order completion confirmation message.
   * @returns {Promise<string | null>}
   */
  async getConfirmationText() {
    return await this.completeHeader.textContent();
  }
}