import { expect } from "@playwright/test";
import { helpers } from "./../utils/helpers"

export class CalcPage {
    constructor(page) {
        this.page = page
        this.calcGgroupList = this.page.locator("div[uitest='calc-group']")
        this.calcGgroup = this.calcGgroupList.nth(0)
        this.calcGgroupItem = this.page.getByText('ТЕСТОВЫЕ', { exact: true })
        this.calcSubGroup = this.calcGgroupList.nth(1)
        this.calcSubGroupItem1 = this.page.getByText("Тест стандартный (пользовательское) произвольные тиражи", { exact: true })
        this.calcSubGroupItem2 = this.page.getByText("Тест стандартный (пользовательское) заданные тиражи", { exact: true })
        this.calcAttribute1 = this.calcGgroupList.nth(2)
        this.calcAttribute1List = this.calcAttribute1.locator("div.custom-option")
        this.calcAttribute1Item1 = this.page.getByText("Значение 1 атрибута 1", { exact: true })
        this.calcAttribute1Item2 = this.page.getByText("Значение 2 атрибута 1", { exact: true })
        this.calcAttribute2 = this.calcGgroupList.nth(3)
        this.calcAttribute2List = this.calcAttribute2.locator("div.custom-option")
        this.calcAttribute2Item1 = this.page.getByText("Значение 1 атрибута 2", { exact: true })
        this.calcAttribute2Item2 = this.page.getByText("Значение 2 атрибута 2", { exact: true })
        this.calcTestOption1 = this.calcGgroupList.nth(4)
        this.calcTestOption1Item1 = this.page.getByText("Не выбрано", { exact: true })
        this.calcTestOption1Item2 = this.page.getByText("тест номенклатура (фикс) 10рублей/шт", { exact: true })
        this.calcTestOption1Item3 = this.page.getByText("тест номенклатура (интервал) (1-10 = 5, 11+=4)", { exact: true })
        this.calcTestOption1Item4 = this.page.getByText("тест произвольное количество опций (1-10 = 5, 11+=4)+по умолчанию + минималка 10", { exact: true })
        this.calcTestOption1Item5 = this.page.getByText("нулевая стоимость", { exact: true })
        this.calcChoosingAPrintRun = this.calcGgroupList.nth(5)
        this.calcChoosingAPrintRunList = this.calcChoosingAPrintRun.locator("div.custom-option")
        this.calcPrintRunValue = this.calcChoosingAPrintRun.locator("div.css-79qbkc-singleValue")
        this.calcAmmount = this.page.locator("div.component__amount input")
        this.calcPriceInputs = this.page.locator("div.right-group__footer input.calculator-price-cost-input")
        this.calcUnitPrice = this.page.locator("input#ed5").nth(1)
        this.calcTotalPrice = this.page.locator("input#ed6").nth(1)
        this.errorAlert = this.page.locator("div[role='alert']")
        this.urgentCategoryRadioButtons = this.page.locator("input[name='inlineRadioPriceOptions'] ~ label")
    }

    selectGroupAndSubgroup = async () => {
        await this.page.waitForURL(/calculator/)
        await this.calcGgroup.waitFor()
        await this.calcGgroup.nth(0).click()
        await this.calcGgroupItem.waitFor()
        await this.calcGgroupItem.click()

        await this.calcSubGroup.waitFor()
        await this.calcSubGroup.click()
        await this.calcSubGroupItem1.waitFor()
        await this.calcSubGroupItem1.click()
    }

