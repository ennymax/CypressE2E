import BasePage from './BasePage';

export default class paymentCompletePage extends BasePage {
  constructor() {
    super('/payment_done/1100');
  }

  verifySuccessfullPayment() {
    cy.contains('Congratulations! Your order has been confirmed!').should(
      'be.visible',
    );
    return this;
  }

  clickContinue() {
    cy.contains('Continue').click();
    return this;
  }

  clickLogout() {
    cy.contains('Logout').click();
    return this;
  }

  verifyLogout() {
    cy.contains('Login').should('be.visible');
    return this;
  }
}
