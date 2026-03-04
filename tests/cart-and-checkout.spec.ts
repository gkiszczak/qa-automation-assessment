import { test, expect } from '../fixtures/test-fixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Cart & Checkout (start)', () => {
  test('add a product to cart and start checkout process', async ({
    page,
    inventoryPage,
    loginAsStandardUser
  }) => {
    await loginAsStandardUser();

    // Choose a stable item name.
    const itemName = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCart(itemName);

    await inventoryPage.openCart();
    const cart = new CartPage(page);
    await cart.expectHasItem(itemName);

    await cart.startCheckout();
    const checkout = new CheckoutPage(page);
    await checkout.expectLoaded();

    // "Start checkout process" achieved by reaching step one screen.
    // Optional: fill data to show page is interactive, but we do not continue further.
    await checkout.fillMinimalDetails();
    await expect(checkout.continueButton).toBeEnabled();
  });
});
