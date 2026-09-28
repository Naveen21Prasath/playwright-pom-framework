import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(private readonly page: Page) {
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.error = page.locator("[data-test='error']");
  }

  async open(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectLockedOut(): Promise<void> {
    await expect(this.error).toContainText("locked out");
  }
}
