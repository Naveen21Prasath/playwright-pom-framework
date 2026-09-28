# Playwright POM framework

Portfolio sample that shows how a Playwright suite can be structured. It is not employer source code, and it does not contain production URLs, customer data, or secrets.

The UI tests run against [SauceDemo](https://www.saucedemo.com), a public demo shop. The username `standard_user` and password `secret_sauce` are published by that site for practice. The API test calls [JSONPlaceholder](https://jsonplaceholder.typicode.com), a public fake API.

Work pipelines I use are Jenkins and GitLab CI. The workflow in `.github/workflows/playwright.yml` is only how this public repository runs on GitHub.

## Structure

```text
playwright.config.ts          Environment base URL, HTML report, parallel runs, CI retries
src/pages/                    Page Object Model (login, inventory)
src/fixtures/test.ts          Page fixtures and a logged-in inventory fixture
src/data/users.json           Data-driven login cases
tests/ui/                     UI specs
tests/api/                    API spec using Playwright request context
.github/workflows/playwright.yml
```

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npx playwright install chromium
copy .env.example .env
```

On macOS or Linux, use `cp .env.example .env`. The `.env` file is optional. Defaults point at SauceDemo and JSONPlaceholder.

## Run

```bash
npm test
npm run test:ui
npm run test:api
npm run report
```

`playwright.config.ts` turns on parallel execution. In CI it also retries a failed test once and records a trace on the first retry.

## Publish this folder

Create an empty public GitHub repository named `playwright-pom-framework`. Do not add a README, license, or `.gitignore` on GitHub, because this folder already has them.

From this folder:

```bash
git remote add origin https://github.com/<your-username>/playwright-pom-framework.git
git push -u origin main
```

The public URL is `https://github.com/<your-username>/playwright-pom-framework`.
