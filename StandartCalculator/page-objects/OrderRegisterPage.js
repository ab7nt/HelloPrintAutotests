import { test, expect } from "@playwright/test"
import { helpers } from "../utils/helpers.js"
import { filtersInfo } from "./../data/filtersInfo.js"

export class OrderRegisterPage {
   constructor(page) {
      this.page = page

      // Общие локаторы
      this.openPopUpFiltersButton = page.locator('button[data-target="#search-filters-block"]')
      this.popUpFilters = page.locator('div#search-filters-block')
      this.optionList = page.locator('ul.select2-results__options li')
      this.submitButton = page.locator('button[type="submit"]')
      this.rowsRegistryTable = page.locator('div.tabulator-row')
      this.selectedTags = page.locator('ul.selected-tags')
      this.dateTimePicker = page.locator('div.xdsoft_datetimepicker')

      // Локаторы из блока "Основное"
      this.mainBlockFields = page.locator('div#filter-block-general span.select2-selection')
      // Локаторы статуса заказа
      this.statusFilterField = this.mainBlockFields.nth(0)
      this.statusFilterSelect = page.locator('div#filter-block-general select[name="status_id[]"]')
      this.columnWithOrderStatuses = page.locator('div[tabulator-field="status_name"].tabulator-cell')
      // Локаторы менеджера заказа
      this.managerFilterField = this.mainBlockFields.nth(1)
      this.managerFilterInput = page.locator('div#filter-block-general input[aria-controls*="select2-manager"]')
      this.optionListAfterFillManager = page.locator('ul[id*="select2-manager"] li')
      this.columnWithOrderManagers = page.locator('div[tabulator-field="manager_name"].tabulator-cell')
      this.resetAllFiltersButton = page.locator('div.cancel-search-button')
      // Локаторы компании заказа
      this.companyFilterField = this.mainBlockFields.nth(2)
      this.companyFilterSelect = page.locator('div#filter-block-general select[name="company_id[]"]')
      this.columnWithOrderCompany = page.locator('div[tabulator-field="company_name"].tabulator-cell')
      // Локаторы продукта заказа
      this.productFilterField = this.mainBlockFields.nth(3)
      this.productFilterSelect = page.locator('div#filter-block-general select[name="product_type_mark_ids[]"]')
      this.columnWithOrderProduct = page.locator('div[tabulator-field="product"].tabulator-cell')

      // Локаторы из блока "Даты и сроки"
      this.buttonBlockDate = page.locator('button.filter-header-button[data-target="#filter-block-date"]')
      // Дата оформления
      this.orderCreateDateBeginInput = page.locator('div#filter-block-date input[name="created_at_begin"]')
      this.orderCreateDateEndInput = page.locator('div#filter-block-date input[name="created_at_end"]')
      this.columnWithOrderCreateDate = page.locator('div[tabulator-field="created_at"].tabulator-cell')
      // Готовность спуска
      this.prepressAtDateBeginInput = page.locator('div#filter-block-date input[name="prepress_at_begin"]')
      this.prepressAtDateEndInput = page.locator('div#filter-block-date input[name="prepress_at_end"]')
      this.columnWithPrepressAtDate = page.locator('div[tabulator-field="prepress_at"].tabulator-cell')
      // Готовность спуска
      this.layoutAtDateBeginInput = page.locator('div#filter-block-date input[name="layout_at_begin"]')
      this.layoutAtDateEndInput = page.locator('div#filter-block-date input[name="layout_at_end"]')
      this.columnWithLayoutAtDate = page.locator('div[tabulator-field="layout_at"].tabulator-cell')
      // Макет - Для дизайнеров
      this.impositionAtDateBeginInput = page.locator('div#filter-block-date input[name="imposition_at_begin"]')
      this.impositionAtDateEndInput = page.locator('div#filter-block-date input[name="imposition_at_end"]')
      this.columnWithImpositionAtDate = page.locator('div[tabulator-field="imposition_at"].tabulator-cell')
      // Готовность на производстве
      this.productionAtDateBeginInput = page.locator('div#filter-block-date input[name="production_at_begin"]')
      this.productionAtDateEndInput = page.locator('div#filter-block-date input[name="production_at_end"]')
      this.columnWithProductionAtDate = page.locator('div[tabulator-field="production_at"].tabulator-cell')
      // Выдача заказа
      this.deliveryAtDateBeginInput = page.locator('div#filter-block-date input[name="delivery_at_begin"]')
      this.deliveryAtDateEndInput = page.locator('div#filter-block-date input[name="delivery_at_end"]')
      this.columnWithDeliveryAtDate = page.locator('div[tabulator-field="delivery_at"].tabulator-cell')
      // Заказа закрыт
      this.completedAtDateBeginInput = page.locator('div#filter-block-date input[name="completed_at_begin"]')
      this.completedAtDateEndInput = page.locator('div#filter-block-date input[name="completed_at_end"]')
      this.columnWithCompletedAtDate = page.locator('div[tabulator-field="completed_at"].tabulator-cell')

      // Локаторы из блока "Маршрут и срочность"
      this.buttonBlockStage = page.locator('button.filter-header-button[data-target="#filter-block-stage"]')
      this.stageBlockFields = page.locator('div#filter-block-stage span.select2-selection')
      // Локаторы для участка
      this.stageDepartmentFilterField = this.stageBlockFields.nth(0)
      this.stageDepartmentFilterSelect = page.locator('div#filter-block-stage select[name="area_id[]"]')
      this.columnWithOrderStageDepartment = page.locator('div[tabulator-field="area_strike_names"].tabulator-cell')
      // Локаторы для срочности
      this.expressFilterField = this.stageBlockFields.nth(1)
      this.expressFilterSelect = page.locator('div#filter-block-stage select[name="express"]')
      this.columnWithOrdErexpress = page.locator('div[tabulator-field="is_express"].tabulator-cell')
      // Локаторы для исполнителя
      this.executorFilterField = this.stageBlockFields.nth(2)
      this.executorFilterSelect = page.locator('div#filter-block-stage select[name="user_id[]"]')
      this.columnWithOrderExecutor = page.locator('div[tabulator-field="executor_names"].tabulator-cell')

      // Локаторы для блока "Оплаты и документы"
      this.buttonBlockInvoice = page.locator('button.filter-header-button[data-target="#filter-block-invoice"]')
      this.invoiceBlockFields = page.locator('div#filter-block-invoice span.select2-selection')
      // Локаторы для статуса оплаты
      this.paymentStatusFilterField = this.invoiceBlockFields.nth(0)
      this.paymentStatusFilterSelect = page.locator('div#filter-block-invoice select[name="payment_status_id[]"]')
      this.columnWithOrderPaymentStatus = page.locator('div[tabulator-field="payment_status_name"].tabulator-cell')
      // Локаторы для способа оплаты
      this.paymentTypeFilterField = this.invoiceBlockFields.nth(1)
      this.paymentTypeFilterSelect = page.locator('div#filter-block-invoice select[name="payment_type[]"]')
      this.columnWithOrderPaymentType = page.locator('div[tabulator-field="payment_types"].tabulator-cell')
      // Локаторы для оригинала УПД
      this.originalUpdFilterField = this.invoiceBlockFields.nth(2)
      this.originalUpdFilterSelect = page.locator('div#filter-block-invoice select[name="original_upd[]"]')
      this.columnWithOrderOriginalUpd = page.locator('div[tabulator-field="original_upd_text"].tabulator-cell')
      // Локаторы для созданного счёта
      this.createdInvoiceFilterField = this.invoiceBlockFields.nth(4)
      this.createdInvoiceFilterSelect = page.locator('div#filter-block-invoice select[name="created_invoice"]')
      this.columnWithOrderCreatedInvoice = page.locator('div[tabulator-field="created_invoice"].tabulator-cell')
      // Локаторы для созданного УПД
      this.createdUpdFilterField = this.invoiceBlockFields.nth(5)
      this.createdUpdFilterSelect = page.locator('div#filter-block-invoice select[name="created_upd"]')
      this.columnWithOrderCreatedUpd = page.locator('div[tabulator-field="created_upd"].tabulator-cell')
      // Локаторы для поставщика (наше юр.лицо) 
      this.paymentsPartnerCompanyFilterField = this.invoiceBlockFields.nth(6)
      this.paymentsPartnerCompanyFilterSelect = page.locator('div#filter-block-invoice select[name="payments_partner_company[]"]')
      this.columnWithOrderPaymentsPartnerCompany = page.locator('div[tabulator-field="payments_partner_company"].tabulator-cell')

      // Локаторы для блока "Контрагенты"
      this.buttonBlockPartner = page.locator('button.filter-header-button[data-target="#filter-block-partner"]')
      this.partnerBlockFields = page.locator('div#filter-block-partner span.select2-selection')
      // Локаторы для контрагента
      this.partnerFilterField = this.partnerBlockFields.nth(0)
      this.partnerFilterInput = page.locator('div:has(select[name="partner_id[]"]) > span input')
      this.optionListAfterFillPartner = page.locator('ul[id*="select2-partner_id"] li')
      this.columnWithOrderPartner = page.locator('div[tabulator-field="partner_name"].tabulator-cell')
      // Локаторы для представителя
      this.partnerUserFilterField = this.partnerBlockFields.nth(1)
      this.partnerUserFilterInput = page.locator('div:has(select[name="partner_user_id[]"]) > span input')
      this.optionListAfterFillPartnerUser = page.locator('ul[id*="select2-partner_user_id"] li')
      this.columnWithOrderPartnerUser = page.locator('div[tabulator-field="partner_user_name"].tabulator-cell')
      // Локаторы для юридического лица контрагента
      this.partnerCompanyFilterField = this.partnerBlockFields.nth(2)
      this.partnerCompanyFilterInput = page.locator('div:has(select[name="partner_company_id[]"]) > span input')
      this.optionListAfterFillPartnerCompany = page.locator('ul[id*="select2-partner_company_id"] li')
      this.columnWithOrderPartnerCompany = page.locator('div[tabulator-field="partner_company_name"].tabulator-cell')
      // Локаторы для типа клиента
      this.partnerTypedFilterField = this.partnerBlockFields.nth(3)
      this.partnerTypeFilterSelect = page.locator('div#filter-block-invoice select[name="partner_client_type_id[]"]')
      // this.columnWithOrderPartnerType = page.locator('div[tabulator-field="created_upd"].tabulator-cell')
      // Локаторы для ИНН контрагента
      this.partnerCompanyInnFilterField = this.partnerBlockFields.nth(4)
      this.partnerCompanyInnFilterInput = page.locator('div:has(select[name="inn[]"]) > span input')
      this.optionListAfterFillPartnerCompanyInn = page.locator('ul[id*="select2-inn"] li')
      this.columnWithOrderPartnerCompanyInn = page.locator('div[tabulator-field="partner_company_inn"].tabulator-cell')

      // Локаторы для блока "Подряд"
      this.buttonBlockContractor = page.locator('button.filter-header-button[data-target="#filter-block-contractor"]')
      this.contractorBlockFields = page.locator('div#filter-block-contractor span.select2-selection')
      // Локаторы для "Добавлен подряд"
      this.contractorFilterField = this.contractorBlockFields.nth(0)
      this.contractorFilterSelect = page.locator('div#filter-block-contractor select[name="contractor"]')
      this.columnWithOrderContractor = page.locator('div[tabulator-field="partners"].tabulator-cell')
      // Локаторы для "Подрядчик"
      this.partnersFilterField = this.contractorBlockFields.nth(1)
      this.partnersFilterInput = page.locator('div:has(select[name="partners[]"]) > span input')
      this.optionListAfterFillPartners = page.locator('ul[id*="select2-partners"] li')
      this.columnWithOrderContractor = page.locator('div[tabulator-field="partners"].tabulator-cell')
      // Локаторы для "Номер от одрядчика"
      this.contractorNumberFilterField = this.contractorBlockFields.nth(2)
      this.contractorNumberFilterInput = page.locator('div:has(select[name="contractor_numbers[]"]) > span input')
      this.optionListAfterFillContractorNumber = page.locator('ul[id*="select2-contractor_numbers"] li')
      this.columnWithOrderContractorNumber = page.locator('div[tabulator-field="contractor_numbers"].tabulator-cell')
      // Локаторы для "Дата поставки"
      this.contractorDateBeginInput = page.locator('div#filter-block-contractor input[name="contractor_at_begin"]')
      this.contractorDateEndInput = page.locator('div#filter-block-contractor input[name="contractor_at_end"]')
      this.columnWithOrderСontractorDate = page.locator('div[tabulator-field="contractor_delivery_at"].tabulator-cell')

      // Локаторы для блока "Остальное"
      this.buttonBlockOther = page.locator('button.filter-header-button[data-target="#filter-block-other"]')
      this.otherBlockFields = page.locator('div#filter-block-other span.select2-selection')
      // Локаторы для "Правки по макету"
      this.layoutEditFilterField = this.otherBlockFields.nth(0)
      this.layoutEditFilterSelect = page.locator('div#filter-block-other select[name="is_layout_edit"]')
      this.columnWithOrderLayoutEdit = page.locator('div[tabulator-field="is_layout_edit"].tabulator-cell')
      // Локаторы для "Объёмный заказ"
      this.volumeFilterField = this.otherBlockFields.nth(1)
      this.volumeFilterSelect = page.locator('div#filter-block-other select[name="is_volume_order"]')
      this.columnWithOrderVolume = page.locator('div[tabulator-field="is_volume"].tabulator-cell')
      // Локаторы для "Габаритный"
      this.oversizeFilterField = this.otherBlockFields.nth(2)
      this.oversizeFilterSelect = page.locator('div#filter-block-other select[name="is_oversized_order"]')
      // this.columnWithOrderOversize = page.locator('div[tabulator-field="is_volume"].tabulator-cell')
      // Локаторы для "Источник рекламы"
      this.adSourceFilterField = this.contractorBlockFields.nth(3)
      this.adSourceFilterInput = page.locator('div:has(select[name="ad_source_id[]"]) > span input')
      this.optionListAfterFillAdSource = page.locator('ul[id*="select2-ad_source"] li')
      // this.columnWithOrderAdSource = page.locator('div[tabulator-field="contractor_numbers"].tabulator-cell')
      // Локаторы для "Источник рекламы"
      this.adSourceFilterField = this.contractorBlockFields.nth(4)
      this.adSourceFilterInput = page.locator('div:has(select[name="ad_source_id[]"]) > span input')
      this.optionListAfterFillAdSource = page.locator('ul[id*="select2-ad_source"] li')
      // this.columnWithOrderAdSource = page.locator('div[tabulator-field="contractor_numbers"].tabulator-cell')
      // Локаторы для "Наименование"
      this.adSourceFilterField = this.contractorBlockFields.nth(6)
      this.adSourceFilterInput = page.locator('div:has(select[name="ad_source_id[]"]) > span input')
      this.optionListAfterFillAdSource = page.locator('ul[id*="select2-ad_source"] li')
      // this.columnWithOrderAdSource = page.locator('div[tabulator-field="contractor_numbers"].tabulator-cell')
   }

