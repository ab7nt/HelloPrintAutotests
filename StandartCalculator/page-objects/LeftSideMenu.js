import { expect } from "@playwright/test"

export class LeftSideMenu {
   constructor(page) {
      this.page = page

      this.userInformationBlock = page.locator('div.user-information__container.user-desktop-container')
      this.userCompany = this.userInformationBlock.locator('div.user-company')
      this.firstLevelSettingsLink = page.locator('div[uitest="config"]')
      this.secondLevelCompanyLink = page.locator('li[uitest="company"]')
   }

   getUserCompanyInfo = async () => {
      await this.userCompany.innertext()
   }

   goToTheCompanySettingsPage = async () => {
      await this.firstLevelSettingsLink.waitFor()
      await this.firstLevelSettingsLink.hover()
      await this.secondLevelCompanyLink.waitFor()
      await this.secondLevelCompanyLink.click()
      await this.page.waitForURL('/company')
   }
}