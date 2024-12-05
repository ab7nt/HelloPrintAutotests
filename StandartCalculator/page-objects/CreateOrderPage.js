import { expect } from "@playwright/test"
import { createOrderInfo } from "../data/createOrderInfo"

export class CreateOrderPage {
   constructor(page) {
      this.page = page
      // this.leftSideMenu = new LeftSideMenu(page)

      // Общие локаторы
      this.optionList = page.locator('ul.select2-results__options li')
      this.submitButton = page.locator('input[type="submit"]')
      this.successAlertCopyText = page.locator('div[role="alert"]').filter({ hasText: 'Данные скопированы в буфер обмена' })
      this.successAlertCopyTextCloseButton = this.successAlertCopyText.locator('button.close')

      // Заказчик:
      // Контрагент
      this.partnerField = page.locator('span[aria-labelledby*="select2-partner_id"]')
      this.partnerSelect = page.locator('select[uitest="order-partner"]')
      this.partnerInput = page.locator('input[aria-controls*="select2-partner_id"]')
      this.partnerCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Контрагент")) + div span.copygray svg')
      this.partnerInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Контрагент")) + div span.select2-prepend svg')
      // Представитель
      this.chooseUserPartnerButton = page.locator('a#choose_userpartner_btn')
      this.partnerUserField = page.locator('span[aria-labelledby*="select2-partner_user_id"]')
      this.partnerUserSelect = page.locator('select[uitest="order-partner-user"]')
      this.partnerUserInput = page.locator('input[aria-controls*="select2-partner_user_id"]')
      this.partnerUserCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Представитель")) + div span.copygray svg')
      this.partnerUserInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Представитель")) + div span.select2-prepend svg')
      // Телефон
      this.phoneField = page.locator('span[aria-labelledby*="select2-partner_phone"]')
      this.phoneSelect = page.locator('select[uitest="order-partner-phone"]')
      this.phoneCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Телефон")) + div span.copygray svg')
      this.phoneInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Телефон")) + div span.select2-prepend svg')
      // Email
      this.emailField = page.locator('span[aria-labelledby*="select2-partner_email"]')
      this.emailSelect = page.locator('select[uitest="order-partner-email"]')
      this.emailCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Email")) + div span.copygray svg')
      this.emailInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Email")) + div span.select2-prepend svg')
      // Telegram
      this.telegramField = page.locator('span[aria-labelledby*="select2-partner_telegram"]')
      this.telegramSelect = page.locator('select[name="partner_telegram"]')
      this.telegramCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Телеграм")) + div span.copygray svg')
      this.telegramInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Телеграм")) + div span.select2-prepend svg')
      // Vk
      this.vkField = page.locator('span[aria-labelledby*="select2-partner_vk"]')
      this.vkSelect = page.locator('select[name="partner_vk"]')
      this.vkCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Вконтакте")) + div span.copygray svg')
      this.vkInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Вконтакте")) + div span.select2-prepend svg')
      // Instagram
      this.instagramField = page.locator('span[aria-labelledby*="select2-partner_instagram"]')
      this.instagramSelect = page.locator('select[name="partner_instagram"]')
      this.instagramCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Инстаграм")) + div span.copygray svg')
      this.instagramInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Инстаграм")) + div span.select2-prepend svg')
      // Юр. лицо
      this.legalEntitySelect = page.locator('select[name="partner_company_id"]')
      this.legalEntityCopyTextButton = page.locator('div.col-xl-4:has(label:has-text("Юр. лицо")) + div span.copygray svg')
      this.legalEntityInNewTabButton = page.locator('div.col-xl-4:has(label:has-text("Юр. лицо")) + div span.select2-prepend svg')

      // Пaраметры:
      // Оформленно в
      this.orderObjectField = page.locator('span[id*="select2-object_id"]')
      this.orderObjectSelect = page.locator('select[uitest="order-object"]')
      // Правки по макету
      this.layoutField = page.locator('span[aria-labelledby*="select2-is_layout"]')
      this.layoutSelect = page.locator('select[uitest="order-layout"]')
      // Срочность
      this.expressField = page.locator('span[aria-labelledby*="select2-custom_express"]')
      this.expressSelect = page.locator('select[id="custom_express"]')
      // Крупногабаритный
      this.oversizedField = page.locator('span[aria-labelledby*="select2-is_oversized"]')
      this.oversizedSelect = page.locator('select[uitest="order-oversized"]')
      // Объёмный заказ
      this.volumeField = page.locator('span[aria-labelledby*="select2-is_volume"]')
      this.volumeSelect = page.locator('select[uitest="order-volume"]')
      // Офсетная печать
      this.offsetField = page.locator('span[aria-labelledby*="select2-is_offset"]')
      this.offsetSelect = page.locator('select[name="is_offset_order"]')
      // Комментарий к выдаче
      this.extraditionCommentField = page.locator('span[id*="select2-comment"]')
      this.extraditionCommentSelect = page.locator('select[uitest="order-comment"]')
      this.extraditionCommentInput = page.locator('input[aria-controls*="select2-comment"]')

      // Дополнительно:
      // Источник
      this.sourceField = page.locator('span[id*="select2-source_id"]')
      this.sourceSelect = page.locator('select[uitest="order-source"]')
      this.sourceInput = page.locator('input[aria-controls*="select2-source_id"]')
      // Реклама
      this.adSourceField = page.locator('span[id*="select2-ad_source_id"]')
      this.adSourceSelect = page.locator('select[uitest="order-ad-source"]')
      this.adSourceInput = page.locator('input[aria-controls*="select2-ad_source_id"]')
   }

