
export default class basePage {

    visit() {
        cy.intercept('**').as('allRequests');
        cy.visit('/');
        cy.wait('@allRequests');
        return this;
    }


    /**
     * Verify that the page title includes expected text
     * @param {string} expectedTitle
     */
    verifyPageTitle(expectedTitle) {
        cy.title().should('include', expectedTitle);
        return this;
    }
};

