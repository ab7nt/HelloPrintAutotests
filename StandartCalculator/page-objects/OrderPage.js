import { expect } from "@playwright/test"
import { helpers } from "../utils/helpers"
import { filtersInfo } from "../data/filtersInfo"
import { createOrderInfo } from "../data/createOrderInfo"

export class OrderPage {
   constructor(page) {
      this.page = page

      // Общие локаторы
      this.optionList = page.locator('ul.select2-results__options li')
      this.successAlertCopyText = page.locator('div[role="alert"]').filter({ hasText: 'Данные скопированы в буфер обмена' })
      // Поп-ап срочности
      this.popUp = page.locator('div.modal-dialog').filter({ hasText: 'Стоимость заказа будет пересчитана' })
      this.popUpSubmitButton = this.popUp.locator('button.bootbox-accept')

      // Хлебные крошки
      this.headerTitle = page.locator('header span.page-header__title')
      // Блок с номером заказа и действиями
      this.expressSelect = page.locator('select[data-select2-id="custom_express"]')
      this.expressField = page.locator('span[aria-labelledby*="select2-custom_express"]')
      // Доп. номер
      this.additionalNumberField = page.locator('div:has(select[name="additional_number[]"]) > span')
      this.additionalNumberSelect = page.locator('select[name="additional_number[]"]')
      this.additionalNumberInput = page.locator('input[aria-controls*="select2-additional_number"]')
      this.additionalNumber = page.locator('li[title="Test123123123"]')


      // Заказчик
      this.partner = page.locator('span[id*="select2-partner_id"]')
      this.partnerUser = page.locator('span[id*="select2-partner_user_id"]')
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
      expect(this.popUp).toBeVisible()
      await this.popUpSubmitButton.click()
      expect(this.popUp).not.toBeVisible()
   }
}