import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { saucedemoUsers, successfulLoginUsers, uiTestData } from '../test-data.js';

test.describe('Authentication (multiple user types)', () => {
  for (const userKey of successfulLoginUsers) {
    test(`Verify ${userKey} is authenticated successfully`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.loginAs(saucedemoUsers[userKey]);

      await expect(page).toHaveURL(uiTestData.urls.inventory);
      await expect(page.locator('.inventory_list')).toBeVisible();
    });
  }

  test('Verify locked out user is presented with an authentication error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAs(saucedemoUsers.locked_out_user);

    await expect(loginPage.errorMessage).toHaveText(
      uiTestData.authenticationErrors.lockedOutUser
    );
    await expect(page).toHaveURL(uiTestData.urls.login);
  });
});
