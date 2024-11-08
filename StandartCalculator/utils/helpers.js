import { expect } from "@playwright/test"
import exp from "constants";

export
    const helpers = {
        async checkingMultipleElementsForTheTypeNumber(elements) {
            const count = await elements.count()
            for (let i = 0; i < count; i++) {
                const text = await elements.nth(i).inputValue();
                expect(Number(text)).not.toBeNaN()
                // console.warn((Number(text)))
            }
        },

        async applyUrgencyCategories(urgentCategoryRadioButtons, calcUnitPrice, calcTotalPrice) {
            const calcUnitPriceWithoutUrgent = await calcUnitPrice.inputValue()
            const calcTotalPriceWithoutUrgent = await calcTotalPrice.inputValue()

            const count = await urgentCategoryRadioButtons.count()
            for (let i = 1; i < count; i++) {
                const labelText = await urgentCategoryRadioButtons.nth(i).innerText()
                const startIndex = labelText.indexOf('(') + 1
                const endIndex = labelText.indexOf('%)')
                const numberString = labelText.slice(startIndex, endIndex).trim()
                const discountAmount = Number(numberString)
                // console.warn(discountAmount)
                const calcUnitPriceBeforeUrgent = await calcUnitPrice.inputValue()
                const calcTotalPriceBeforeUrgent = await calcTotalPrice.inputValue()
                await urgentCategoryRadioButtons.nth(i).click()
                const calcUnitPriceAfterUrgent = await calcUnitPrice.inputValue()
                const calcTotalPriceAfterUrgent = await calcTotalPrice.inputValue()

                const calcUnitPriceWithUrgent = (Number(calcUnitPriceWithoutUrgent)) + (Number(calcUnitPriceWithoutUrgent)) * (discountAmount / 100)
                const calcTotalPriceWithUrgent = (Number(calcTotalPriceWithoutUrgent)) + (Number(calcTotalPriceWithoutUrgent)) * (discountAmount / 100)
                // console.warn(Math.round(calcUnitPriceWithUrgent * 100) / 100)
                expect(calcUnitPriceWithUrgent.toFixed(1)).toEqual(Number(calcUnitPriceAfterUrgent).toFixed(1))
                expect(calcTotalPriceWithUrgent.toFixed(1)).toEqual(Number(calcTotalPriceAfterUrgent).toFixed(1))
            }
            await urgentCategoryRadioButtons.nth(0).click()
            expect(await calcUnitPrice.inputValue()).toEqual(calcUnitPriceWithoutUrgent)
            expect(await calcTotalPrice.inputValue()).toEqual(calcTotalPriceWithoutUrgent)
        }

    }