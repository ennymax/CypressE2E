import BasePage from './BasePage';

export default class landingPage extends BasePage {
  constructor() {
    super('/');

    this.elements = {
      loginButton: () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
    };
  }

  clickLoginButton() {
    this.elements.loginButton().click();
    return this;
  }

  goToLogin() {
    this.visit().clickLoginButton();
    return this;
  }
}
