exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@id='username']");
    this.passwordInput = page.locator("//input[@id='password']");
    this.submitButton = page.locator("//button[@id='submit']");
  }

  async goto() {
    await this.page.goto("https://demo.snipeitapp.com/login");
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
};