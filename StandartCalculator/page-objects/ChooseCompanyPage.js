export class ChooseCompanyPage {
    constructor(page) {
        this.page = page
        this.submitButton = page.locator("form button[type='submit']")
        this.companyList = page.locator("form select#company_id")
    }

    choosingCompany = async () => {
        await this.page.waitForURL(/company/)
        await this.companyList.waitFor()
        await this.companyList.selectOption({ value: "51" })
        await this.submitButton.click()
    }
}