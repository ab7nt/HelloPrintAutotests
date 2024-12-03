import { expect } from "@playwright/test"
import { createOrderInfo } from "../data/createOrderInfo"
import exp from "constants"

export class CreateOrderPage {
   constructor(page) {
      this.page = page
      // this.leftSideMenu = new LeftSideMenu(page)

      // Общие локаторы
      this.optionList = page.locator('ul.select2-results__options li')
      this.submitButton = page.locator('input[type="submit"]')
      this.successAlertCopyText = page.locator('div[role="alert"]').filter({ hasText: 'Данные скопированы в буфер обмена' })
      this.successAlertCopyTextCloseButton = this.successAlertCopyText.locator('button.close')

      // Заказчик
      // Контрагент
      this.orderPartnerField = page.locator('span[aria-labelledby*="select2-partner_id"]')
      this.orderPartnerSelect = page.locator('select[uitest="order-partner"]')
      this.orderPartnerSelectInput = page.locator('input[aria-controls*="select2-partner_id"]')
      this.orderPartnerCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Контрагент")) + div span.copygray svg')
      // Представитель
      this.chooseUserPartnerButton = page.locator('a#choose_userpartner_btn')
      this.orderPartnerUserField = page.locator('span[aria-labelledby*="select2-partner_user_id"]')
      this.orderPartnerUserSelect = page.locator('select[uitest="order-partner-user"]')
      this.orderPartnerUserSelectInput = page.locator('input[aria-controls*="select2-partner_user_id"]')
      this.orderPartnerUserCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Представитель")) + div span.copygray svg')
      // Телефон
      this.orderPhoneField = page.locator('span[aria-labelledby*="select2-partner_phone"]')
      this.orderPhoneSelect = page.locator('select[uitest="order-partner-phone"]')
      this.orderPhoneCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Телефон")) + div span.copygray svg')
      // Email
      this.orderEmailField = page.locator('span[aria-labelledby*="select2-partner_email"]')
      this.orderEmailSelect = page.locator('select[uitest="order-partner-email"]')
      this.orderEmailCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Email")) + div span.copygray svg')
      // Telegram
      this.orderTelegramField = page.locator('span[aria-labelledby*="select2-partner_telegram"]')
      this.orderTelegramSelect = page.locator('select[name="partner_telegram"]')
      this.orderTelegramCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Телеграм")) + div span.copygray svg')
      // Vk
      this.orderVkField = page.locator('span[aria-labelledby*="select2-partner_vk"]')
      this.orderVkSelect = page.locator('select[name="partner_vk"]')
      this.orderVkCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Вконтакте")) + div span.copygray svg')
      // Instagram
      this.orderInstagramField = page.locator('span[aria-labelledby*="select2-partner_instagram"]')
      this.orderInstagramSelect = page.locator('select[name="partner_instagram"]')
      this.orderInstagramCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Инстаграм")) + div span.copygray svg')
      // Юр. лицо
      this.orderLegalEntitySelect = page.locator('select[name="partner_company_id"]')
      this.orderLegalEntityCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Юр. лицо")) + div span.copygray svg')

      // Пaраметры
      // Оформленно в
      this.orderObject = page.locator('span[id*="select2-object_id"]')
      // Комментарий к выдаче
      this.extraditionComment = page.locator('span[id*="select2-comment"]')
      this.extraditionCommentSelect = page.locator('select[uitest="order-comment"]')
      this.extraditionCommentInput = page.locator('input[aria-controls*="select2-comment"]')
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

      createOrderInfo.phone = await this.orderPhoneField.innerText()
      createOrderInfo.email = await this.orderEmailField.innerText()
      createOrderInfo.telegram = await this.orderTelegramField.innerText()
      createOrderInfo.vk = await this.orderVkField.innerText()
      createOrderInfo.instagram = await this.orderInstagramField.innerText()
   }

   clickOnNewOrderButton = async () => {
      await this.submitButton.waitFor()
      await this.submitButton.click()
      await this.page.waitForURL(/\/order\/\d+\/edit/)
   }

   clickOnCopyToClipboardButton = async (button) => {
      await button.waitFor()
      await button.click()
      await expect(this.successAlertCopyText).toBeVisible()
      await this.successAlertCopyTextCloseButton.click()
      await expect(this.successAlertCopyText).not.toBeVisible()
   }
}