import {test, expect} from '@playwright/test'
import { LoginPage } from '../../pageobjects/saucedemo/LoginPage';
import { ProductsPage } from '../../pageobjects/saucedemo/ProductsPage';
import { CartPage } from '../../pageobjects/saucedemo/CartPage';
import { CheckoutPage, CheckoutInfo } from '../../pageobjects/saucedemo/CheckoutPage';

test.describe('Cart Item Display Details', () => {
 
test.beforeEach(async ({ page }) => {
 
const loginPage = new LoginPage(page);
 

 

 
// Login before each test
 
await loginPage.goto();
 
await loginPage.login('standard_user', 'secret_sauce');
 
});
 
test('should display correct quantity for each cart item', async ({page}) => {
 
// Add multiple items
 const productsPage = new ProductsPage(page);
await productsPage.addProductToCartByName('Sauce Labs Backpack');
 
await productsPage.addProductToCartByName('Sauce Labs Bike Light');
 
await productsPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
 
await productsPage.clickShoppingCart();
 
// Each item should have a quantity of 1
 const cartPage = new CartPage(page);
const backpackDetails = await cartPage.getCartItemDetails('Sauce Labs Backpack');
 
const bikeLightDetails = await cartPage.getCartItemDetails('Sauce Labs Bike Light');
 
const tshirtDetails = await cartPage.getCartItemDetails('Sauce Labs Bolt T-Shirt');
 
// Verify quantities
 
expect(backpackDetails.quantity).toBe(1);
 
expect(bikeLightDetails.quantity).toBe(1);
 
expect(tshirtDetails.quantity).toBe(1);
 
// Verify names match expected
 
expect(backpackDetails.name).toBe('Sauce Labs Backpack');
 
expect(bikeLightDetails.name).toBe('Sauce Labs Bike Light');
 
expect(tshirtDetails.name).toBe('Sauce Labs Bolt T-Shirt');
 
});
 
test('should display product descriptions in cart', async ({page}) => {
 
// Add items with known descriptions
  const productsPage = new ProductsPage(page);
await productsPage.addProductToCartByName('Sauce Labs Backpack');
 
await productsPage.addProductToCartByName('Sauce Labs Onesie');
 
await productsPage.clickShoppingCart();
 
// Get descriptions from cart
 const cartPage = new CartPage(page);
const backpackDescription = await cartPage.getProductDescription('Sauce Labs Backpack');
 
const onesieDescription = await cartPage.getProductDescription('Sauce Labs Onesie');
 
// Verify descriptions exist and have content
 
expect(backpackDescription).toBeTruthy();
 
expect(backpackDescription.length).toBeGreaterThan(0);
 
expect(backpackDescription).toContain('carry.allTheThings()');
 
expect(onesieDescription).toBeTruthy();
 
expect(onesieDescription.length).toBeGreaterThan(0);
 
expect(onesieDescription).toContain('Rib snap');
 
});
 
});
