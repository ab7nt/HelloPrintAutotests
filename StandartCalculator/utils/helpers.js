import { expect } from "@playwright/test"

export
    const helpers = {
        async checkingMultipleElementsForTheTypeNumber(elements) {
            const count = await elements.count();
            for (let i = 0; i < count; i++) {
                const text = await elements.nth(i).inputValue();
                expect(Number(text)).not.toBeNaN();
                // console.warn((Number(text)))
            }
        },

        // async applyUrgencyCategories (elements) {

        // }

    }