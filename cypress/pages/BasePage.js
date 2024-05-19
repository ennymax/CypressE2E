export default class BasePage {
  constructor(path = '/') {
    this.path = path;
    this.baseUrl = '';
    this.url = `${this.baseUrl}${this.path}`;
  }

  visit() {
    cy.intercept('**').as(this.path);
    cy.visit(this.url);
    cy.wait(`@${this.path}`);
    return this;
  }

  assertPageUrl() {
    cy.location('pathname').should('eq', this.path);
    return this;
  }
}
