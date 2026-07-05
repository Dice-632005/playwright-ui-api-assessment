import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage.js';
import { saucedemoUsers, successfulLoginUsers } from '../test-data.js';

test.describe('Authentication (multiple user types)', () => {
  for (const user of successfulLoginUsers) {
    test(`${user.key} should authenticate successfully`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.loginAs(user.data);

      await expect(page).toHaveURL(/inventory.html/, { timeout: 15000 });
      await expect(page.locator('.inventory_list')).toBeVisible();
    });
  }

  test('locked_out_user should see an authentication error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginAs(saucedemoUsers.locked_out_user);

    await expect(page.locator('[data-test="error"]')).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
    await expect(page).toHaveURL(/saucedemo.com/);
  });
});
