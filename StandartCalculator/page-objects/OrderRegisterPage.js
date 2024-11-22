import { test, expect } from "@playwright/test"
import { helpers } from "../utils/helpers.js"
import { filtersInfo } from "./../data/filtersInfo.js"

export class OrderRegisterPage {
   constructor(page) {
      this.page = page

      // Общие локаторы
      this.openPopUpFiltersButton = page.locator('button[data-target="#search-filters-block"]')
      this.popUpFilters = page.locator('div#search-filters-block')
      this.submitButton = page.locator('button[type="submit"]')
      this.rowsRegistryTable = page.locator('div.tabulator-row')

      // Локаторы из блока "Основное"
      this.statusOrderLists = page.locator('div#filter-block-general span.select2-selection')
      // Локаторы статуса заказа
      this.statusFilterField = this.statusOrderLists.nth(0)
      this.optionList = page.locator('ul.select2-results__options li')
      this.statusFilterSelect = page.locator('div#filter-block-general select[name="status_id[]"]')
      this.columnWithOrderStatuses = page.locator('div[tabulator-field="status_name"].tabulator-cell')
      // Локаторы менеджера заказа
      this.managerFilterField = this.statusOrderLists.nth(1)
      this.managerFilterInput = page.locator('div#filter-block-general input[aria-controls*="select2-manager"]')
      this.optionListAfterFill = page.locator('ul[id*="select2-manager"] li')
      this.columnWithOrderManagers = page.locator('div[tabulator-field="manager_name"].tabulator-cell')
      this.resetAllFiltersButton = page.locator('div.cancel-search-button')
      // Локаторы компании заказа
      this.companyFilterField = this.statusOrderLists.nth(2)
      this.optionList = page.locator('ul.select2-results__options li')
      this.companyFilterSelect = page.locator('div#filter-block-general select[name="company_id[]"]')
      this.columnWithOrderCompany = page.locator('div[tabulator-field="company_name"].tabulator-cell')
      // Локаторы продукта заказа
      this.productFilterField = this.statusOrderLists.nth(3)
      this.optionList = page.locator('ul.select2-results__options li')
      this.productFilterSelect = page.locator('div#filter-block-general select[name="product_type_mark_ids[]"]')
      this.columnWithOrderProduct = page.locator('div[tabulator-field="product"].tabulator-cell')

      // Локаторы из блока "Даты и сроки"
      this.buttonBlockDate = page.locator('button.filter-header-button[data-target="#filter-block-date"]')
      // Дата оформления
      this.orderCreateDateBeginInput = page.locator('div#filter-block-date input[name="created_at_begin"]')
      this.orderCreateDateEndInput = page.locator('div#filter-block-date input[name="created_at_end"]')
      this.dateTimePicker = page.locator('div.xdsoft_datetimepicker')
      this.columnWithOrderCreateDate = page.locator('div[tabulator-field="created_at"].tabulator-cell')

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
      await expect(this.page.locator('span.selected-tag__name')).toContainText(`Статус: ${filtersInfo.orderStatus}`)
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
      await expect(this.page.locator('span.selected-tag__name')).toContainText(`Менеджер: ${filtersInfo.managerLastname}`)
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
      await expect(this.page.locator('span.selected-tag__name')).toContainText(`Компания: ${filtersInfo.company}`)
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
      await expect(this.page.locator('span.selected-tag__name')).toContainText(`Продукт: ${filtersInfo.product}`)
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
      await expect(this.page.locator('span.selected-tag__name'))
         .toContainText(`Оформлен: c ${filtersInfo.orderCreateDateBegin} по ${filtersInfo.orderCreateDateEnd}`)
      await this.rowsRegistryTable.nth(29).waitFor()
      await helpers.checkingTextForAnArrayOfElements(filtersInfo.orderCreateDateBegin.split(' ')[0].slice(3), this.columnWithOrderCreateDate)
   }
}