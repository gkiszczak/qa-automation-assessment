import { test, expect } from '../fixtures/test-fixtures';

test.describe('Login', () => {
  test('successful login as standard_user', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('failed login as locked_out_user', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorContains('locked out');
    await expect(loginPage['loginButton']).toBeVisible(); // still on login page
  });
});
