import cardDetailsPage from '../pages/cardDetailsPage';
import checkoutPage from '../pages/checkoutPage';
import landingPage from '../pages/landingPage';
import loginPage from '../pages/LoginPage';
import paymentCompletePage from '../pages/paymentCompletePage';
import productPage from '../pages/productPage';
import viewCartPage from '../pages/viewCartPage';

describe('As an existing user, i should be able to place an order successfully', () => {
  before('Verify that the user is able to login', () => {
    new landingPage().goToLogin();
    new loginPage().assertPageUrl().loginAsAdminUser();
  });

  it('Sort by Product by Prize', () => {
    const items = [];

    cy.get('.features_items').scrollIntoView();
    cy.get('.features_items').each(($table) => {
      cy.wrap($table)
        .find('.product-image-wrapper > .single-products')
        .each(($product) => {
          const priceElement = $product.find('.productinfo > h2');
          const labelElement = $product.find('.productinfo > p');

          const priceText = priceElement.text();
          const trimmedPriceText = priceText.slice(4);

          const label = labelElement.text();

          try {
            const price = Number.parseInt(trimmedPriceText, 10); // Base 10 for decimal
            items.push({ label, price });
          } catch {
            // Handle non-numeric cases (e.g., log an error or skip the element)
            console.error(
              `Error converting text to number for element: ${priceText}`,
            );
          }
        });
    });

    cy.wrap(items)
      .should('have.length.gt', 0)
      .then((items) => {
        // Sort the items array by price
        items.sort((a, b) => a.price - b.price);

        console.log(items); // Output: sorted items by price
      });
  });

  it('verify that the user is able to add product to cart', () => {
    new productPage().navigateToTopWomenCategory().assertPageUrl();

    // Add Fancy Green Top to cart
    cy.addProductToCart(4).then(() => {
      cy.contains('Continue Shopping').click();
    });

    // Add Summer White Top to cart
    cy.addProductToCart(2).then(() => {
      cy.contains('Continue Shopping').click();
    });

    new productPage().clickCartButton();
  });

  it('verify that product details are displayed in the cart page', () => {
    new viewCartPage().assertPageUrl();

    // Assert Product name, Product Prize and Product quantity on view cart page
    cy.assertProductDetails(8, 'Fancy Green Top', 'Rs. 700', '1');
    cy.assertProductDetails(6, 'Summer White Top', 'Rs. 400', '1');

    // Click Proceed To Checkout
    new viewCartPage().proceedToCheckout();
  });

  it('verify that the user is able to place an order successfully', () => {
    new checkoutPage().assertPageUrl();

    // Assert Product name, Product Prize and Product quantity on the checkout page
    cy.assertProductDetails(8, 'Fancy Green Top', 'Rs. 700', '1');
    cy.assertProductDetails(6, 'Summer White Top', 'Rs. 400', '1');

    new checkoutPage().enterOderComment().placeOrder();
  });

  it('verify that users are able to make payment', () => {
    new cardDetailsPage().assertPageUrl().enterCardDetails().clickPay();
  });

  it('Verify payment was successfull', () => {
    new paymentCompletePage().verifySuccessfullPayment().clickContinue();
  });

  it('verify that the user is able to logout', () => {
    new paymentCompletePage().clickLogout().verifyLogout();
  });
});
