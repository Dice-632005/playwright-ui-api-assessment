import { test as base, expect as baseExpect } from '@playwright/test';
import { LoginPage } from '../../pages/ui/loginPage.js';
import { InventoryPage } from '../../pages/ui/inventoryPage.js';
import { CartPage } from '../../pages/ui/cartPage.js';
import { CheckoutPage } from '../../pages/ui/checkoutPage.js';
import { uiTestData } from '../testdata/test-data.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  authenticatedInventoryPage: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.loginAs(uiTestData.users.standard_user);
    await use(inventoryPage);
  },
});

export const expect = baseExpect;
