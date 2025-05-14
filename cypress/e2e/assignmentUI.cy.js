import LandingPage from '../pages/landingPage';
import ProductInfoPage from '../pages/productInfoPage';
import CartDetailPage from '../pages/cartDetailPage';
import CheckoutPage from '../pages/checkoutPage';
import ConfirmationPage from '../pages/confirmationPage';
import SuccessPage from '../pages/successPage';

// Instantiate page objects
const landingPage = new LandingPage();
const productInfoPage = new ProductInfoPage();
const cartDetailPage = new CartDetailPage();
const checkoutPage = new CheckoutPage();
const confirmationPage = new ConfirmationPage();
const successPage = new SuccessPage();

describe('E2E Test for an E-commerce website', () => {

  before(() => {
    // Setup - clear state and visit the landing page
    cy.clearCookies();
    cy.clearLocalStorage();
    landingPage.visit();
  });

  it('Should complete an Order on an E-commerce Website', () => {

    // Step 1: Search and select product
    landingPage
      .verifyLandingPageTittle()
      .searchProductByName('HTC Touch HD')
      .selectProductfromSearchResult();

    // Step 2: Verify product info and add to cart
    productInfoPage
      .verifyProductPageTittle()
      .verifyProductNameDisplayed()
      .addProductToCart()
      .verifyProductAddedToCart()
      .viewCartItem();

    // Step 3: Review cart and proceed to checkout
    cartDetailPage
      .verifyCartdetailsPageTittle()
      .clickCheckoutButton();

    // Step 4: Fill checkout form and continue
    checkoutPage
      .verifyCheckoutTittle()
      .personlDetails()
      .billingAddress()
      .comment()
      .UnsubscribeToNewLetter()
      .agreeToPrivacyPolicy()
      .AggreeToTermsAndCondition()
      .continueOrder();

    // Step 5: Confirm order
    confirmationPage
      .verifyConfirmationPageTittle()
      .verifyOrderSummaryDisplayed()
      .confirmOrder();

    // Step 6: Verify success and return to landing
    successPage
      .verifySuccessPageTittle()
      .verifyOrderSuccessMessage()
      .continueToLandingPage();
  });

});
