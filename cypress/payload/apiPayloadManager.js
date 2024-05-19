export const ApiPayloadManager = {
  bookingPayload(
    fname,
    lname,
    price,
    checkindate,
    checkoutdate,
    additionalneeds,
  ) {
    return {
      additionalneeds,
      bookingdates: {
        checkin: checkindate,
        checkout: checkoutdate,
      },
      depositpaid: true,
      firstname: fname,
      lastname: lname,
      totalprice: price,
    };
  },

  checkoutdateNeeds(date, needs) {
    return {
      additionalneeds: needs,
      bookingdates: {
        checkout: date,
      },
    };
  },

  emptyPayload() {
    return {};
  },

  missingDepositeStatus() {
    return {
      additionalneeds: 'Breakfast',
      bookingdates: {
        checkin: '2024-05-15',
        checkout: '2024-05-20',
      },
      firstname: 'apple',
      lastname: 'Doe',
      totalprice: 100,
    };
  },
};