   openPopUpFilter = async () => {
      await this.page.waitForLoadState('load')
      await this.openPopUpFiltersButton.waitFor()
      await this.openPopUpFiltersButton.click()
      await expect(this.popUpFilters).toBeVisible()
   }

   resetAllFilters = async () => {
      await this.page.waitForLoadState('load')
      await this.resetAllFiltersButton.waitFor()
      await this.resetAllFiltersButton.click()
      await this.page.waitForLoadState('load')
   }

   filteringByStatusOrder = async () => {
      await this.statusFilterField.waitFor()
      await this.statusFilterField.click()
      await expect(this.optionList.first()).toBeVisible()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.orderStatus }).click()
      expect(await this.statusFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.orderStatus)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Статус: ${filtersInfo.orderStatus}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderStatus, this.columnWithOrderStatuses)
   }

   filteringByManager = async () => {
      await this.managerFilterField.waitFor()
      await this.managerFilterField.click()
      await this.managerFilterInput.fill(filtersInfo.managerLastname)
      await expect(this.managerFilterInput).toHaveValue(filtersInfo.managerLastname)
      await this.optionListAfterFillManager.waitFor()
      await this.optionListAfterFillManager.click()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Менеджер: ${filtersInfo.managerLastname}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.managerLastname, this.columnWithOrderManagers)
   }

   filteringByCompany = async () => {
      await this.companyFilterField.waitFor()
      await this.companyFilterField.click()
      await expect(this.optionList.first()).toBeVisible()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.company }).click()
      expect(await this.companyFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.company)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Компания: ${filtersInfo.company}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.company, this.columnWithOrderCompany)
   }

   filteringByProduct = async () => {
      await this.productFilterField.waitFor()
      await this.productFilterField.click()
      await expect(this.optionList.first()).toBeVisible()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.product }).click()
      expect(await this.productFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.product)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Продукт: ${filtersInfo.product}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.product, this.columnWithOrderProduct)
   }

   filteringByOrderCreationDate = async () => {
      await this.buttonBlockDate.waitFor()
      await this.buttonBlockDate.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.orderCreateDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.orderCreateDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.orderCreateDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.orderCreateDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Оформлен: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithOrderCreateDate)
   }

   filteringByOrderPrepressAt = async () => {
      await this.buttonBlockDate.waitFor()
      await this.buttonBlockDate.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.prepressAtDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.prepressAtDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.prepressAtDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.prepressAtDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Готовность спуска: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithOrderCreateDate)
   }

   filteringByOrderLayoutAt = async () => {
      await this.buttonBlockDate.waitFor()
      await this.buttonBlockDate.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.layoutAtDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.layoutAtDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.layoutAtDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.layoutAtDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Готовность макета: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithLayoutAtDate)
   }

   filteringByOrderImpositionAt = async () => {
      await this.buttonBlockDate.waitFor()
      await this.buttonBlockDate.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.impositionAtDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.impositionAtDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.impositionAtDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.impositionAtDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Макет - Для дизайнеров: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithImpositionAtDate)
   }

   filteringByOrderProductionAt = async () => {
      await this.buttonBlockDate.waitFor()
      await this.buttonBlockDate.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.productionAtDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.productionAtDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.productionAtDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.productionAtDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Готовность на производстве: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithProductionAtDate)
   }

   filteringByOrderDeliveryAt = async () => {
      await this.buttonBlockDate.waitFor()
      await this.buttonBlockDate.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.deliveryAtDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.deliveryAtDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.deliveryAtDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.deliveryAtDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Выдача заказа: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithDeliveryAtDate)
   }

   filteringByOrderCompletedAt = async () => {
      await this.buttonBlockDate.waitFor()
      await this.buttonBlockDate.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.completedAtDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.completedAtDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.completedAtDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.completedAtDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Закрыт: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithCompletedAtDate)
   }

   filteringByOrderStageDepartment = async () => {
      // Выбор статуса "Новый расчёт", чтобы избежать заказов в статусах "Закрыт" и "Отменён"
      await this.statusFilterField.waitFor()
      await this.statusFilterField.click()
      await expect(this.optionList.first()).toBeVisible()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.orderStatus }).click()

      await this.buttonBlockStage.waitFor()
      await this.buttonBlockStage.click()
      await this.stageDepartmentFilterField.waitFor()
      await this.stageDepartmentFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.stage }).click()
      expect(await this.stageDepartmentFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.stage)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.page.locator('ul.selected-tags')).toContainText(`Участок: ${filtersInfo.stage}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.stage, this.columnWithOrderStageDepartment)
   }

   filteringByOrderExecutor = async () => {
      await this.buttonBlockStage.waitFor()
      await this.buttonBlockStage.click()
      await this.executorFilterField.waitFor()
      await this.executorFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.executor }).click()
      expect(await this.executorFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.executor)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Исполнитель: ${filtersInfo.executor}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.executor.split(" ")[0], this.columnWithOrderExecutor)
   }

   filteringByOrderExpress = async () => {
      await this.buttonBlockStage.waitFor()
      await this.buttonBlockStage.click()
      await this.expressFilterField.waitFor()
      await this.expressFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.express }).click()
      expect(await this.expressFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.express)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Срочность: ${filtersInfo.express}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.express.split(" ")[0], this.columnWithOrdErexpress)
   }

   filteringByPaymentStatus = async () => {
      await this.buttonBlockInvoice.waitFor()
      await this.buttonBlockInvoice.click()
      await this.paymentStatusFilterField.waitFor()
      await this.paymentStatusFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.paymentStatus}` }).click()
      expect(await this.paymentStatusFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.paymentStatus)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Статус оплаты: ${filtersInfo.paymentStatus}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.paymentStatus, this.columnWithOrderPaymentStatus)
   }

   filteringByPaymentType = async () => {
      await this.buttonBlockInvoice.waitFor()
      await this.buttonBlockInvoice.click()
      await this.paymentTypeFilterField.waitFor()
      await this.paymentTypeFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.paymentType}` }).click()
      expect(await this.paymentTypeFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.paymentType)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Способ оплаты ${filtersInfo.paymentType}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.paymentType, this.columnWithOrderPaymentType)
   }

   filteringByOriginalUpd = async () => {
      await this.buttonBlockInvoice.waitFor()
      await this.buttonBlockInvoice.click()
      await this.originalUpdFilterField.waitFor()
      await this.originalUpdFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.originalUpd}` }).click()
      expect(await this.originalUpdFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.originalUpd)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`УПД оригинал: ${filtersInfo.originalUpd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.originalUpd, this.columnWithOrderOriginalUpd)
   }

   filteringByCreatedInvoice = async () => {
      await this.buttonBlockInvoice.waitFor()
      await this.buttonBlockInvoice.click()
      await this.createdInvoiceFilterField.waitFor()
      await this.createdInvoiceFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.createdInvoice}` }).click()
      expect(await this.createdInvoiceFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.createdInvoice)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Создан счет: ${filtersInfo.createdInvoice}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.createdInvoice, this.columnWithOrderCreatedInvoice)
   }

   filteringByCreatedUpd = async () => {
      await this.buttonBlockInvoice.waitFor()
      await this.buttonBlockInvoice.click()
      await this.createdUpdFilterField.waitFor()
      await this.createdUpdFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.createdUpd}` }).click()
      expect(await this.createdUpdFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.createdUpd)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Создан УПД: ${filtersInfo.createdUpd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.createdUpd, this.columnWithOrderCreatedUpd)
   }

   filteringByPaymentsPartnerCompany = async () => {
      await this.buttonBlockInvoice.waitFor()
      await this.buttonBlockInvoice.click()
      await this.paymentsPartnerCompanyFilterField.waitFor()
      await this.paymentsPartnerCompanyFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.paymentsPartnerCompany}` }).click()
      expect(await this.paymentsPartnerCompanyFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.paymentsPartnerCompany)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Поставщик ( Наше юр. лицо): ${filtersInfo.paymentsPartnerCompany}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.paymentsPartnerCompany, this.columnWithOrderPaymentsPartnerCompany)
   }

   filteringByPartner = async () => {
      await this.buttonBlockPartner.waitFor()
      await this.buttonBlockPartner.click()
      await this.partnerFilterField.waitFor()
      await this.partnerFilterField.click()
      await this.partnerFilterInput.fill(filtersInfo.partner)
      await expect(this.partnerFilterInput).toHaveValue(filtersInfo.partner)
      await this.optionListAfterFillPartner.waitFor()
      await this.optionListAfterFillPartner.first().click()
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Контрагент: ${filtersInfo.partner}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.partner, this.columnWithOrderPartner)
   }

   filteringByPartnerUser = async () => {
      await this.buttonBlockPartner.waitFor()
      await this.buttonBlockPartner.click()
      await this.partnerUserFilterField.waitFor()
      await this.partnerUserFilterField.click()
      await this.partnerUserFilterInput.fill(filtersInfo.partnerUser)
      await expect(this.partnerUserFilterInput).toHaveValue(filtersInfo.partnerUser)
      await this.optionListAfterFillPartnerUser.waitFor()
      await this.optionListAfterFillPartnerUser.first().click()
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Представитель: ${filtersInfo.partnerUser}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.partnerUser, this.columnWithOrderPartnerUser)
   }

   filteringByPartnerCompany = async () => {
      await this.buttonBlockPartner.waitFor()
      await this.buttonBlockPartner.click()
      await this.partnerCompanyFilterField.waitFor()
      await this.partnerCompanyFilterField.click()
      await this.partnerCompanyFilterInput.fill(filtersInfo.partnerCompany)
      await expect(this.partnerCompanyFilterInput).toHaveValue(filtersInfo.partnerCompany)
      await this.optionListAfterFillPartnerCompany.waitFor()
      await this.optionListAfterFillPartnerCompany.first().click()
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Юридическое лицо: ${filtersInfo.partnerCompany}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.partnerCompany, this.columnWithOrderPartnerCompany)
   }

   filteringByInn = async () => {
      await this.buttonBlockPartner.waitFor()
      await this.buttonBlockPartner.click()
      await this.partnerCompanyInnFilterField.waitFor()
      await this.partnerCompanyInnFilterField.click()
      await this.partnerCompanyInnFilterInput.fill(filtersInfo.partnerCompanyInn)
      await expect(this.partnerCompanyInnFilterInput).toHaveValue(filtersInfo.partnerCompanyInn)
      await this.optionListAfterFillPartnerCompanyInn.waitFor()
      await this.optionListAfterFillPartnerCompanyInn.first().click()
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`ИНН: ${filtersInfo.partnerCompanyInn}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.partnerCompanyInn, this.columnWithOrderPartnerCompanyInn)
   }

   filteringByContractorAdded = async () => {
      await this.buttonBlockContractor.waitFor()
      await this.buttonBlockContractor.click()
      await this.contractorFilterField.waitFor()
      await this.contractorFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.contractorAdded}` }).click()
      expect(await this.contractorFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.contractorAdded)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Добавлен подряд: ${filtersInfo.contractorAdded}`)
      await this.rowsRegistryTable.first().waitFor()
      // await helpers.checkingTextForAnArrayOfElements(filtersInfo.createdInvoice, this.columnWithOrderContractor)
      await helpers.areAllStringsNotEmpty(this.columnWithOrderContractor)
   }

   filteringByContractor = async () => {
      await this.buttonBlockContractor.waitFor()
      await this.buttonBlockContractor.click()
      await this.partnersFilterField.waitFor()
      await this.partnersFilterField.click()
      await this.partnersFilterInput.fill(filtersInfo.contractor)
      await expect(this.partnersFilterInput).toHaveValue(filtersInfo.contractor)
      await this.optionListAfterFillPartners.waitFor()
      await this.optionListAfterFillPartners.first().click()
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Подрядчики: ${filtersInfo.contractor}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.contractor, this.columnWithOrderContractor)
   }

   filteringByContractorNumber = async () => {
      await this.buttonBlockContractor.waitFor()
      await this.buttonBlockContractor.click()
      await this.contractorNumberFilterField.waitFor()
      await this.contractorNumberFilterField.click()
      await this.contractorNumberFilterInput.fill(filtersInfo.contractorNumber)
      await expect(this.contractorNumberFilterInput).toHaveValue(filtersInfo.contractorNumber)
      await this.optionListAfterFillContractorNumber.waitFor()
      await this.optionListAfterFillContractorNumber.first().click()
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Номер от подрядчика: ${filtersInfo.contractorNumber}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.contractorNumber, this.columnWithOrderContractorNumber)
   }

   filteringByContractorDate = async () => {
      await this.buttonBlockContractor.waitFor()
      await this.buttonBlockContractor.click()
      // expect(this.dateTimePicker).toBeVisible()
      await this.contractorDateBeginInput.fill(filtersInfo.orderCreateDateBegin)
      await expect(this.contractorDateBeginInput).toHaveValue(filtersInfo.orderCreateDateBegin)
      await this.contractorDateEndInput.fill(filtersInfo.orderCreateDateEnd)
      await expect(this.contractorDateEndInput).toHaveValue(filtersInfo.orderCreateDateEnd)
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Дата поставки: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3),
         this.columnWithOrderСontractorDate)
   }

   filteringByLayoutEdit = async () => {
      await this.buttonBlockOther.waitFor()
      await this.buttonBlockOther.click()
      await this.layoutEditFilterField.waitFor()
      await this.layoutEditFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.layuotEdit}` }).click()
      expect(await this.layoutEditFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.layuotEdit)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Правки по макету: ${filtersInfo.layuotEdit}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.layuotEdit, this.columnWithOrderLayoutEdit)
   }

   filteringByVolume = async () => {
      await this.buttonBlockOther.waitFor()
      await this.buttonBlockOther.click()
      await this.volumeFilterField.waitFor()
      await this.volumeFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.volume}` }).click()
      expect(await this.volumeFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.volume)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Объёмный заказ: ${filtersInfo.volume}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.volume, this.columnWithOrderVolume)
   }

   filteringByOversize = async () => {
      await this.buttonBlockOther.waitFor()
      await this.buttonBlockOther.click()
      await this.volumeFilterField.waitFor()
      await this.volumeFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: `${filtersInfo.volume}` }).click()
      expect(await this.volumeFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.volume)
      await this.submitButton.waitFor()
      await this.submitButton.click({ force: true })
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Объёмный заказ: ${filtersInfo.volume}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.volume, this.columnWithOrderVolume)
   }


}