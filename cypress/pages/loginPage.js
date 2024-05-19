import BasePage from './BasePage';

export default class loginPage extends BasePage {
  constructor() {
    super('/login');

    this.elements = {
      logoutButton: () => cy.get('.pull-right > .btn'),
      passwordField: () => cy.get('[data-qa="login-password"]'),
      rememberMeCheckbox: () => cy.get('.iCheck-helper'),
      signInButton: () => cy.get('[data-qa="login-button"]'),
      usernameField: () => cy.get('[data-qa="login-email"]'),
    };
  }

  enterPassword(password) {
    this.elements.passwordField().should('not.be.disabled').type(password);
    return this;
  }

  enterUsername(username) {
    this.elements.usernameField().should('not.be.disabled').type(username);
    return this;
  }

  clickSignInButton() {
    this.elements.signInButton().click();
    return this;
  }

  loginAsAdminUser() {
    this.loginAs(Cypress.env('username'), Cypress.env('password'));
    return this;
  }

  loginAs(username, password) {
    return this.enterUsername(username)
      .enterPassword(password)
      .clickSignInButton();
  }
}
