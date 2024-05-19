import { generateRandomUser } from '../support/userData';
import BasePage from './BasePage';

const user = generateRandomUser();

export default class checkoutPage extends BasePage {
  constructor() {
    super('/checkout');
    this.elements = {
      orderComment: () => cy.get('.form-control'),
    };
  }

  placeOrder() {
    cy.contains('Place Order').click();
    return this;
  }

  enterOderComment() {
    this.elements.orderComment().type(user.Description);
    return this;
  }
}
