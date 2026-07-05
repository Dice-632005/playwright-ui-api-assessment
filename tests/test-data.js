function resolveEnvValue(envNames) {
  for (const envName of envNames) {
    const value = process.env[envName];
    if (value && value.trim().length > 0) {
      return value;
    }
  }

  throw new Error(`Missing required environment variable. Set one of: ${envNames.join(', ')}`);
}

const standardUsername = resolveEnvValue(
  ['SAUCE_USERNAME', 'SAUCE_STANDARD_USERNAME', 'SAUCEDEMO_STANDARD_USERNAME', 'GITHUB_SAUCE_USERNAME']
);
const standardPassword = resolveEnvValue(
  ['SAUCE_PASSWORD', 'SAUCE_STANDARD_PASSWORD', 'SAUCEDEMO_STANDARD_PASSWORD', 'GITHUB_SAUCE_PASSWORD']
);
const lockedOutUsername = resolveEnvValue(
  ['SAUCE_LOCKED_OUT_USERNAME', 'SAUCEDEMO_LOCKED_OUT_USERNAME', 'GITHUB_SAUCE_LOCKED_OUT_USERNAME']
);
const lockedOutPassword = resolveEnvValue(
  ['SAUCE_LOCKED_OUT_PASSWORD', 'SAUCEDEMO_LOCKED_OUT_PASSWORD', 'GITHUB_SAUCE_LOCKED_OUT_PASSWORD']
);
const problemUsername = resolveEnvValue(
  ['SAUCE_PROBLEM_USERNAME', 'SAUCEDEMO_PROBLEM_USERNAME', 'GITHUB_SAUCE_PROBLEM_USERNAME']
);
const problemPassword = resolveEnvValue(
  ['SAUCE_PROBLEM_PASSWORD', 'SAUCEDEMO_PROBLEM_PASSWORD', 'GITHUB_SAUCE_PROBLEM_PASSWORD']
);
const performanceUsername = resolveEnvValue(
  ['SAUCE_PERFORMANCE_USERNAME', 'SAUCEDEMO_PERFORMANCE_USERNAME', 'GITHUB_SAUCE_PERFORMANCE_USERNAME']
);
const performancePassword = resolveEnvValue(
  ['SAUCE_PERFORMANCE_PASSWORD', 'SAUCEDEMO_PERFORMANCE_PASSWORD', 'GITHUB_SAUCE_PERFORMANCE_PASSWORD']
);
const errorUsername = resolveEnvValue(
  ['SAUCE_ERROR_USERNAME', 'SAUCEDEMO_ERROR_USERNAME', 'GITHUB_SAUCE_ERROR_USERNAME']
);
const errorPassword = resolveEnvValue(
  ['SAUCE_ERROR_PASSWORD', 'SAUCEDEMO_ERROR_PASSWORD', 'GITHUB_SAUCE_ERROR_PASSWORD']
);
const visualUsername = resolveEnvValue(
  ['SAUCE_VISUAL_USERNAME', 'SAUCEDEMO_VISUAL_USERNAME', 'GITHUB_SAUCE_VISUAL_USERNAME']
);
const visualPassword = resolveEnvValue(
  ['SAUCE_VISUAL_PASSWORD', 'SAUCEDEMO_VISUAL_PASSWORD', 'GITHUB_SAUCE_VISUAL_PASSWORD']
);

const bookerUsername = resolveEnvValue(
  ['BOOKER_USERNAME', 'BOOKER_AUTH_USERNAME', 'RESTFUL_BOOKER_USERNAME', 'GITHUB_BOOKER_USERNAME']
);
const bookerPassword = resolveEnvValue(
  ['BOOKER_PASSWORD', 'BOOKER_AUTH_PASSWORD', 'RESTFUL_BOOKER_PASSWORD', 'GITHUB_BOOKER_PASSWORD']
);

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
  { key: 'standard_user', data: saucedemoUsers.standard_user },
  { key: 'problem_user', data: saucedemoUsers.problem_user },
  { key: 'performance_glitch_user', data: saucedemoUsers.performance_glitch_user },
  { key: 'error_user', data: saucedemoUsers.error_user },
  { key: 'visual_user', data: saucedemoUsers.visual_user },
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
