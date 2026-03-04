import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectHasItem(itemName: string) {
    await expect(this.page.getByText(itemName, { exact: true })).toBeVisible();
  }

  async startCheckout() {
    await expect(this.checkoutButton).toBeVisible();
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }
}
