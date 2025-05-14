import basePage from "./basePage";

export default class landingPage extends basePage {

  constructor() {
    super();
    this.elements = {
      searchProduct: () => cy.get('input[name="search"]').first(),
      selectProduct: () => cy.xpath("//div[@id='search']/div/div[2]/ul/li[2]/div/a/img"),
    };
  }

  // Method searches product by Product Name
  searchProductByName(productName) {
    this.elements
      .searchProduct()
      .should('be.visible')
      .click()
      .type(productName);
    return this;
  }

  selectProductfromSearchResult() {
    this.elements
      .selectProduct()
      .should('be.visible')
      .click();
    return this;
  }

  verifyLandingPageTittle() {
    cy.title().should('eq', 'Your Store');
    return this;
  }

  verifyLandingPageTittle() {
    this.verifyPageTitle('Your Store');
    return this;
  }
}
