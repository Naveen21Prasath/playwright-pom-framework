import { standardUser } from "../src/data/users";
import { expect, test } from "../src/fixtures/test";
import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd(test);

Given("the login page is open", async ({ loginPage }) => {
  await loginPage.open();
});

When("the standard user signs in", async ({ loginPage }) => {
  const user = standardUser();
  await loginPage.login(user.username, user.password);
});

Then("the inventory page shows products", async ({ inventoryPage }) => {
  await inventoryPage.expectLoaded();
  expect(await inventoryPage.productCount()).toBeGreaterThan(0);
});
