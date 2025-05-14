import { generateRandomUser } from "../support/userData";
import basePage from "./basePage";
const user = generateRandomUser();

export default class checkoutPage extends basePage {

    constructor() {
        super();
        this.elements = {
            firstName: () => cy.get('#input-payment-firstname'),
            lastName: () => cy.get('#input-payment-lastname'),
            email: () => cy.get('#input-payment-email'),
            telephone: () => cy.get('#input-payment-telephone'),
            companyName: () => cy.get('#input-payment-company'),
            address1: () => cy.get('#input-payment-address-1'),
            address2: () => cy.get('#input-payment-address-2'),
            password: () => cy.get('#input-payment-password'),
            confirmpassword: () => cy.get('#input-payment-confirm'),

            city: () => cy.get('#input-payment-city'),
            postalCode: () => cy.get('#input-payment-postcode'),
            country: () => cy.get('#input-payment-country'),
            zone: () => cy.get('#input-payment-zone'),
            comment: () => cy.get('#input-comment'),
            saveButton: () => cy.get('#button-save'),
            newLetterCheckBox: () => cy.get('.sticky-top > :nth-child(3) input[type="checkbox"]'),
            privacyPolicyCheckBox: () => cy.get('.col-lg-7 > .sticky-top > :nth-child(4)'),
            termsConditionCheckBox: () => cy.get('.col-lg-7 > .sticky-top > :nth-child(6)'),

        };
    }

    customerFirstName(firstName) {
        this.elements.firstName()
            .should('be.visible')
            .type(firstName);
        return this;
    }

    customerLastName(lastName) {
        this.elements.lastName().should('exist').type(lastName);
        return this;
    }

    customerEmail(email) {
        this.elements.email().should('exist').type(email);
        return this;
    }

    customerTelephoneNumber(phone) {
        this.elements.telephone().should('exist').type(phone);
        return this;
    }

    password(passcode) {
        this.elements.password().should('be.visible').type(passcode);
        this.elements.confirmpassword().should('be.visible').type(passcode);
        return this;
    }

    customercompany(companyname) {
        this.elements.companyName().should('be.visible').type(companyname);
        return this;
    }

    customerAddress1(address1) {
        this.elements.address1().should('be.visible').type(address1);
        return this;
    }

    customerAddress2(address2) {
        this.elements.address2().should('be.visible').type(address2);
        return this;
    }

    postalCode(postalcode) {
        this.elements.postalCode().should('be.visible').type(postalcode);
        return this;
    }

    city(city) {
        this.elements.city().should('be.visible').type(city);
        return this;
    }

    UnsubscribeToNewLetter() {
        this.elements.newLetterCheckBox()
            .should('exist')
            .then(($checkbox) => {
                if ($checkbox.is(':checked')) {
                    cy.wrap($checkbox).uncheck({ force: true });
                    cy.wrap($checkbox).should('not.be.checked');
                } else {
                    cy.log('Checkbox already unchecked');
                }
            });
        return this;
    }

    agreeToPrivacyPolicy() {
        this.elements.privacyPolicyCheckBox()
            .find('input[type="checkbox"]')
            .should('exist')
            .then(($checkbox) => {
                if (!$checkbox.is(':checked')) {
                    cy.wrap($checkbox).check({ force: true });
                    cy.wrap($checkbox).should('be.checked');
                } else {
                    cy.log('Checkbox is already checked');
                }
            });
        return this;
    }

    AggreeToTermsAndCondition() {
        this.elements.termsConditionCheckBox()
            .find('input[type="checkbox"]')
            .should('exist')
            .then(($checkbox) => {
                if (!$checkbox.is(':checked')) {
                    cy.wrap($checkbox).check({ force: true });
                    cy.wrap($checkbox).should('be.checked');
                }
            });
        return this;
    }

    personlDetails() {
        this.customerFirstName(user.firstName)
            .customerLastName(user.lastName)
            .customerTelephoneNumber(user.tenDigitNumber)
            .customerEmail(user.email)
            .password(user.randomPassword);
        return this;
    }

    billingAddress() {
        this.customercompany(user.middleName)
            .customerAddress1(user.streetAddress)
            .customerAddress2(user.streetAddress)
            .city(user.city)
            .postalCode(user.zipcode);
        this.elements.country().should('be.visible').select('156');
        this.elements.zone().should('be.visible').select('2412');
        return this;
    }

    comment() {
        this.elements.comment().should('be.visible').type(user.Description);
        return this;
    }

    continueOrder() {
        this.elements.saveButton().should('be.visible').click();
        return this;
    }

    verifyCheckoutTittle() {
        cy.title().should('eq', 'Checkout');
        return this;
    }
}
