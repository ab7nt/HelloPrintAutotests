import { expect } from "@playwright/test"
import { helpers } from "../utils/helpers"
import { createOrderInfo } from "../data/createOrderInfo"
import { orderInfo } from "../data/orderInfo"

export class OrderPage {
   constructor(page) {
      this.page = page

      // Общие локаторы
      this.optionList = page.locator('ul.select2-results__options li')
      this.successAlertCopyText = page.locator('div[role="alert"]').filter({ hasText: 'Данные скопированы в буфер обмена' })
      this.successAlertSaveChanges = page.locator('div[role="alert"]').filter({ hasText: 'Информация о заказе успешно обновлена' })
      this.openHistoryTabButton = page.locator('span.open-history-tab')

      // Хлебные крошки
      this.headerTitle = page.locator('header span.page-header__title')

      // Поп-апы
      // Срочность
      this.popUpExpress = page.locator('div.modal-dialog').filter({ hasText: 'Стоимость заказа будет пересчитана' })
      this.popUpExpressSubmitButton = this.popUpExpress.locator('button.bootbox-accept')
      // Причина отмены
      this.popUpCancel = page.locator('div.modal-dialog').filter({ hasText: 'Укажите причину отмены заказа' })
      this.popUpCancelReasonButtons = this.popUpCancel.locator('div.reason_button')
      this.popUpTitleReasonForCancellation = this.popUpCancel.locator('h3').filter({ hasText: orderInfo.reasonForCancellation })
      this.popUpCancelComment = this.popUpCancel.locator('textarea[name="reason_cancellation"]')
      this.popUpCancelSubmitButton = this.popUpCancel.locator('button#saveBtn')
      // Ограничения
      this.popUpLimits = page.locator('div.modal-dialog').filter({ hasText: 'Заказ не готов к получению статуса' }).first()
      this.popUpLimitsTitle = page.locator('div.modal-dialog').locator('h4')

      // Блок с номером заказа и действиями
      // Срочность
      this.expressSelect = page.locator('select[data-select2-id="custom_express"]')
      this.expressField = page.locator('span[aria-labelledby*="select2-custom_express"]')
      // Доп. номер
      this.additionalNumberField = page.locator('div:has(select[name="additional_number[]"]) > span')
      this.additionalNumberSelect = page.locator('select[name="additional_number[]"]')
      this.additionalNumberInput = page.locator('input[aria-controls*="select2-additional_number"]')
      this.additionalNumber = page.locator('li[title="Test123123123"]')
      // Статус заказа
      this.orderStatusField = page.locator('div.status-container span[aria-labelledby*="select2-status_id"]')
      this.orderStatusSelect = page.locator('select[name="status_id"]')

      // Заказчик
      this.partner = page.locator('span[id*="select2-partner_id"]')
      this.chooseUserPartnerButton = page.locator('a#add_partner_user_btn')
      this.partnerUser = page.locator('span[id*="select2-partner_user_id"]')
      this.partnerUserSelect = page.locator('select[name="partner_user_id"]')
      this.phone = page.locator('span[id*="select2-partner_phone"]')
      this.email = page.locator('span[id*="select2-partner_email"]')
      this.telegram = page.locator('span[id*="select2-partner_telegram"]')
      this.vk = page.locator('span[id*="select2-partner_vk"]')
      this.instagram = page.locator('span[id*="select2-partner_instagram"]')

      // Параметры
      // Параметры относящиеся к компании
      this.ownerCompanyField = page.locator('span[aria-labelledby*="select2-company_id"]')
      this.ownerCompanySelect = page.locator('select[name="company_id"]')
      this.creatorCompanyField = page.locator('span[aria-labelledby*="select2-object_id"]')
      this.creatorCompanySelect = page.locator('select[name="object_id"]')
      this.performedCompanyField = page.locator('span[aria-labelledby*="select2-company_performed_id"]')
      this.performedCompanySelect = page.locator('select[name="company_performed_id"]')
      this.issueCompanyField = page.locator('span[aria-labelledby*="select2-company_issue_id"]')
      this.issueCompanySelect = page.locator('select[name="company_issue_id"]')
      this.paymentCompanyInput = page.locator('input[id="legal-entity-payment"]')
      // Остальные параметры
      this.layoutSelect = page.locator('select[name="is_layout_edit"]')
      this.layoutField = page.locator('span[aria-labelledby*="select2-is_layout_edit"]')
      this.volumeSelect = page.locator('select[name="is_volume_order"]')
      this.volumeField = page.locator('span[aria-labelledby*="select2-is_volume_order"]')
      this.oversizedSelect = page.locator('select[name="is_oversized_order"]')
      this.oversizedField = page.locator('span[aria-labelledby*="select2-is_oversized"]')
      this.offsetSelect = page.locator('select[name="is_offset_order"]')
      this.offsetField = page.locator('span[aria-labelledby*="select2-is_offset_order"]')
      this.adSourceSelect = page.locator('select[name="ad_source_id"]')
      this.adSourceField = page.locator('span[aria-labelledby*="select2-ad_source_id"]')
      this.sourceSelect = page.locator('select[name="source_id"]')
      this.sourceField = page.locator('span[aria-labelledby*="select2-source_id"]')

      // Менеджер заказа
      this.managerField = page.locator('span[aria-labelledby*="select2-manager_id"]')
   }

