import { Page, Locator } from '@playwright/test';

export interface CheckoutInfo { 
firstName: string;
lastName: string;
postalCode: string;
 
}
export class CheckoutPage {
 
readonly page: Page;
readonly firstNameInput: Locator; 
readonly lastNameInput: Locator;
readonly postalCodeInput: Locator;
readonly continueButton: Locator;
readonly finishButton: Locator;
readonly completeHeader: Locator;
readonly completeText: Locator;
readonly backHomeButton: Locator;
readonly errorMessage: Locator;


constructor(page: Page) {
 
this.page = page; 
this.firstNameInput = page.locator('#first-name');
this.lastNameInput = page.locator('#last-name');
this.postalCodeInput = page.locator('#postal-code');
this.continueButton = page.locator('#continue');
this.finishButton = page.locator('#finish');
this.completeHeader = page.locator('.complete-header');
this.completeText = page.locator('.complete-text');
this.backHomeButton = page.locator('#back-to-products');
this.errorMessage = page.locator('[data-test="error"]'); 
}
 



async fillShippingInformation(info: CheckoutInfo) {
await this.firstNameInput.fill(info.firstName);
await this.lastNameInput.fill(info.lastName);
await this.postalCodeInput.fill(info.postalCode);
}

async clickContinue() {
await this.continueButton.click();
}
 
async clickFinish() {
await this.finishButton.click();
}
 
async getCompleteMessage(): Promise<string> { 
return await this.completeHeader.textContent() || '';
}
 
async isOrderComplete(): Promise<boolean> {
return await this.completeHeader.isVisible();
}
 
async clickBackHome() {
await this.backHomeButton.click();
}
 
async getErrorMessage(): Promise<string> {
return await this.errorMessage.textContent() || '';
}
 
}




