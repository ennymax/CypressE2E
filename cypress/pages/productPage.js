import BasePage from './BasePage';

export default class productPage extends BasePage {
  constructor() {
    super('/category_products/2');

    this.elements = {
      topWomenCategoryButton: () =>
        cy.get('#Women > .panel-body > ul > :nth-child(2) > a'),
      womenCategoryButton: () =>
        cy.get(':nth-child(1) > .panel-heading > .panel-title > a'),
    };
  }

  clickCartButton() {
    cy.contains('Cart').click();
    return this;
  }

  clickToWomenCategory() {
    this.elements.womenCategoryButton().click();
    return this;
  }

  clickToTopWomenCategory() {
    this.elements.topWomenCategoryButton().click();
    return this;
  }

  navigateToTopWomenCategory() {
    this.clickToWomenCategory().clickToTopWomenCategory();
    return this;
  }

  goToLogin() {
    this.visit().clickLoginButton();
    return this;
  }
}
