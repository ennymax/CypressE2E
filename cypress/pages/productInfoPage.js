import basePage from "./basePage";

export default class productInfoPage extends basePage {

    constructor() {
        super();
        this.elements = {
            viewCart: () => cy.xpath("//a[contains(text(),'View Cart')]"),
            addToCart: () => cy.xpath("//div[@id='entry_216842']/button"),
            cartCount: () => cy.xpath("//div[@id='entry_217825']/a/div/span"),
        };
    }

    addProductToCart() {
        this.elements
            .addToCart()
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled')
            .click();

        return this;
    }

    viewCartItem() {
        this.elements
            .viewCart()
            .should('exist')
            .and('be.visible')
            .click();
        return this;
    }

    verifyProductPageTittle() {
        this.verifyPageTitle('HTC Touch HD');
        return this;
    }

    // Verify product name is displayed
    verifyProductNameDisplayed() {
        cy.get('h1').should('contain.text', 'HTC Touch HD');
        return this;
    }

    verifyProductAddedToCart() {
        this.elements.cartCount()
            .should('be.visible')
            .and('have.text', '1')
        return this;
    }
}
