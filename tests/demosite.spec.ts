import {test, expect} from '@playwright/test'

test('demo site', async ({page}) => {

    await page.goto('https://practicesoftwaretesting.com/')
    await expect(page).toHaveTitle(/Toolshop/)
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/")

})