    checkingTheDefaultValuesForCustomPrintRuns = async () => {
        await this.calcAttribute1.waitFor()
        expect(await this.calcAttribute1.textContent()).toEqual("Значение 1 атрибута 1",
            'В первом атрибуте выбрано значение не "Значение 1 атрибута 1"')
        await this.calcAttribute2.waitFor()
        expect(await this.calcAttribute2.textContent()).toEqual("Значение 1 атрибута 2",
            'Во втором атирбуте выбрано не значение "Значение 1 атрибута 2"')
        await this.calcTestOption1.waitFor()
        expect(await this.calcTestOption1.textContent()).toEqual("нулевая стоимость",
            'В тестовой опции выбрано не "нулевая стоимость"')
        await this.calcAmmount.waitFor()
        expect(await this.calcAmmount.inputValue()).toEqual("4",
            'Тираж по умолчанию не равен 4')
        await this.calcUnitPrice.waitFor()
        await expect(this.calcUnitPrice).toHaveValue("27.5",
            'Стоимость за единицу не равна 27.5')
        await this.calcTotalPrice.waitFor()
        await expect(this.calcTotalPrice).toHaveValue("110",
            'Общая сумма расчёта не равна 110')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)
    }

    changingTheFirstAttribute = async () => {
        await this.calcAttribute2.click()
        expect(await this.calcAttribute2List.count()).toEqual(2, 'Количество параметров во втором атрибуте не равно двум')

        await this.calcAttribute1.click()
        await this.calcAttribute1Item2.click()
        expect(await this.calcAttribute2.textContent()).toEqual("Не выбрано", 'Во втором атирбуте выбрано не значение "Не выбрано"')
        await this.errorAlert.waitFor()
        expect(await this.errorAlert.textContent()).toEqual("Сборка не найдена ", 'В алерте об ошибке отображается не "Сборка не найдена"')
    }

    changingTheSecondAttribute = async () => {
        await this.calcAttribute2.click()
        expect(await this.calcAttribute2List.count()).toEqual(1, 'Количество параметров во втором атрибуте не равно одному')
        await this.calcAttribute2Item2.click()
        expect(await this.errorAlert.textContent()).toEqual("Значение не попадает в интервалы :  сборка Значение 2 атрибута 1 / Значение 2 атрибута 2")
    }

    selectTheFirstItemTestOption = async () => {
        await this.calcTestOption1.click()
        await this.calcTestOption1Item1.click()
        expect(await this.errorAlert.first().textContent()).toEqual("Значения обязательных опций не были выбраны. ")
    }

    checkingTheMinimumCost = async () => {
        await this.calcAttribute1.click()
        await this.calcAttribute1Item1.click()
        await this.calcAttribute2.click()
        await this.calcAttribute2Item1.click()
        await this.calcTestOption1.click()
        await this.calcTestOption1Item2.click()
        await expect(this.calcUnitPrice).toHaveValue("38.5",
            'Стоимость за единицу не равна 38.5')
        await expect(this.calcTotalPrice).toHaveValue("154",
            'Общая сумма расчёта не равна 154')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)
    }

    checkingTheCostPerUnit = async () => {
        await this.calcTestOption1.click()
        await this.calcTestOption1Item3.click()
        await this.calcAmmount.fill("10")
        await expect(this.calcAmmount).toHaveValue("10")
        // await expect(this.calcTotalPrice).toHaveValue("187")
        await expect(this.calcUnitPrice).toHaveValue("18.7",
            'Стоимость за единицу не равна 18.7')
        await expect(this.calcTotalPrice).toHaveValue("187",
            'Общая сумма расчёта не равна 187')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)
    }

    ceckingTheCostPerPrintRun = async () => {
        await this.calcTestOption1.click()
        await this.calcTestOption1Item4.click()
        await this.calcAmmount.fill("14")
        await expect(this.calcAmmount).toHaveValue("14")
        await expect(this.calcUnitPrice).toHaveValue("26.71",
            'Стоимость за единицу не равна 26.71')
        await expect(this.calcTotalPrice).toHaveValue("374",
            'Общая сумма расчёта не равна 374')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)

        await this.calcAmmount.fill("50")
        await expect(this.calcAmmount).toHaveValue("50")
        await expect(this.calcUnitPrice).toHaveValue("10.34",
            'Стоимость за единицу не равна 10.34')
        await expect(this.calcTotalPrice).toHaveValue("517",
            'Общая сумма расчёта не равна 517')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)
    }

    checkingTheConnectionWithAnotherCalculatorOrBuild = async () => {
        await this.calcAttribute2.click()
        await this.calcAttribute2Item2.click()
        await this.calcTestOption1.click()
        await this.calcTestOption1Item2.click()
        await this.calcAmmount.fill("4")
        await expect(this.calcAmmount).toHaveValue("4")
        await expect(this.calcUnitPrice).toHaveValue("38.5",
            'Стоимость за единицу не равна 38.5')
        await expect(this.calcTotalPrice).toHaveValue("154",
            'Общая сумма расчёта не равна 154')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)

        await this.calcTestOption1.click()
        await this.calcTestOption1Item3.click()
        await this.calcAmmount.fill("10")
        await expect(this.calcAmmount).toHaveValue("10")
        await expect(this.calcUnitPrice).toHaveValue("18.7",
            'Стоимость за единицу не равна 18.7')
        await expect(this.calcTotalPrice).toHaveValue("187",
            'Общая сумма расчёта не равна 187')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)

        await this.calcTestOption1.click()
        await this.calcTestOption1Item4.click()
        await this.calcAmmount.fill("14")
        await expect(this.calcAmmount).toHaveValue("14")
        await expect(this.calcUnitPrice).toHaveValue("26.71",
            'Стоимость за единицу не равна 26.71')
        await expect(this.calcTotalPrice).toHaveValue("374",
            'Общая сумма расчёта не равна 374')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)

        await helpers.applyUrgencyCategories(this.urgentCategoryRadioButtons, this.calcUnitPrice, this.calcTotalPrice)

    }

    checkingTheSpecifiedPrintRuns = async () => {
        await this.calcSubGroup.click()
        await this.calcSubGroupItem2.click()
        expect(await this.calcAttribute1.textContent()).toEqual("Значение 1 атрибута 1",
            'В первом атрибуте выбрано значение не "Значение 1 атрибута 1"')
        expect(await this.calcAttribute2.textContent()).toEqual("Значение 1 атрибута 2",
            'Во втором атирбуте выбрано не значение "Значение 1 атрибута 2"')
        expect(await this.calcTestOption1.textContent()).toEqual("значение", 'В тестовой опции выбрано не "значение"')

        await this.calcAttribute1.click()
        await this.calcAttribute1Item2.click()
        await this.calcAttribute2.click()
        await this.calcAttribute2Item2.click()
        await this.calcChoosingAPrintRun.click()
        await this.calcChoosingAPrintRunList.nth(0).click()
        await expect(this.calcPrintRunValue).toHaveText("10")
        await expect(this.calcUnitPrice).toHaveValue("23.1",
            'Стоимость за единицу не равна 23.1')
        await expect(this.calcTotalPrice).toHaveValue("231",
            'Общая сумма расчёта не равна 231')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)

        await this.calcChoosingAPrintRun.click()
        await this.calcChoosingAPrintRunList.nth(1).click()
        await expect(this.calcPrintRunValue).toHaveText("20")
        await expect(this.calcUnitPrice).toHaveValue("23.1",
            'Стоимость за единицу не равна 23.1')
        await expect(this.calcTotalPrice).toHaveValue("462",
            'Общая сумма расчёта не равна 462')
        await helpers.checkingMultipleElementsForTheTypeNumber(this.calcPriceInputs)

        // await this.page.pause()

        await helpers.applyUrgencyCategories(this.urgentCategoryRadioButtons, this.calcUnitPrice, this.calcTotalPrice)
    }
}