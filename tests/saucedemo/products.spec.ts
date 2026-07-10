import {test, expect} from '@playwright/test'
import { SauceDemoUsers } from '../../utils/test-data';
import { LoginPage } from '../../pageobjects/saucedemo/LoginPage';
import { ProductsPage } from '../../pageobjects/saucedemo/ProductsPage';

test.describe('SauceDemo Products Tests', () => {
 
test.beforeEach(async ({ page }) => {
// Login before each test
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login(SauceDemoUsers.standard.username, SauceDemoUsers.standard.password);
});

test('displays all products', async ({ page }) => {
const productsPage = new ProductsPage(page);
const productCount = await productsPage.getProductCount();
expect(productCount).toBe(6);
});
 
test('can add product to cart', async ({ page }) => {
const productsPage = new ProductsPage(page);
await productsPage.addProductToCartByName('Sauce Labs Backpack');
const cartCount = await productsPage.getCartItemCount();
expect(cartCount).toBe('1');
const isInCart = await productsPage.isProductInCart('Sauce Labs Backpack');
expect(isInCart).toBeTruthy(); 
});

test('can add multiple products to cart', async ({ page }) => {
const productsPage = new ProductsPage(page);
await productsPage.addProductToCartByName('Sauce Labs Backpack');
await productsPage.addProductToCartByName('Sauce Labs Bike Light');
const cartCount = await productsPage.getCartItemCount();
expect(cartCount).toBe('2');
});

test('can remove product from cart', async ({ page }) => {
const productsPage = new ProductsPage(page);
await productsPage.addProductToCartByName('Sauce Labs Backpack');
await productsPage.removeProductFromCartByName('Sauce Labs Backpack');
const cartCount = await productsPage.getCartItemCount();
expect(cartCount).toBe('0');
});

test('can sort products by name A-Z', async ({ page }) => {
const productsPage = new ProductsPage(page);
await productsPage.sortBy('az');
const productNames = await productsPage.getProductNameS();
expect(productNames[0]).toBe('Sauce Labs Backpack');
 
});
 
test('can sort products by price low to high', async ({ page }) => {
const productsPage = new ProductsPage(page);
await productsPage.sortBy('lohi');
const firstProductPrice = await productsPage.getProductPrice('Sauce Labs Onesie');
expect(firstProductPrice).toContain('$7.99');
});


 

});


