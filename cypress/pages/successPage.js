import basePage from "./basePage";

export default class successPage extends basePage {

    constructor() {
        super();
        this.elements = {
            continueButton: () => cy.get('.buttons > .btn'),
        };
    }

    continueToLandingPage() {
        this.elements
            .continueButton()
            .should('be.visible')
            .click();
        return this;
    }

    verifySuccessPageTittle() {
        this.verifyPageTitle('Your order has been placed!');
        return this;
    }

    // Verifies success message exists on the page
    verifyOrderSuccessMessage() {
        cy.contains('Your order has been successfully processed!')
            .should('exist')
            .and('be.visible');
        return this;
    }
}
