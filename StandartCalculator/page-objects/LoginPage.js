import { UserInfo } from "../data/userInfo"

export class LoginPage {
    constructor(page) {
        this.page = page
        this.loginInput = page.locator("form input#name")
        this.passwordInput = page.locator("form input#password")
        this.submitButton = page.locator("form button[type='submit']")
    }

    enterUsernameAndPassword = async () => {
        await this.loginInput.waitFor()
        await this.loginInput.fill(UserInfo.name)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(UserInfo.password)
        await this.submitButton.click()
    }
}