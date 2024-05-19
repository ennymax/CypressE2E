import BasePage from './BasePage';

export default class cardDetailsPage extends BasePage {
  constructor() {
    super('/payment');
    this.elements = {
      alert: () => cy.get('#success_message > .alert-success'),
      cardCVC: () => cy.get('[data-qa="cvc"]'),
      cardExpiry: () => cy.get('[data-qa="expiry-month"]'),
      cardExpiryYear: () => cy.get('[data-qa="expiry-year"]'),
      cardName: () => cy.get('[data-qa="name-on-card"]'),
      cardNumber: () => cy.get('[data-qa="card-number"]'),
      pay: () => cy.get('[data-qa="pay-button"]'),
    };
  }

  enterCardName() {
    this.elements.cardName().type(Cypress.env('CARDNAME'));
    return this;
  }

  enterCardNumber() {
    this.elements.cardNumber().type(Cypress.env('CARDNUMBER'));
    return this;
  }

  enterCardCVC() {
    this.elements.cardCVC().type(Cypress.env('CVC'));
    return this;
  }

  enterCardExpiry() {
    this.elements.cardExpiry().type(Cypress.env('EXPIRATION'));
    return this;
  }

  enterCardExpiryYear() {
    this.elements.cardExpiryYear().type(Cypress.env('YEAR'));
    return this;
  }

  clickPay() {
    this.elements.pay().click();
    return this;
  }

  enterCardDetails() {
    this.enterCardName()
      .enterCardNumber()
      .enterCardCVC()
      .enterCardExpiry()
      .enterCardExpiryYear();
    return this;
  }
}
