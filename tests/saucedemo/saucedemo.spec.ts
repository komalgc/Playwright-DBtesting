import {test, expect} from '@playwright/test'
import { SauceDemoUsers } from '../../utils/test-data';

test('sauce demo login', async ({page}) => {

    await page.goto('https://www.saucedemo.com')
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name : 'Login'}).click();
    await expect(page.getByText('Products')).toBeVisible();

})

test('sauce demo login with environment credential', async ({page}) => {

    await page.goto('/')
    await page.getByPlaceholder('Username').fill(process.env.SAUCEDEMO_STANDARD_USER!);
    await page.getByPlaceholder('Password').fill(process.env.SAUCEDEMO_PASSWORD!);
    await page.getByRole('button', {name : 'Login'}).click();
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();

})

test('login with test data helper', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');
await page.locator('#user-name').fill(SauceDemoUsers.standard.username);
await page.locator('#password').fill(SauceDemoUsers.standard.password);
await page.locator('#login-button').click();
await expect(page).toHaveURL('/inventory.html');
});
