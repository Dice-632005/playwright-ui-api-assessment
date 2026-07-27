import { expect } from '@playwright/test';

/**
 * Asserts HTTP status and JSON content type.
 * @param {import('@playwright/test').APIResponse} response
 * @param {number|number[]} expectedStatus
 */
export function expectJsonResponse(response, expectedStatus = 200) {
  const allowedStatuses = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
  expect(allowedStatuses).toContain(response.status());
  expect(response.headers()['content-type']).toContain('application/json');
}

/**
 * Parses and validates token from auth response body.
 * @param {import('@playwright/test').APIResponse} authResponse
 * @returns {Promise<string>}
 */
export async function extractAuthToken(authResponse) {
  const authBody = await authResponse.json();
  expect(authBody.token).toBeTruthy();
  expect(typeof authBody.token).toBe('string');
  return authBody.token;
}