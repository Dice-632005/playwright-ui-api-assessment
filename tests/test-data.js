function resolveRequiredEnvValue(envName) {
  const value = process.env[envName];
  if (value && value.trim().length > 0) {
    return value;
  }

  throw new Error(`Missing required environment variable: ${envName}`);
}

const standardUsername = resolveRequiredEnvValue('SAUCE_USERNAME');
const standardPassword = resolveRequiredEnvValue('SAUCE_PASSWORD');
const lockedOutUsername = resolveRequiredEnvValue('SAUCE_LOCKED_OUT_USERNAME');
const lockedOutPassword = resolveRequiredEnvValue('SAUCE_LOCKED_OUT_PASSWORD');
const problemUsername = resolveRequiredEnvValue('SAUCE_PROBLEM_USERNAME');
const problemPassword = resolveRequiredEnvValue('SAUCE_PROBLEM_PASSWORD');
const performanceUsername = resolveRequiredEnvValue('SAUCE_PERFORMANCE_USERNAME');
const performancePassword = resolveRequiredEnvValue('SAUCE_PERFORMANCE_PASSWORD');
const errorUsername = resolveRequiredEnvValue('SAUCE_ERROR_USERNAME');
const errorPassword = resolveRequiredEnvValue('SAUCE_ERROR_PASSWORD');
const visualUsername = resolveRequiredEnvValue('SAUCE_VISUAL_USERNAME');
const visualPassword = resolveRequiredEnvValue('SAUCE_VISUAL_PASSWORD');

const bookerUsername = resolveRequiredEnvValue('BOOKER_USERNAME');
const bookerPassword = resolveRequiredEnvValue('BOOKER_PASSWORD');

export const uiTestData = {
  users: {
    standard_user: { username: standardUsername, password: standardPassword },
    locked_out_user: { username: lockedOutUsername, password: lockedOutPassword },
    problem_user: { username: problemUsername, password: problemPassword },
    performance_glitch_user: { username: performanceUsername, password: performancePassword },
    error_user: { username: errorUsername, password: errorPassword },
    visual_user: { username: visualUsername, password: visualPassword },
  },
  products: {
    backpack: { name: 'Sauce Labs Backpack' },
    bikeLight: { name: 'Sauce Labs Bike Light' },
    boltTShirt: { name: 'Sauce Labs Bolt T-Shirt' },
  },
  sortOptions: {
    nameAtoZ: 'az',
    nameZtoA: 'za',
    priceLowToHigh: 'lohi',
    priceHighToLow: 'hilo',
  },
  checkoutCustomer: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: '12345',
  },
  urls: {
    login: 'https://www.saucedemo.com/',
    inventory: 'https://www.saucedemo.com/inventory.html',
  },
  authenticationErrors: {
    lockedOutUser: 'Epic sadface: Sorry, this user has been locked out.',
  },
};

export const apiTestData = {
  auth: { username: bookerUsername, password: bookerPassword },
  booking: {
    defaultFirstName: 'Test',
    defaultLastName: 'Automation',
    totalPrice: 154,
    depositPaid: true,
    additionalNeeds: 'Breakfast',
    checkIn: '2025-09-01',
    checkOut: '2025-09-10',
  },
  updatedBooking: {
    firstName: 'Updated',
    lastName: 'AutomationUpdated',
    totalPrice: 222,
    depositPaid: false,
    additionalNeeds: 'Late Checkout',
    checkIn: '2025-10-01',
    checkOut: '2025-10-12',
  },
};

export const saucedemoUsers = uiTestData.users;
export const saucedemoProducts = uiTestData.products;
export const bookingCredentials = apiTestData.auth;
export const successfulLoginUsers = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

export function buildBookingPayload() {
  const now = Date.now();
  return {
    firstname: `${apiTestData.booking.defaultFirstName}${now}`,
    lastname: apiTestData.booking.defaultLastName,
    totalprice: apiTestData.booking.totalPrice,
    depositpaid: apiTestData.booking.depositPaid,
    bookingdates: {
      checkin: apiTestData.booking.checkIn,
      checkout: apiTestData.booking.checkOut,
    },
    additionalneeds: apiTestData.booking.additionalNeeds,
  };
}

export function buildUpdatedBookingPayload(existingBooking) {
  return {
    ...existingBooking,
    firstname: apiTestData.updatedBooking.firstName,
    lastname: apiTestData.updatedBooking.lastName,
    totalprice: apiTestData.updatedBooking.totalPrice,
    depositpaid: apiTestData.updatedBooking.depositPaid,
    bookingdates: {
      checkin: apiTestData.updatedBooking.checkIn,
      checkout: apiTestData.updatedBooking.checkOut,
    },
    additionalneeds: apiTestData.updatedBooking.additionalNeeds,
  };
}
