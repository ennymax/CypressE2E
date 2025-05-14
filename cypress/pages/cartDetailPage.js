import basePage from "./basePage";

export default class cartDetailPage extends basePage {

    constructor() {
        super();
        this.elements = {
            checkoutButton: () => cy.xpath("//a[contains(text(),'Checkout')]"),
        };
    }

    clickCheckoutButton() {
        this.elements
            .checkoutButton()
            .should('be.visible') // Assertion to ensure the button is visible before clicking
            .click();
        return this;
    }

    verifyCartdetailsPageTittle() {
        this.verifyPageTitle('Shopping Cart');
        return this;
    }

    verifyCheckoutButtonExists() {
        this.elements
            .checkoutButton()
            .should('exist') // Verifies the button exists in the DOM
            .and('be.visible'); // Verifies it's visible to the user
        return this;
    }
}
