import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loginAsStandardUser: () => Promise<Page>;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  loginAsStandardUser: async ({ page, loginPage, inventoryPage }, use) => {
    const fn = async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');
      await inventoryPage.expectLoaded();
      return page;
    };
    await use(fn);
  }
});

export { expect };
