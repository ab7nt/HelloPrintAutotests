import { expect } from "@playwright/test"

export class LeftSideMenu {
   constructor(page) {
      this.page = page

      this.userInformationBlock = page.locator('div.user-information__container.user-desktop-container')
      this.userCompany = this.userInformationBlock.locator('div.user-company')
      this.firstLevelCashboxLink = page.locator('div[uitest="submenu-mob-cashbox"]')
      this.secondLevelCalculatorItemsLink = page.locator('li[uitest="calculator-items"]').filter({ hasText: 'Рабочее место оператора' })
      this.firstLevelSettingsLink = page.locator('div[uitest="config"]')
      this.secondLevelCompanyLink = page.locator('li[uitest="company"]')
      this.firstLevelOrderLink = page.locator('div[uitest="submenu-mob-orders"]')
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

   goToTheCashierPage = async () => {
      await this.firstLevelCashboxLink.waitFor()
      await this.firstLevelCashboxLink.hover()
      await this.secondLevelCalculatorItemsLink.waitFor()
      await this.secondLevelCalculatorItemsLink.click()
      await this.page.waitForURL('/cashier/create')
   }

   goToTheOrderRegisterPage = async () => {
      await this.firstLevelOrderLink.waitFor()
      await this.firstLevelOrderLink.click()
      await this.page.waitForURL('/order')
   }
}