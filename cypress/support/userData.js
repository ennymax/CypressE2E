import { faker } from '@faker-js/faker';

export const generateRandomUser = () => {
  const areaCode = faker.string.numeric(3); // Generate a 3-digit area code
  const exchangeCode = faker.string.numeric(3); // Generate a 3-digit exchange code
  const lineNumber = faker.string.numeric(4); // Generate a 4-digit line number
  const streetAddress = faker.location.streetAddress();
  const zipcode = faker.location.zipCode();
  const city = faker.location.city();

  const randomPassword = faker.internet.password({
  length: 12,
  memorable: false,
  pattern: /[A-Za-z0-9!@#$%^&*()]/,
  prefix: '',
});
  const usPhoneNumber = `(${areaCode}) ${exchangeCode}-${lineNumber}`;
  const fullName = faker.person.fullName();
  const firstName = faker.person.firstName();
  const email = faker.internet.email();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const recipientCode = faker.person.zodiacSign();
  const tenDigitNumber = faker.number.int({
    max: 9_999_999_999,
    min: 1_000_000_000,
  });
  const Description = faker.lorem.sentence(20);

  return {
    areaCode,
    city,
    zipcode,
    streetAddress,
    fullName,
    usPhoneNumber,
    email,
    Description,
    firstName,
    lastName,
    middleName,
    recipientCode,
    tenDigitNumber,
    randomPassword,
  };
};
