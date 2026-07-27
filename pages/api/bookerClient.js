/**
 * API Client encapsulating Restful Booker HTTP endpoints.
 * Utilizes Playwright's APIRequestContext fixture for clean authentication and request execution.
 */
export class BookerClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request - Playwright API request context
   */
  constructor(request) {
    this.request = request;
  }

  /**
   * Generates an authentication token.
   * @param {{username: string, password: string}} credentials
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async authToken(credentials) {
    return this.request.post('/auth', {
      data: credentials,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Creates a new booking.
   * @param {object} payload - Booking creation data
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async createBooking(payload) {
    return this.request.post('/booking', {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Retrieves an existing booking by ID.
   * @param {number} bookingId
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async getBooking(bookingId) {
    return this.request.get(`/booking/${bookingId}`);
  }

  /**
   * Updates an existing booking using an authentication token.
   * @param {number} bookingId
   * @param {object} payload - Updated booking data
   * @param {string} token - Authorization token
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async updateBooking(bookingId, payload, token) {
    return this.request.put(`/booking/${bookingId}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        cookie: `token=${token}`,
      },
    });
  }

  /**
   * Deletes an existing booking.
   * @param {number} bookingId
   * @param {string} token - Authorization token
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async deleteBooking(bookingId, token) {
    return this.request.delete(`/booking/${bookingId}`, {
      headers: { cookie: `token=${token}` },
    });
  }
}