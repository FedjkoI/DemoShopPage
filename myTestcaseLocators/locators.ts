import { Locator, Page } from "@playwright/test";

export class DemoShopPage {
    readonly page: Page;
    searchField: Locator;
    searchButton: Locator;
    visualSearch: Locator;
    visualSearchIMaxPrice: Locator;
    addToCartButton: Locator;
    cartTotal: Locator;
    productIMax: Locator;
    checout: Locator;
    checkoutButton: Locator;
    continueButton: Locator;
    continueButtonCheckout: Locator;
    message: Locator;
    country: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.locator('#search > input');
        this.searchButton = page.locator('#search > span > button');
        this.visualSearch = page.locator('#content > div:nth-child(8) > div > div > div:nth-child(2) > div.caption > h4 > a');
        this.visualSearchIMaxPrice = page.locator('//p[@class="price"]');
        this.addToCartButton = page.locator('#content > div:nth-child(8) > div > div > div:nth-child(2) > div.button-group > button:nth-child(1) > span');
        this.cartTotal = page.locator('#cart-total');
        this.productIMax = page.locator('#content > div.row > div:nth-child(1) > div > div.button-group > button:nth-child(1) > span');
        this.checout = page.locator('//*[@id="cart"]');
        this.checkoutButton = page.locator('#cart > ul > li:nth-child(2) > div > p > a:nth-child(2) > strong');
        this.continueButton = page.locator('//*[@id="button-account"]');
        this.continueButtonCheckout = page.locator('#button-guest');
        this.message = page.locator('#collapse-payment-method > div > div.alert.alert-warning.alert-dismissible');
    }
}

export enum checoutOptions {
    registered = "register",
    guest = "guest"
}

// export enum country {
//     Afganistan = "1",
//     Belarus = "20",
//     Grenada = "86",
//     Italy = "105",
//     Mali = "131",
//     Latvia = "117"
// }

export class SignIn {
    readonly page: Page;
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    telephone: Locator;
    address1: Locator;
    city: Locator;
    postCode: Locator;
    country: Locator;
    region: Locator
    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#input-payment-firstname');
        this.lastName = page.locator('#input-payment-lastname');
        this.email = page.locator('#input-payment-email');
        this.telephone = page.locator('#input-payment-telephone');
        this.address1 = page.locator('#input-payment-address-1');
        this.city = page.locator('#input-payment-city');
        this.postCode = page.locator('#input-payment-postcode');
        this.country = page.locator('//*[@id="input-payment-country"]');
        this.region = page.locator('#input-payment-zone');
    }

    async fillInput(field:
        {
            firstName: string, lastName: string, email: string, telephone: string, address1: string,
            city: string, postCode: string
        }) {
   
        await this.firstName.waitFor();
        await this.firstName.fill(field.firstName);
        await this.lastName.fill(field.lastName);
        await this.email.fill(field.email);
        await this.telephone.fill(field.telephone);
        await this.address1.fill(field.address1);
        await this.city.fill(field.city);
        await this.postCode.fill(field.postCode);

    }
    // async countrySelect(countrySelector: country) {
    //     await this.page.locator(`//*[@id="input-payment-country"][value='${countrySelector}']`).check();
    // }
}