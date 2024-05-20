import { ApiPayloadManager } from '../payload/apiPayloadManager';
import { randomDate } from '../support/dateHelper';
import { generateRandomUser } from '../support/userData';

const user = generateRandomUser();
const fname = user.firstName;
const lname = user.lastName;
const lprice = user.tenDigitNumber;
const lcheckinDate = randomDate();
const lcheckoutDate = randomDate();
const newneeds = user.Description;

describe('TestCases for Booking API collection', () => {
  before('Generate access token for the Test suite', () => {
    // Make a POST request to the authentication endpoint
    cy.api({
      body: {
        password: Cypress.env('ADMINPASSWORD'),
        username: Cypress.env('ADMINUSERNAME'),
      },
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: Cypress.env('apiBaseUrl') + '/auth',
    }).then((response) => {
      // Store the Bearer token in Cypress.env for later use
      Cypress.env('bearerToken', response.body.token);
    });
  });


  context('Different Testscenarios for Create Bookings Endpoint', () => {
    it('Scenario 1: Create Booking with complete request body', () => {
      cy.api({
        body: ApiPayloadManager.bookingPayload(
          fname,
          lname,
          lprice,
          lcheckinDate,
          lcheckoutDate,
          newneeds,
        ),
        failOnStatusCode: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie: `token=${Cypress.env('bearerToken')}`,
        },
        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/booking',
      }).then((response) => {
        expect(response.body).to.have.property('bookingid');

        // Storing the booking Id in an enviroment variable
        Cypress.env('bookingId', response.body.bookingid);
        cy.validateCreateBookingResponse(
          response,
          fname,
          lname,
          lprice,
          lcheckinDate,
          lcheckoutDate,
          newneeds,
        );
      });
    });

    it('Scenario 2: Create Booking without payload', () => {
      cy.api({
        body: ApiPayloadManager.emptyPayload(),
        failOnStatusCode: false,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie: `token=${Cypress.env('bearerToken')}`,
        },

        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/booking',
      }).then((response) => {
        expect(response.status).to.eq(500);
        // Assert response time is less than 1000 milliseconds
        expect(response).to.have.property('duration').and.to.be.lt(1_000);
      });
    });

    it('Scenario 3: Create Booking with missing DepositStatus', () => {
      cy.api({
        body: ApiPayloadManager.missingDepositeStatus(),
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'application/json',
        },

        method: 'POST',
        url: Cypress.env('apiBaseUrl') + '/booking',
      }).then((response) => {
        expect(response.status).to.eq(500);
        // Assert response time is less than 1000 milliseconds
        expect(response).to.have.property('duration').and.to.be.lt(1_000);
      });
    });
  });
});
context('Get Booking API', () => {
  it('Scenario 1: Get the Booking that has been Created in Scenario 1 above', () => {
    cy.api({
      body: ApiPayloadManager.emptyPayload(),
      failOnStatusCode: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: `token=${Cypress.env('bearerToken')}`,
      },

      method: 'GET',
      url: Cypress.env('apiBaseUrl') + '/booking/' + Cypress.env('bookingId'),
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Assert response time is less than 1000 milliseconds
      expect(response).to.have.property('duration').and.to.be.lt(1_000);
      cy.validateBookingResponse(
        response,
        fname,
        lname,
        lprice,
        lcheckinDate,
        lcheckoutDate,
        newneeds,
      );
    });
  });
});

context('Different Testscenarios for Update Bookings Endpoint', () => {
  it('Scenario 1: verify that users are able to update the every Object in the Payload', () => {
    cy.api({
      body: ApiPayloadManager.bookingPayload(
        fname,
        lname,
        lprice,
        lcheckinDate,
        lcheckoutDate,
        newneeds,
      ),
      failOnStatusCode: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: `token=${Cypress.env('bearerToken')}`,
      },
      method: 'PUT',
      url: Cypress.env('apiBaseUrl') + '/booking/' + Cypress.env('bookingId'),
    }).then((response) => {
      expect(response.status).to.eq(200);

      // Assert response time is less than 1000 milliseconds
      expect(response).to.have.property('duration').and.to.be.lt(1_000);
      cy.validateBookingResponse(
        response,
        fname,
        lname,
        lprice,
        lcheckinDate,
        lcheckoutDate,
        newneeds,
      );
    });
  });

  it('Scenario 2: Update Bookings without any payload', () => {
    cy.api({
      body: ApiPayloadManager.emptyPayload(),
      failOnStatusCode: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: `token=${Cypress.env('bearerToken')}`,
      },
      method: 'PUT',
      url: Cypress.env('apiBaseUrl') + '/booking/' + Cypress.env('bookingId'),
    }).then((response) => {
      expect(response.status).to.eq(400);
      // Assert response time is less than 1000 milliseconds
      expect(response).to.have.property('duration').and.to.be.lt(1_000);
    });
  });

  it('Scenario 3: Update Booking with only Checkout date and Additional needs', () => {
    cy.api({
      body: ApiPayloadManager.checkoutdateNeeds(lcheckoutDate, newneeds),
      failOnStatusCode: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: `token=${Cypress.env('bearerToken')}`,
      },
      method: 'PUT',
      url: Cypress.env('apiBaseUrl') + '/booking/' + Cypress.env('bookingId'),
    }).then((response) => {
      expect(response.status).to.eq(400);
      // Assert response time is less than 1000 milliseconds
      expect(response).to.have.property('duration').and.to.be.lt(1_000);
    });
  });
});
