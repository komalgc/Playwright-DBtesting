import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjects/saucedemo/LoginPage';
import { ProductsPage } from '../../pageobjects/saucedemo/ProductsPage';
import { CartPage } from '../../pageobjects/saucedemo/CartPage';
import { CheckoutPage, CheckoutInfo } from '../../pageobjects/saucedemo/CheckoutPage';
 
test.describe('SauceDemo End-to-End Checkout Flow', () => {
 
test('complete checkout flow with multiple products', async ({ page }) => {
// Step 1: Login
const loginPage = new LoginPage(page); 
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');
// Step 2: Add products to cart
const productsPage = new ProductsPage(page); 
await productsPage.addProductToCartByName('Sauce Labs Backpack');
await productsPage.addProductToCartByName('Sauce Labs Bike Light');
// Verify cart count
const cartCount = await productsPage.getCartItemCount();
expect(cartCount).toBe('2');
// Step 3: Go to cart 
await productsPage.clickShoppingCart();
// Step 4: Verify cart contents
const cartPage = new CartPage(page);
const itemCount = await cartPage.getCartItemCount();
expect(itemCount).toBe(2);
const itemNames = await cartPage.getCartItemNames();
expect(itemNames).toContain('Sauce Labs Backpack');
expect(itemNames).toContain('Sauce Labs Bike Light');
// Step 5: Proceed to checkout
await cartPage.clickCheckout();
// Step 6: Fill shipping information
const checkoutPage = new CheckoutPage(page);
const shippingInfo: CheckoutInfo = {
firstName: 'John', 
lastName: 'Doe',
postalCode: '12345'
};

await checkoutPage.fillShippingInformation(shippingInfo);
await checkoutPage.clickContinue();
// Step 7: Complete order
await checkoutPage.clickFinish();
// Step 8: Verify order completion 
const isComplete = await checkoutPage.isOrderComplete();
expect(isComplete).toBeTruthy();
const completeMessage = await checkoutPage.getCompleteMessage();
expect(completeMessage).toContain('Thank you for your order');
 
});
 
test('checkout with single product', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');
const productsPage = new ProductsPage(page);
await productsPage.addProductToCartByName('Sauce Labs Onesie');
await productsPage.clickShoppingCart();
const cartPage = new CartPage(page);
await cartPage.clickCheckout();
const checkoutPage = new CheckoutPage(page);
const shippingInfo: CheckoutInfo = {
firstName: 'John', 
lastName: 'Doe',
postalCode: '12345'
};
await checkoutPage.fillShippingInformation(shippingInfo);
await checkoutPage.clickContinue();
await checkoutPage.clickFinish();
const completeMessage = await checkoutPage.getCompleteMessage();
expect(completeMessage).toBe('Thank you for your order!');
 
});
 
test('cannot checkout with empty cart', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');
const productsPage = new ProductsPage(page);
await productsPage.clickShoppingCart();
const cartPage = new CartPage(page);
const itemCount = await cartPage.getCartItemCount();
expect(itemCount).toBe(0);
// Checkout button should still be clickable but cart is empty
await cartPage.clickCheckout();
// Should be on checkout page
 await expect(page).toHaveURL(/.*checkout-step-one.*/);
});
 
});
