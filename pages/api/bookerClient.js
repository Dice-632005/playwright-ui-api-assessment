export class BookerClient {
  constructor(request) {
    this.request = request;
    this.baseURL = 'https://restful-booker.herokuapp.com';
  }

  async authToken(credentials) {
    return this.request.post(`${this.baseURL}/auth`, {
      data: credentials,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async createBooking(payload) {
    return this.request.post(`${this.baseURL}/booking`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getBooking(bookingId) {
    return this.request.get(`${this.baseURL}/booking/${bookingId}`);
  }

  async updateBooking(bookingId, payload, token) {
    return this.request.put(`${this.baseURL}/booking/${bookingId}`, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        cookie: `token=${token}`,
      },
    });
  }

  async deleteBooking(bookingId, token) {
    return this.request.delete(`${this.baseURL}/booking/${bookingId}`, {
      headers: { cookie: `token=${token}` },
    });
  }
}