   selectPartnerType = async () => {

   }

   enterAdditionalNumber = async () => {
      await this.additionalNumberField.waitFor()
      await this.additionalNumberField.click()
      await this.additionalNumberInput.fill(createOrderInfo.additionalNumber)
      await this.optionList.filter({ hasText: createOrderInfo.additionalNumber }).click()
   }

   clickOnAdditionalNunber = async () => {
      await this.additionalNumber.waitFor()
      await this.additionalNumber.click()
      await helpers.checkClipboardText(this.page, (await (this.additionalNumber).innerText()).slice(1))
      await expect(this.successAlertCopyText).toBeVisible()
   }

   selectExpress = async () => {
      await this.expressField.waitFor()
      await this.expressField.click()
      await this.optionList.filter({ hasText: 'Срочность 10' }).click()
      expect(createOrderInfo.express).toBe(await this.expressField.innerText())
      expect(this.popUpExpress).toBeVisible()
      await this.popUpExpressSubmitButton.click()
      expect(this.popUpExpress).not.toBeVisible()
   }

   selectOrderStatus = async (status) => {
      await this.orderStatusField.waitFor()
      await this.orderStatusField.click()
      await this.optionList.filter({ hasText: status }).click()
   }

   selectOrderStatusAndChecks = async (status) => {
      await this.orderStatusField.waitFor()
      await this.orderStatusField.click()
      await this.optionList.filter({ hasText: status }).click()
      await expect(this.successAlertSaveChanges).toBeVisible()
      expect(await this.orderStatusField.innerText()).toBe(status)
      // await this.page.reload()
      await this.page.waitForLoadState('networkidle')
      expect(await this.orderStatusField.innerText()).toBe(status)
   }

   selectCancelStatus = async () => {
      await this.orderStatusField.waitFor()
      await this.orderStatusField.click()
      await this.optionList.filter({ hasText: orderInfo.statusCanceled }).waitFor()
      await this.optionList.filter({ hasText: orderInfo.statusCanceled }).click()
   }

   selectReasonForCancellation = async (reason) => {
      await expect(this.popUpCancel).toBeVisible()
      await this.popUpCancelReasonButtons.filter({ hasText: reason }).click()
   }

   fillReasonForCancellation = async () => {
      await expect(this.popUpTitleReasonForCancellation).toBeVisible()
      await this.popUpCancelComment.waitFor()
      await this.popUpCancelComment.fill(orderInfo.reasonForCancellation)
      expect(this.popUpCancelComment).toHaveValue(orderInfo.reasonForCancellation)
   }

   clickOnSubmitButtonInPopUpCancel = async () => {
      await this.popUpCancelSubmitButton.click()
      await expect(this.popUpTitleReasonForCancellation).not.toBeVisible()
      await this.page.waitForLoadState('networkidle')
      expect(await this.orderStatusField.innerText()).toBe(orderInfo.statusCanceled)
   }

   clickOnHistoryButton = async () => {
      await this.openHistoryTabButton.waitFor()
      await this.openHistoryTabButton.click()
      expect(await this.page.locator('div#history').innerText()).toContain(`Причина: ${orderInfo.reasonForCancellation}`)
   }

   selectYesInToLayoutParameter = async () => {
      await this.layoutField.waitFor()
      await this.layoutField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.layoutSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   selectYesInToVolumeParameter = async () => {
      await this.volumeField.waitFor()
      await this.volumeField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.volumeSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   selectYesInToOversizedParameter = async () => {
      await this.oversizedField.waitFor()
      await this.oversizedField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.oversizedSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   selectYesInToOffsetParameter = async () => {
      await this.offsetField.waitFor()
      await this.offsetField.click()
      await this.optionList.filter({ hasText: 'Да' }).click()
      expect(await this.offsetSelect.locator('option:checked').innerText()).toEqual('Да')
   }

   chooseUserPartner = async () => {
      await this.chooseUserPartnerButton.waitFor()
      await this.chooseUserPartnerButton.click()
      await this.partnerUser.waitFor()
      await this.partnerUser.click()
      await this.optionList.filter({ hasText: createOrderInfo.partnerUser }).click()
      expect(await this.partnerUserSelect.locator('option:checked').innerText())
         .toEqual(`${createOrderInfo.partnerUser} (${createOrderInfo.partner})`)
   }
}