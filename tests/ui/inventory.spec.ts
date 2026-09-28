import { expect, test } from "../../src/fixtures/test";

test("add a product to the cart", async ({ loggedInInventory }) => {
  expect(await loggedInInventory.productCount()).toBeGreaterThan(0);
  await loggedInInventory.addBackpackToCart();
  await loggedInInventory.expectCartCount(1);
});
