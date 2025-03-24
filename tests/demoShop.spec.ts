import { test, expect } from '@playwright/test';
import { checoutOptions, country, region } from '../myTestcaseLocators/locators';
import { DemoShopPage } from '../myTestcaseLocators/locators';
import { SignIn } from '../myTestcaseLocators/locators';


test('Id: TDS: 001, if user able to find exact product and add to the cart', async ({ browser }) => {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const fields = new DemoShopPage(page);
    await test.step('go to the page', async () => {
        page.goto('https://www.demoshop24.com/');
    });

    await test.step('find iMax', async () => {
        fields.searchField.fill('iMac');
        fields.searchButton.click();
    });

    await test.step('verify that item exist', async () => {
        expect(fields.visualSearch).toHaveText('iMac');
        expect(fields.visualSearchIMaxPrice).toContainText('$122.00');
        expect(page.getByText('Add to Cart')).toBeVisible();
    });

    await test.step('verify that added in the cart', async () => {
        fields.addToCartButton.click();
        await expect(fields.cartTotal).toContainText(' 1 item(s) - $122.00');
    });

});


test('Id: TDS: 002,if user able to open his cart, able check product he chooses', async ({ browser }) => {
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const fields = new DemoShopPage(page);
    await test.step('go to page', async () => {
        page.goto('https://www.demoshop24.com/');
    });
    await test.step('choose iMax', async () => {
        fields.productIMax.click();
        await expect(fields.cartTotal).toContainText(' 1 item(s) - $602.00');
    });
    await test.step('check cart', async () => {
        fields.cartTotal.click();
        expect(fields.checout).toContainText('Checkout');
        await fields.checkoutButton.click();
    });
    await test.step('endpoint check', async () => {
        expect(page.url()).toContain('/checkout');
    });
});



test('Id: TDS: 003, if user able to reach all steps till payout method.', async ({ browser }) => {

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
    test.slow();
    const signToPage = new SignIn(page);

    await signToPage.fillInput({
        firstName: "Alex",
        lastName: "Alex",
        email: "irina@gmail.com",
        telephone: "123456789",
        address1: "abc",
        city: "Riga",
        postCode: "123456789",
        countrySelector: country.Latvia,
        regionSelector: region.Rīga
    });
    await signToPage.region.selectOption('4163');
    await fields.continueButtonCheckout.click();

    await expect(fields.message).toHaveText(' Warning: No Payment options are available. Please contact us for assistance!');
});