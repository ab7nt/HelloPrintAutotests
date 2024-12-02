import { expect } from "@playwright/test"

export class LeftSideMenu {
   constructor(page) {
      this.page = page

      this.userInformationBlock = page.locator('div.user-information__container.user-desktop-container')
      this.userCompany = this.userInformationBlock.locator('div.user-company')
   }

   getUserCompanyInfo = async () => {
      await this.userCompany.innertext()
   }

}