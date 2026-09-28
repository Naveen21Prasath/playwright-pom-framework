# Playwright POM framework

Portfolio sample of a Playwright framework. It is not employer source code, and it does not contain production URLs, customer data, or secrets.

UI tests run against [SauceDemo](https://www.saucedemo.com). The username `standard_user` and password `secret_sauce` are published by that site. API checks call [JSONPlaceholder](https://jsonplaceholder.typicode.com).

Work pipelines I use are Jenkins and GitLab CI. This repository runs on GitHub Actions.

## Structure

```text
playwright.config.ts                         Environment base URL, parallel runs, CI retries, Allure
features/login.feature                       Playwright-BDD scenario
steps/login.steps.ts                         Step definitions using the page objects
src/pages/                                   Page Object Model
src/fixtures/test.ts                         Page fixtures and a logged-in fixture
src/data/users.json                          JSON test data for login
tests/ui/                                    Playwright UI specs
tests/api/                                   Playwright API spec
collections/jsonplaceholder.postman_collection.json
                                             Newman collection
.github/workflows/playwright.yml             GitHub Actions: Playwright, then Newman
```

## Environment and secrets

Copy `.env.example` to `.env` when you want to override the defaults:

```text
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://jsonplaceholder.typicode.com
```

`.env` is gitignored. The sample has no production credentials. Demo login values live in `src/data/users.json` because SauceDemo publishes them.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npx playwright install chromium
```

## Run

```bash
npm test
npm run test:bdd
npm run test:newman
npm run allure:report
```

`npm test` runs the Playwright specs and the BDD scenario. Allure writes `allure-results/`. `npm run allure:report` builds `allure-report/`. Newman runs the Postman collection from the command line, the same way it can run in CI.
