import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly phoneInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(private page: Page) {
        this.phoneInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: /đăng nhập|login/i });
    }

    async navigate() {
        await this.page.goto('/login');
        await expect(this.page).toHaveURL(/\/login/i);
        await expect(this.phoneInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
    }

    async login(phone: string, password: string) {
        await this.phoneInput.fill(phone);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoggedIn() {
        await expect(this.page).toHaveURL(/\/vi\/dashboard\/all/i, { timeout: 20_000 });
    }
}