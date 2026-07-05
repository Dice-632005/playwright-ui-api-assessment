# Playwright UI and API Assessment

This repository contains Playwright-based test automation for:

- UI tests for SauceDemo flows
- API tests for Restful-Booker

## API Testing Scope (Restful-Booker)

API under test:

- https://restful-booker.herokuapp.com/apidoc/index.html

Covered in `tests/api/restful-booker.spec.js`:

- Authentication (`POST /auth`)
- Booking CRUD lifecycle
	- Create (`POST /booking`)
	- Read (`GET /booking/{id}`)
	- Update (`PUT /booking/{id}`)
	- Delete (`DELETE /booking/{id}`)
- Response validation
	- Status codes
	- Content type checks
	- Required response shape checks
	- Business checks for updated and deleted booking data

## Test Data Management

API test data lives in `tests/test-data.js` and is centralized via:

- `apiTestData` for static defaults (auth, booking defaults, updated booking values)
- `buildBookingPayload()` to generate unique booking data per run
- `buildUpdatedBookingPayload(existingBooking)` to build deterministic update payloads

This approach keeps test code clean and avoids hardcoding data in spec files.

## Install

```bash
npm install
```

## Credentials via Environment Variables

Credentials are loaded from environment variables only. A local `.env` file is supported for local runs and should not be committed.

For local execution, create `.env` by copying `.env.example`, then replace all `__REQUIRED__` values with real usernames and passwords.

PowerShell example:

```powershell
Copy-Item .env.example .env
```

Supported variable names:

- SauceDemo standard user: `SAUCE_USERNAME`
- SauceDemo standard password: `SAUCE_PASSWORD`
- SauceDemo locked user: `SAUCE_LOCKED_OUT_USERNAME`, `SAUCE_LOCKED_OUT_PASSWORD`
- SauceDemo problem user: `SAUCE_PROBLEM_USERNAME`, `SAUCE_PROBLEM_PASSWORD`
- SauceDemo performance user: `SAUCE_PERFORMANCE_USERNAME`, `SAUCE_PERFORMANCE_PASSWORD`
- SauceDemo error user: `SAUCE_ERROR_USERNAME`, `SAUCE_ERROR_PASSWORD`
- SauceDemo visual user: `SAUCE_VISUAL_USERNAME`, `SAUCE_VISUAL_PASSWORD`
- Restful-Booker username: `BOOKER_USERNAME`
- Restful-Booker password: `BOOKER_PASSWORD`

All usernames and passwords above are required. If any variable is missing or blank, tests fail fast.

There are no hardcoded credential fallbacks in test code. If required variables are missing, test execution fails.

In GitHub Actions, CI validates required secrets before running tests and fails the workflow if any are missing.

Example `.env`:

```env
SAUCE_USERNAME=__REQUIRED__
SAUCE_PASSWORD=__REQUIRED__
SAUCE_LOCKED_OUT_USERNAME=__REQUIRED__
SAUCE_LOCKED_OUT_PASSWORD=__REQUIRED__
SAUCE_PROBLEM_USERNAME=__REQUIRED__
SAUCE_PROBLEM_PASSWORD=__REQUIRED__
SAUCE_PERFORMANCE_USERNAME=__REQUIRED__
SAUCE_PERFORMANCE_PASSWORD=__REQUIRED__
SAUCE_ERROR_USERNAME=__REQUIRED__
SAUCE_ERROR_PASSWORD=__REQUIRED__
SAUCE_VISUAL_USERNAME=__REQUIRED__
SAUCE_VISUAL_PASSWORD=__REQUIRED__
BOOKER_USERNAME=__REQUIRED__
BOOKER_PASSWORD=__REQUIRED__
```

## Run API Tests

Run the API suite only:

```bash
npm run test:api
```

Equivalent direct command:

```bash
npx playwright test tests/api/restful-booker.spec.js --workers=1 --project=api
```

## Reporting

Playwright is configured to generate:

- List reporter (terminal)
- Playwright HTML report at `playwright-report/`
- Monocart custom report at `monocart-report/sauceDemoMonocartReport.html`

Open Playwright HTML report:

```bash
npm run report:html
```

Open Monocart report by opening this file in your browser:

- `monocart-report/sauceDemoMonocartReport.html`

Or run:

```bash
npm run report:monocart
```

## CI/CD (GitHub Actions)

Workflow file:

- `.github/workflows/suaceDemo-ui-api-tests.yml`

What it does:

- Runs on push and pull request
- Installs dependencies with `npm ci`
- Executes API tests with Playwright
- Uploads both Playwright HTML and Monocart reports as build artifacts