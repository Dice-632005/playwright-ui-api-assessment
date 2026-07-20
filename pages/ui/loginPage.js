/**
 * Page Object encapsulating SauceDemo login interactions and error state locators.
 */
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the login page root URL.
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Executes explicit username and password authentication.
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Helper method to login using a user credential object.
   * @param {{username: string, password: string}} user
   */
  async loginAs(user) {
    await this.login(user.username, user.password);
  }

  /**
   * Retrieves displayed login error notification text.
   * @returns {Promise<string | null>}
   */
  async getErrorText() {
    return await this.errorMessage.textContent();
  }
}