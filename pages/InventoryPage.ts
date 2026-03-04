import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  addToCartButtonForItem(itemName: string): Locator {
    // Stable: find item container by name, then the Add to cart button inside it
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.getByText(itemName, { exact: true }) })
      .getByRole('button', { name: /add to cart/i });
  }

  async addItemToCart(itemName: string) {
    const btn = this.addToCartButtonForItem(itemName);
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(this.cartBadge).toHaveText('1');
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart\.html/);
  }
}