   selectPartner = async () => {
      await this.partnerField.waitFor()
      await this.partnerField.click()
      await this.partnerInput.fill(createOrderInfo.partner)
      await expect(this.partnerInput).toHaveValue(createOrderInfo.partner)
      await this.optionList.filter({ hasText: new RegExp(`^${createOrderInfo.partner}$`) }).click()
      expect(await this.partnerSelect.locator('option:checked').innerText()).toEqual(createOrderInfo.partner)
   }

   selectPartnerUser = async () => {
      await this.chooseUserPartnerButton.waitFor()
      await this.chooseUserPartnerButton.click()
      await this.partnerUserField.waitFor()
      await this.partnerUserField.click()
      await this.optionList.filter({ hasText: createOrderInfo.partnerUser }).click()
      // expect(await this.orderPartnerUserSelect.locator('option:checked').innerText()).toEqual(`${createOrderInfo.partnerUser} (${createOrderInfo.partner})`)
      expect(await this.partnerUserSelect).toContainText(`${createOrderInfo.partnerUser} (${createOrderInfo.partner})`) // альтернативная проверка, так как некорретный текст в DOM'e
   }

   selectOrderObject = async () => {
      await this.orderObjectField.click()
      await this.optionList.filter({ hasText: 'Типография МДМпринт' }).click()
      expect(await this.orderObjectSelect.locator('option:checked').innerText()).toEqual('Типография МДМпринт')
   }

   selectLayout = async () => {
      await this.layoutField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.layoutSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   selectExpress = async () => {
      await this.expressField.click()
      await this.optionList.filter({ hasText: 'Срочность 10' }).click()
      expect(await this.expressSelect.locator('option:checked').innerText()).toEqual('Срочность 10')
   }

   selectOversized = async () => {
      await this.oversizedField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.oversizedSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   selectVolume = async () => {
      await this.volumeField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.volumeSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   selectOffset = async () => {
      await this.offsetField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.offsetSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   selectExtraditionComment = async () => {
      await this.extraditionCommentField.click()
      await this.optionList.filter({ hasText: 'оплачен' }).click()
      expect(await this.extraditionCommentSelect.locator('option:checked').innerText()).toEqual('оплачен')
   }

   selectSource = async () => {
      await this.sourceField.click()
      await this.optionList.filter({ hasText: 'mdmprint.ru' }).click()
      expect(await this.sourceSelect.locator('option:checked').innerText()).toEqual('mdmprint.ru')
   }

   selectAdSource = async () => {
      await this.adSourceField.click()
      await this.optionList.filter({ hasText: 'Perfect erp' }).click()
      expect(await this.adSourceSelect.locator('option:checked').innerText()).toEqual('Perfect erp')
   }

   collectingTextFromFilledFields = async () => {
      createOrderInfo.phone = await this.phoneField.innerText()
      createOrderInfo.email = await this.emailField.innerText()
      createOrderInfo.telegram = await this.telegramField.innerText()
      createOrderInfo.vk = await this.vkField.innerText()
      createOrderInfo.instagram = await this.instagramField.innerText()
      createOrderInfo.layout = await this.layoutField.innerText()
      createOrderInfo.express = await this.expressField.innerText()
      createOrderInfo.oversized = await this.oversizedField.innerText()
      createOrderInfo.volume = await this.volumeField.innerText()
      createOrderInfo.offset = await this.offsetField.innerText()
      createOrderInfo.source = await this.sourceField.innerText()
      createOrderInfo.adSource = await this.adSourceField.innerText()
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

   clickOnOpenNewTabButtonAndChecks = async (context, button, id) => {
      const [newPage] = await Promise.all([
         context.waitForEvent('page'),
         await button.first().click(),
      ]);
      // Ожидание загрузки новой вкладки
      await newPage.waitForLoadState()
      // Проверка, что URL соответствует ожидаемому
      expect(newPage.url()).toContain(`/${id}/edit`)
      await newPage.close()
   }
}