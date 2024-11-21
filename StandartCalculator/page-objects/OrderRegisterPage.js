import { test, expect } from "@playwright/test"
import { helpers } from "../utils/helpers"

export class OrderRegisterPage {
    constructor(page) {
        this.page = page

        this.openPopUpFiltersButton = page.locator('button[data-target="#search-filters-block"]')
        this.popUpFilters = page.locator('div#search-filters-block')
        this.selectStatusOrder = page.locator('select[name="status_id[]"]')
        this.statusOrderLists = page.locator('div#filter-block-general span.select2-selection')
        this.statusFilterField = this.statusOrderLists.nth(0)
        this.optionList = page.locator('ul.select2-results__options li')
        this.statusFilterSelect = page.locator('div#filter-block-general select[name="status_id[]"]')
        this.submitButton = page.locator('button[type="submit"]')
        this.rowsRegistryTable = page.locator('div.tabulator-row')
        this.columnWithOrderStatuses = page.locator('div[tabulator-field="status_name"].tabulator-cell')
        this.managerFilterField = this.statusOrderLists.nth(1)
        this.managerFilterInput = page.locator('div#filter-block-general input[aria-controls*="select2-manager"]')
        this.optionListAfterFill = page.locator('ul[id*="select2-manager"] li')
        this.columnWithOrderManagers = page.locator('div[tabulator-field="manager_name"].tabulator-cell')
        this.resetAllFiltersButton = page.locator('div.cancel-search-button')
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

    filterByStatusOrder = async () => {
        await this.statusFilterField.waitFor()
        await this.statusFilterField.click()
        await expect(this.optionList.first()).toBeVisible()
        await this.optionList.first().waitFor()
        await this.optionList.filter({ hasText: 'Новый | Расчёт' }).click()
        expect(await this.statusFilterSelect.locator('option:checked').innerText()).toEqual('Новый | Расчёт')
        await this.submitButton.waitFor()
        await this.submitButton.click()
        await this.page.waitForLoadState('load')
        await this.rowsRegistryTable.first().waitFor()
        await helpers.checkingTextForAnArrayOfElements('Новый | Расчёт', this.columnWithOrderStatuses)
    }

    filterByManager = async () => {
        await this.managerFilterField.waitFor()
        await this.managerFilterField.click()
        await this.managerFilterInput.fill('Курятов')
        await expect(this.managerFilterInput).toHaveValue('Курятов')
        await this.optionListAfterFill.waitFor()
        await this.optionListAfterFill.click()
        await this.submitButton.click()
        await this.page.waitForLoadState('load')
        await this.rowsRegistryTable.first().waitFor()
        await helpers.checkingTextForAnArrayOfElements('Курятов А.В.', this.columnWithOrderManagers)
    }
}