import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;

  constructor(private readonly page: Page) {
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
    await expect(this.continueButton).toBeVisible();
  }

  async fillMinimalDetails() {
    await this.firstName.fill('Jan');
    await this.lastName.fill('Kowalski');
    await this.postalCode.fill('00-001');
  }
}
