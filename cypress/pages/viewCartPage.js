import BasePage from './BasePage';

export default class viewCartPage extends BasePage {
  constructor() {
    super('/view_cart');

    this.elements = {
      topWomenCategoryButton: () =>
        cy.get('#Women > .panel-body > ul > :nth-child(2) > a'),
      womenCategoryButton: () =>
        cy.get(':nth-child(1) > .panel-heading > .panel-title > a'),
    };
  }

  proceedToCheckout() {
    cy.contains('Proceed To Checkout').click();
    return this;
  }

  clickTopWomenCategory() {
    this.elements.topWomenCategoryButton().click();
    return this;
  }

  navigateToTopWomenCategory() {
    this.clickWomenCategory().clickTopWomenCategory();
    return this;
  }

  clickWomenCategory() {
    this.elements.womenCategoryButton().click();
    return this;
  }
}
