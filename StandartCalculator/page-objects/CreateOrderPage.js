import { expect } from "@playwright/test"
import { createOrderInfo } from "../data/createOrderInfo"

export class CreateOrderPage {
   constructor(page) {
      this.page = page
      // this.leftSideMenu = new LeftSideMenu(page)

      // Общие локаторы
      this.optionList = page.locator('ul.select2-results__options li')
      this.submitButton = page.locator('input[type="submit"]')

      // Заказчик
      // Контрагент
      this.orderPartnerField = page.locator('span[aria-labelledby*="select2-partner_id"]')
      this.orderPartnerSelect = page.locator('select[uitest="order-partner"]')
      this.orderPartnerSelectInput = page.locator('input[aria-controls*="select2-partner_id"]')
      // Представитель
      this.chooseUserPartnerButton = page.locator('a#choose_userpartner_btn')
      this.orderPartnerUserField = page.locator('span[aria-labelledby*="select2-partner_user_id"]')
      this.orderPartnerUserSelect = page.locator('select[uitest="order-partner-user"]')
      this.orderPartnerUserSelectInput = page.locator('input[aria-controls*="select2-partner_user_id"]')
      // Телефон
      this.orderPhone = page.locator('span[aria-labelledby*="select2-partner_phone"]')
      // Email
      this.orderEmail = page.locator('span[aria-labelledby*="select2-partner_email"]')

      // Пaраметры
      // Оформленно в
      this.orderObject = page.locator('span[id*="select2-object_id"]')
   }

   selectPartner = async () => {
      await this.orderPartnerField.waitFor()
      await this.orderPartnerField.click()
      await this.orderPartnerSelectInput.fill(createOrderInfo.partner)
      await expect(this.orderPartnerSelectInput).toHaveValue(createOrderInfo.partner)
      await this.optionList.filter({ hasText: new RegExp(`^${createOrderInfo.partner}$`) }).click()
      expect(await this.orderPartnerSelect.locator('option:checked').innerText()).toEqual(createOrderInfo.partner)
   }

   selectPartnerUser = async () => {
      await this.chooseUserPartnerButton.waitFor()
      await this.chooseUserPartnerButton.click()
      await this.orderPartnerUserField.waitFor()
      await this.orderPartnerUserField.click()
      await this.optionList.filter({ hasText: createOrderInfo.partnerUser }).click()
      // expect(await this.orderPartnerUserSelect.locator('option:checked').innerText()).toEqual(`${createOrderInfo.partnerUser} (${createOrderInfo.partner})`)
      expect(await this.orderPartnerUserSelect).toContainText(`${createOrderInfo.partnerUser} (${createOrderInfo.partner})`) // альтернативная проверка, так как некорретный текст в DOM'e

      createOrderInfo.phone = await this.orderPhone.innerText()
      createOrderInfo.email = await this.orderEmail.innerText()
   }

   clickOnNewOrderButton = async () => {
      await this.submitButton.waitFor()
      await this.submitButton.click()
      await this.page.waitForURL(/\/order\/\d+\/edit/)
   }
}