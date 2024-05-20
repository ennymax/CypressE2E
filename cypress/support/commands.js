// Handle uncaught exception
Cypress.on('uncaught:exception', (error, runnable) => {
  return false;
});

// custom command to add product successfully
Cypress.Commands.add('addProductToCart', (index) => {
  cy.get('.product-image-wrapper').then(($items) => {
    cy.wrap($items[index]).contains('Add to cart').click();
  });
});

Cypress.Commands.add(
  'assertProductDetails',
  (productId, productN, productP, productQ) => {
    cy.get(`#product-${productId}`)
      .then(($product) => {
        const productName = $product
          .find('.cart_description')
          .find('a')
          .text()
          .trim();
        const productPrice = $product
          .find('.cart_price')
          .find('p')
          .text()
          .trim();
        const productQuantity = $product
          .find('.cart_quantity')
          .find('button')
          .text()
          .trim();

        // Assert the product name
        cy.wrap(productName).as('productName');

        // Assert the product price
        cy.wrap(productPrice).as('productPrice');

        // Assert the product quantity
        cy.wrap(productQuantity).as('productQuantity');
      })
      .then(() => {
        // Assert the product name
        cy.get('@productName').should('equal', `${productN}`);

        // Assert the product price
        cy.get('@productPrice').should('equal', `${productP}`);

        // Assert the product quantity
       //cy.get('@productQuantity').should('equal', `${productQ}`);
      });
  },
);

// cypress/support/commands.js
Cypress.Commands.add(
  'validateBookingResponse',
  (response, fname, lname, lprice, lcheckinDate, lcheckoutDate, newneeds) => {
    // Assert response time is less than 1000 milliseconds
    expect(response.body).to.have.property('firstname').that.equals(fname);
    expect(response.body).to.have.property('lastname').that.equals(lname);
    expect(response.body).to.have.property('totalprice').that.equals(lprice);
    expect(response.body).to.have.property('depositpaid');

    // Assert properties of the 'bookingdates' object
    expect(response.body).to.have.property('bookingdates');
    expect(response.body.bookingdates)
      .to.have.property('checkin')
      .that.equals(lcheckinDate);
    expect(response.body.bookingdates)
      .to.have.property('checkout')
      .that.equals(lcheckoutDate);

    // Assert additionalneeds property and the returned object
    expect(response.body)
      .to.have.property('additionalneeds')
      .that.equals(newneeds);
  },
);

Cypress.Commands.add(
  'validateCreateBookingResponse',
  (response, fname, lname, lprice, lcheckinDate, lcheckoutDate, newneeds) => {
    // Assert response time is less than 1000 milliseconds
    expect(response.body.booking)
      .to.have.property('firstname')
      .that.equals(fname);
    expect(response.body.booking)
      .to.have.property('lastname')
      .that.equals(lname);
    expect(response.body.booking)
      .to.have.property('totalprice')
      .that.equals(lprice);
    expect(response.body.booking).to.have.property('depositpaid');

    // Assert properties of the 'bookingdates' object
    expect(response.body.booking).to.have.property('bookingdates');
    expect(response.body.booking.bookingdates)
      .to.have.property('checkin')
      .that.equals(lcheckinDate);
    expect(response.body.booking.bookingdates)
      .to.have.property('checkout')
      .that.equals(lcheckoutDate);

    // Assert additionalneeds property and the returned object
    expect(response.body.booking)
      .to.have.property('additionalneeds')
      .that.equals(newneeds);
  },
);
