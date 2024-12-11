import { expect } from "@playwright/test"

export class CompaniesListPage {
   constructor(page) {
      this.page = page

      this.companyNameLinks = page.locator('div.tabulator-table a')

   }

   clickOnCompanyName = async () => {
      await this.companyNameLinks.filter({ hasText: 'Тестовая компания' }).waitFor()
      await this.companyNameLinks.filter({ hasText: 'Тестовая компания' }).click()
      await this.page.waitForURL('/company/51/edit')
   }
}