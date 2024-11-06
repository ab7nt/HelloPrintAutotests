import { expect } from "@playwright/test";
import exp from "constants";

export class CalcPage {
    constructor(page) {
        this.page = page
        this.calcGgroupList = this.page.locator("div[uitest='calc-group']")
        this.calcGgroup = this.calcGgroupList.nth(0)
        this.calcGgroupItem = this.page.getByText('ТЕСТОВЫЕ', { exact: true })
        this.calcSubGroup = this.calcGgroupList.nth(1)
        this.calcSubGroupItem = this.page.getByText("Тест стандартный (пользовательское) произвольные тиражи", { exact: true })
        this.calcAttribute1 = this.calcGgroupList.nth(2)
        // this.calcAttribute1List = this.page.locator("div:has(label:text('Атрибут 1')) div.custom-option")
        this.calcAttribute1List = this.calcAttribute1.locator("div.custom-option")
        this.calcAttribute1Item1 = this.page.getByText("Значение 1 атрибута 1", { exact: true })
        this.calcAttribute1Item2 = this.page.getByText("Значение 2 атрибута 1", { exact: true })
        this.calcAttribute2 = this.calcGgroupList.nth(3)
        this.calcAttribute2List = this.calcAttribute2.locator("div.custom-option")
        this.calcAttribute2Item1 = this.page.getByText("Значение 1 атрибута 2", { exact: true })
        this.calcAttribute2Item2 = this.page.getByText("Значение 2 атрибута 2", { exact: true })
        this.testOption1 = this.calcGgroupList.nth(4)
        this.testOption1Item1 = this.page.getByText("Не выбрано", { exact: true })
        this.testOption1Item2 = this.page.getByText("тест номенклатура (фикс) 10рублей/шт", { exact: true })
        this.testOption1Item3 = this.page.getByText("тест номенклатура (интервал) (1-10 = 5, 11+=4)", { exact: true })
        this.calcAmmount = this.page.locator("div.component__amount input")
        this.calcUnitPrice = this.page.locator("input#ed5").nth(1)
        this.calcTotalAmount = this.page.locator("input#ed6").nth(1)
        this.errorAlert = this.page.locator("div[role='alert']")
    }

    selectGroupAndSubgroup = async () => {
        await this.page.waitForURL(/calculator/)
        await this.calcGgroup.waitFor()
        await this.calcGgroup.nth(0).click()
        await this.calcGgroupItem.waitFor()
        await this.calcGgroupItem.click()

        await this.calcSubGroup.waitFor()
        await this.calcSubGroup.click()
        await this.calcSubGroupItem.waitFor()
        await this.calcSubGroupItem.click()
    }

    checkingTheDefaultValues = async () => {
        await this.calcAttribute1.waitFor()
        expect(await this.calcAttribute1.textContent()).toEqual("Значение 1 атрибута 1")
        await this.calcAttribute2.waitFor()
        expect(await this.calcAttribute2.textContent()).toEqual("Значение 1 атрибута 2")
        await this.testOption1.waitFor()
        expect(await this.testOption1.textContent()).toEqual("нулевая стоимость")
        await this.calcAmmount.waitFor()
        expect(await this.calcAmmount.inputValue()).toEqual("4")
        await this.calcUnitPrice.waitFor()
        await expect(this.calcUnitPrice).toHaveValue("27.5")
        await this.calcTotalAmount.waitFor()
        await expect(this.calcTotalAmount).toHaveValue("110")
    }

    changingTheFirstAttribute = async () => {
        await this.calcAttribute2.click()
        expect(await this.calcAttribute2List.count()).toEqual(2)

        await this.calcAttribute1.click()
        await this.calcAttribute1Item2.click()
        expect(await this.calcAttribute2.textContent()).toEqual("Не выбрано")
        await this.errorAlert.waitFor()
        expect(await this.errorAlert.textContent()).toEqual("Сборка не найдена ")
    }

    changingTheSecondAttribute = async () => {
        await this.calcAttribute2.click()
        expect(await this.calcAttribute2List.count()).toEqual(1)
        await this.calcAttribute2Item2.click()
        expect(await this.errorAlert.textContent()).toEqual("Значение не попадает в интервалы :  сборка Значение 2 атрибута 1 / Значение 2 атрибута 2")
    }

    selectTheFirstItemTestOption = async () => {
        await this.testOption1.click()
        await this.testOption1Item1.click()
        expect(await this.errorAlert.first().textContent()).toEqual("Значения обязательных опций не были выбраны. ")
    }

    checkingTheMinimumCost = async () => {
        await this.calcAttribute1.click()
        await this.calcAttribute1Item1.click()
        await this.calcAttribute2.click()
        await this.calcAttribute2Item1.click()
        await this.testOption1.click()
        await this.testOption1Item2.click()
        await expect(this.calcTotalAmount).toHaveValue("154")
    }

    checkingTheCostPerUnit = async () => {
        await this.testOption1.click()
        await this.testOption1Item3.click()
        await this.calcAmmount.fill("10")
        await expect(this.calcAmmount).toHaveValue("10")
        await expect(this.calcTotalAmount).toHaveValue("187")
    }
}