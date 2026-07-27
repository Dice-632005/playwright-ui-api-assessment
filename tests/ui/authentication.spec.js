import { test, expect } from '../fixtures/pages.js';
import { successfulLoginUsers, uiTestData } from '../testdata/test-data.js';

test.describe('Authentication (multiple user types)', () => {
  const users = uiTestData.users;

  for (const userKey of successfulLoginUsers) {
    test(`Verify ${userKey} is authenticated successfully`, async ({ loginPage, page }) => {
      await loginPage.goto();
      await loginPage.loginAs(users[userKey]);

      // Assert successful redirection to inventory and visibility of product container
      await expect(page).toHaveURL(uiTestData.urls.inventory);
      await expect(page.locator('.inventory_list')).toBeVisible();
    });
  }

  test('Verify locked out user is presented with an authentication error', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.loginAs(users.locked_out_user);

    // Assert explicit error message for locked out credential attempt
    await expect(loginPage.errorMessage).toHaveText(
      uiTestData.authenticationErrors.lockedOutUser
    );
    await expect(page).toHaveURL(uiTestData.urls.login);
  });
});
