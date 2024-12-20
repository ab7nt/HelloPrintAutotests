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
      // Вкладки
      this.stageTab = page.locator('a#stage_new_tab')
      // Нижние кнопки 
      this.moreButton = page.locator('div.order-general-info button.more')
      this.saveAndCloseButton = page.locator('div.order-general-info input[value="Сохранить и закрыть"]')
      this.saveButton = page.locator('div.order-general-info input[value="Сохранить"]')


      // Поп-апы
      // Срочность
      this.popupExpress = page.locator('div.modal-dialog').filter({ hasText: 'Стоимость заказа будет пересчитана' })
      this.popupExpressSubmitButton = this.popupExpress.locator('button.bootbox-accept')
      // Причина отмены
      this.popupCancel = page.locator('div.modal-dialog').filter({ hasText: 'Укажите причину отмены заказа' })
      this.popupCancelReasonButtons = this.popupCancel.locator('div.reason_button')
      this.popupTitleReasonForCancellation = this.popupCancel.locator('h3').filter({ hasText: orderInfo.reasonForCancellation })
      this.popupCancelComment = this.popupCancel.locator('textarea[name="reason_cancellation"]')
      this.popupCancelSubmitButton = this.popupCancel.locator('button#saveBtn')
      // Ограничения
      this.popupLimits = page.locator('div.modal-dialog').filter({ hasText: 'Заказ не готов к получению статуса' }).first()
      this.popupLimitsTitle = page.locator('div.modal-dialog').locator('h4')
      // Изменить менеджера
      this.popupChangeManager = page.locator('div.modal-dialog').filter({ hasText: 'Изменить менеджера' })
      this.popupChangeManagerSaveButton = this.popupChangeManager.locator('button#saveManagerBtn')

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
      this.createPartnerButton = this.optionList.filter({ hasText: '+ Добавить' })
      this.partnerField = page.locator('span[id*="select2-partner_id"]')
      this.chooseUserPartnerButton = page.locator('a#add_partner_user_btn')
      this.partnerUserField = page.locator('span[id*="select2-partner_user_id"]')
      this.partnerUserSelect = page.locator('select[name="partner_user_id"]')
      this.phone = page.locator('span[id*="select2-partner_phone"]')
      this.email = page.locator('span[id*="select2-partner_email"]')
      this.telegram = page.locator('span[id*="select2-partner_telegram"]')
      this.vk = page.locator('span[id*="select2-partner_vk"]')
      this.instagram = page.locator('span[id*="select2-partner_instagram"]')

      // Сроки
      // this.dateTimePicker = page.locator('div.xdsoft_datetimepicker[style*="display: block"]')
      this.labelForIssueAt = page.locator('label[for="issue_at"]')
      this.openedDateTimePickerSelector = 'div.xdsoft_datetimepicker[style*="display: block"]'
      this.issueAtInput = page.locator('input[name="issue_at"]')
      this.layoutAtInput = page.locator('input[name="layout_at"]')
      this.impositionAtInput = page.locator('input[name="imposition_at"]')
      this.prepressAtInput = page.locator('input[name="prepress_at"]')
      this.productionAtInput = page.locator('input[name="production_at"]')
      this.deliveryAtInput = page.locator('input[name="delivery_at"]')

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
      this.changeManagerButton = page.locator('div#change-manager-btn')

      // Локаторы для блока с дополнительной инофрмацией
      this.moreBlockInfo = page.locator('div.more-info-block')
      // Подрядчики
      // Организация
      this.contractorOrganizationField = page.locator('span[aria-labelledby*="select2-partners"]').first()
      this.contractorOrganizationSelect = page.locator('select[name="partners[]"]')
      this.contractorOrganizationInput = page.locator('input[aria-controls*="select2-partners"]')
      // Номера заказов
      this.contractorOrderNumbersField = page.locator('div:has(select[name="orders[1][]"]) > span')
      this.contractorOrderNumbersSelect = page.locator('select[name="orders[1][]"]')
      this.contractorOrderNumbersInput = page.locator('input[aria-controls*="select2-orders1"]')
      this.contractorNumber = page.locator(`li[title="${orderInfo.contractorNumber}"]`)
      // Дата поставки
      this.contractorDeliveryDateInput = page.locator('input[name="delivery_dates[]"]').first()
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
      expect(this.popupExpress).toBeVisible()
      await this.popupExpressSubmitButton.click()
      expect(this.popupExpress).not.toBeVisible()
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
      await expect(this.popupCancel).toBeVisible()
      await this.popupCancelReasonButtons.filter({ hasText: reason }).click()
   }

   fillReasonForCancellation = async () => {
      await expect(this.popupTitleReasonForCancellation).toBeVisible()
      await this.popupCancelComment.waitFor()
      await this.popupCancelComment.fill(orderInfo.reasonForCancellation)
      expect(this.popupCancelComment).toHaveValue(orderInfo.reasonForCancellation)
   }

   clickOnSubmitButtonInPopUpCancel = async () => {
      await this.popupCancelSubmitButton.click()
      await expect(this.popupTitleReasonForCancellation).not.toBeVisible()
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
      await this.partnerUserField.waitFor()
      await this.partnerUserField.click()
      await this.optionList.filter({ hasText: createOrderInfo.partnerUser }).click()
      expect(await this.partnerUserSelect.locator('option:checked').innerText())
         .toEqual(`${createOrderInfo.partnerUser} (${createOrderInfo.partner})`)
   }

   clickOnCreatePartnerButtonFromPartnerField = async () => {
      await this.partnerField.waitFor()
      await this.partnerField.click()
      await this.createPartnerButton.waitFor()
      await this.createPartnerButton.click()
   }

   clickOnCreatePartnerButtonFromPartnerUserField = async () => {
      await this.partnerUserField.waitFor()
      await this.partnerUserField.click()
      await this.createPartnerButton.waitFor()
      await this.createPartnerButton.click()
   }

   changeManagerByClickOnButton = async () => {
      await this.changeManagerButton.waitFor()
      await this.changeManagerButton.click()
      await this.popupChangeManager.waitFor('visible')
      await this.popupChangeManagerSaveButton.waitFor()
      await this.popupChangeManagerSaveButton.click()
      await this.successAlertSaveChanges.waitFor('visible')
   }

   enterADateAtDateInput = async (date, dateInput) => {
      await dateInput.waitFor()
      await dateInput.click()
      await dateInput.fill(date)
      await expect(dateInput).toHaveValue(date)
      await helpers.hidingElementBySelector(this.page, this.openedDateTimePickerSelector)
      await this.labelForIssueAt.click() // Нужно, чтобы дата сохранилась
   }

   clickOnTheStageTab = async () => {
      await this.stageTab.waitFor()
      await this.stageTab.click()
      await this.page.waitForLoadState('networkidle')
   }

   clickOnMoreButton = async () => {
      await this.moreButton.waitFor()
      await this.moreButton.click()
      await this.moreBlockInfo.waitFor('visible')
   }

   selectContractorsOrganization = async () => {
      await this.contractorOrganizationField.waitFor()
      await this.contractorOrganizationField.click()
      await this.contractorOrganizationInput.fill(orderInfo.contractorName)
      expect(this.contractorOrganizationInput).toHaveValue(orderInfo.contractorName)
      await this.optionList.filter({ hasText: orderInfo.contractorName }).waitFor()
      await this.optionList.filter({ hasText: orderInfo.contractorName }).click()
      expect(await this.contractorOrganizationField.innerText()).toContain(orderInfo.contractorName)
   }

   enteringTheContractNumber = async () => {
      await this.contractorOrderNumbersField.waitFor()
      await this.contractorOrderNumbersField.click()
      await this.contractorOrderNumbersInput.fill(orderInfo.contractorNumber)
      expect(this.contractorOrderNumbersInput).toHaveValue(orderInfo.contractorNumber)
      await this.optionList.filter({ hasText: orderInfo.additionalNumber }).waitFor()
      await this.optionList.filter({ hasText: orderInfo.additionalNumber }).click()
      expect(await this.contractorOrderNumbersField.innerText()).toContain(orderInfo.contractorNumber)
   }

   selectContractDeliveryDate = async () => {
      await this.enterADateAtDateInput(orderInfo.contractorDeliveryDate, this.contractorDeliveryDateInput)
   }
}