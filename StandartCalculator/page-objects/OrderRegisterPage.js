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

      // Локаторы из блока "Основное"
      this.mainBlockFields = page.locator('div#filter-block-general span.select2-selection')
      // Локаторы статуса заказа
      this.statusFilterField = this.mainBlockFields.nth(0)
      this.statusFilterSelect = page.locator('div#filter-block-general select[name="status_id[]"]')
      this.columnWithOrderStatuses = page.locator('div[tabulator-field="status_name"].tabulator-cell')
      // Локаторы менеджера заказа
      this.managerFilterField = this.mainBlockFields.nth(1)
      this.managerFilterInput = page.locator('div#filter-block-general input[aria-controls*="select2-manager"]')
      this.optionListAfterFill = page.locator('ul[id*="select2-manager"] li')
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
      this.dateTimePicker = page.locator('div.xdsoft_datetimepicker')
      this.columnWithOrderCreateDate = page.locator('div[tabulator-field="created_at"].tabulator-cell')

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

      // Локаторы для блока "Контрагенты"
      this.buttonBlockPartner = page.locator('button.filter-header-button[data-target="#filter-block-partner"]')
      this.partnerBlockFields = page.locator('div#filter-block-partner span.select2-selection')
      // Локаторы для контрагента
      this.partnerFilterField = this.stageBlockFields.nth(0)
      this.partnerFilterSelect = page.locator('div#filter-block-stage select[name="partner_id[]"]')
      this.columnWithOrderPartner = page.locator('div[tabulator-field="partner_name"].tabulator-cell')
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
      await this.submitButton.click()
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
      await this.optionListAfterFill.waitFor()
      await this.optionListAfterFill.click()
      await this.submitButton.click()
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
      await this.submitButton.click()
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
      await this.submitButton.click()
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
      await this.submitButton.click()
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags)
         .toContainText(`Оформлен: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.nth(29).waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithOrderCreateDate)
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
      await this.submitButton.click()
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
      await this.submitButton.click()
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Исполнитель: ${filtersInfo.executor}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.executor.split(" ")[0], this.columnWithOrderExecutor)
   }

   filteringByOrderExpress = async () => {
      await this.buttonBlockPartner.waitFor()
      await this.buttonBlockPartner.click()
      await this.expressFilterField.waitFor()
      await this.expressFilterField.click()
      await this.optionList.first().waitFor()
      await this.optionList.filter({ hasText: filtersInfo.express }).click()
      expect(await this.expressFilterSelect.locator('option:checked').innerText()).toEqual(filtersInfo.express)
      await this.submitButton.waitFor()
      await this.submitButton.click()
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
      await this.submitButton.click()
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
      await this.submitButton.click()
      await this.page.waitForLoadState('load')
      await expect(this.selectedTags).toContainText(`Способ оплаты ${filtersInfo.paymentType}`)
      await this.rowsRegistryTable.first().waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.paymentType, this.columnWithOrderPaymentType)
   }
}