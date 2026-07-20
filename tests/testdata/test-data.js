/**
 * Resolves required environment variables.
 * Credentials must always be provided via environment variables.
 * 
 * @param {string} envName - The environment variable name
 * @returns {string}
 */
function resolveRequiredEnvValue(envName) {
  const value = process.env[envName];
  if (value && value.trim().length > 0) {
    return value.trim();
  }

  throw new Error(`Missing required environment variable: ${envName}. Please check your .env file or copy from .env.example.`);
}

/**
 * Lazy-loaded user credentials to avoid immediate evaluation failure at import time.
 */
export const uiTestData = {
  get users() {
    return {
      standard_user: { 
        username: resolveRequiredEnvValue('SAUCE_USERNAME'), 
        password: resolveRequiredEnvValue('SAUCE_PASSWORD') 
      },
      locked_out_user: { 
        username: resolveRequiredEnvValue('SAUCE_LOCKED_OUT_USERNAME'), 
        password: resolveRequiredEnvValue('SAUCE_LOCKED_OUT_PASSWORD') 
      },
      problem_user: { 
        username: resolveRequiredEnvValue('SAUCE_PROBLEM_USERNAME'), 
        password: resolveRequiredEnvValue('SAUCE_PROBLEM_PASSWORD') 
      },
      performance_glitch_user: { 
        username: resolveRequiredEnvValue('SAUCE_PERFORMANCE_USERNAME'), 
        password: resolveRequiredEnvValue('SAUCE_PERFORMANCE_PASSWORD') 
      },
      error_user: { 
        username: resolveRequiredEnvValue('SAUCE_ERROR_USERNAME'), 
        password: resolveRequiredEnvValue('SAUCE_ERROR_PASSWORD') 
      },
      visual_user: { 
        username: resolveRequiredEnvValue('SAUCE_VISUAL_USERNAME'), 
        password: resolveRequiredEnvValue('SAUCE_VISUAL_PASSWORD') 
      },
    };
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
  get auth() {
    return { 
      username: resolveRequiredEnvValue('BOOKER_USERNAME'), 
      password: resolveRequiredEnvValue('BOOKER_PASSWORD') 
    };
  },
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

export const saucedemoProducts = uiTestData.products;
export const successfulLoginUsers = [
  'standard_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user',
];

/**
 * Builds a dynamic booking payload for Restful Booker API tests.
 * @returns {object} Booking payload
 */
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

/**
 * Builds an updated dynamic booking payload.
 * @param {object} existingBooking - The current booking object to mutate
 * @returns {object} Updated booking payload
 */
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
