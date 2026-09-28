import { loadUsers } from "../../src/data/users";
import { test, expect } from "../../src/fixtures/test";

const users = loadUsers();

for (const user of users) {
  test(`login: ${user.name}`, async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(user.username, user.password);

    if (user.expected === "success") {
      await inventoryPage.expectLoaded();
      expect(await inventoryPage.productCount()).toBeGreaterThan(0);
      return;
    }

    await loginPage.expectLockedOut();
  });
}
