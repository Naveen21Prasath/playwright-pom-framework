import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly addBackpack: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator(".title");
    this.items = page.locator(".inventory_item");
    this.addBackpack = page.locator("[data-test='add-to-cart-sauce-labs-backpack']");
    this.cartBadge = page.locator(".shopping_cart_badge");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText("Products");
  }

  async productCount(): Promise<number> {
    return this.items.count();
  }

  async addBackpackToCart(): Promise<void> {
    await this.addBackpack.click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }
}
