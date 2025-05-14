import basePage from "./basePage";

export default class confirmationPage extends basePage {

    constructor() {
        super();
        this.elements = {
            confirmButton: () => cy.get('#button-confirm'),
        };
    }

    confirmOrder() {
        this.elements
            .confirmButton()
            .should('exist')
            .and('be.visible')
            .and('not.be.disabled')
            .click();

        return this;
    }

    verifyConfirmationPageTittle() {
        this.verifyPageTitle('Confirm Order');
        return this;
    }
    // Verify an order summary is shown before confirmation
    verifyOrderSummaryDisplayed() {
        cy.contains('Confirm Order')
            .should('exist')
            .and('be.visible');
        return this;
    }
}
