import { test, expect } from '@playwright/test';
import { SauceDemoUsers } from '../../utils/test-data';
import { LoginPage } from '../../pageobjects/saucedemo/LoginPage';

test("login Page", async({page}) =>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(SauceDemoUsers.standard.username, SauceDemoUsers.standard.password);
    await expect(page.locator('.title')).toHaveText('Products');

})

test("login with invalid cred", async({page}) =>{

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(SauceDemoUsers.invalid.username, SauceDemoUsers.invalid.password)
    const isErrorVisible = await loginPage.isErrorVisible();
    await expect(isErrorVisible).toBeTruthy();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
 
});

test('login fails with locked out user', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('locked_out_user', 'secret_sauce');
const errorText = await loginPage.getErrorMessage();
expect(errorText).toContain('Sorry, this user has been locked out'); 
});
 
test('can clear error message', async ({ page }) => {
const loginPage = new LoginPage(page); 
await loginPage.goto();
await loginPage.login('invalid_user', 'wrong');
await expect(loginPage.errorMessage).toBeVisible();
await loginPage.clearError();
await expect(loginPage.errorMessage).not.toBeVisible();
});
 


