import { test, expect } from '@playwright/test';
import { checoutOptions } from '../myTestcaseLocators/locators';
import { DemoShopPage } from '../myTestcaseLocators/locators';
import { SignIn } from '../myTestcaseLocators/locators';


test('Id: TDS: 001, if user able to find exact product and add to the cart', async ({ browser }) => {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const fields = new DemoShopPage(page);
    await page.goto('https://www.demoshop24.com/');
    await fields.searchField.fill('iMac');
    await fields.searchButton.click();
    await expect(fields.visualSearch).toHaveText('iMac');
    await expect(fields.visualSearchIMaxPrice).toContainText('$122.00');
    await expect(page.getByText('Add to Cart')).toBeVisible();
    await fields.addToCartButton.click();
    await expect(fields.cartTotal).toContainText(' 1 item(s) - $122.00');
});


test('Id: TDS: 002,if user able to open his cart, able check product he chooses', async ({ browser }) => {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const fields = new DemoShopPage(page);
    await page.goto('https://www.demoshop24.com/');
    await fields.productIMax.click();
    await expect(fields.cartTotal).toContainText(' 1 item(s) - $602.00');
    await fields.cartTotal.click();
    await expect(fields.checout).toContainText('Checkout');
    await fields.checkoutButton.click();
    expect(page.url()).toContain('/checkout');
});



test('Id: TDS: 003, if user able to reach all steps till payout method.', async ({ browser }) => {

    await test.step('', async () => {
        
    })

    await test.step('', async () => {
        
    })
    
    
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();

    
    await page.goto('https://www.demoshop24.com/');

    const fields = new DemoShopPage(page);
    await fields.productIMax.click();
    await expect(fields.cartTotal).toContainText(' 1 item(s) - $602.00');//Validate that in the cart 1 item – 602,00$ appeared.
    
    await fields.cartTotal.click();
    await fields.checkoutButton.click();//Press on checkout.

    const checkoutOption = checoutOptions.guest;//User should choose Guest Checkout.
    const radioButton = page.locator(`input[type="radio"][value="${checkoutOption}"]`);
    await radioButton.click();

    await fields.continueButton.click(); //Press continues.
   
    const signToPage = new SignIn(page);
    await signToPage.fillInput({
        firstName: "Alex",
        lastName: "Alex",
        email: "irina@gmail.com",
        telephone: "123456789",
        address1: "abc",
        city: "Riga",
        postCode: "123456789",
    });
    await signToPage.country.selectOption('117');
    await signToPage.region.selectOption('4163');
    await fields.continueButtonCheckout.click();

    await expect(fields.message).toHaveText(' Warning: No Payment options are available. Please contact us for assistance!');
});