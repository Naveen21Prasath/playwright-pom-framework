import { test as base } from "playwright-bdd";
import { standardUser } from "../data/users";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

type FrameworkFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loggedInInventory: InventoryPage;
};

export const test = base.extend<FrameworkFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  loggedInInventory: async ({ page }, use) => {
    const user = standardUser();
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.open();
    await loginPage.login(user.username, user.password);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from "@playwright/test";
