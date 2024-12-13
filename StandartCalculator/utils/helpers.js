import { expect } from "@playwright/test"

export const helpers = {

   async checkingMultipleElementsForTheTypeNumber(elements) {
      const count = await elements.count()
      for (let i = 0; i < count; i++) {
         const text = await elements.nth(i).inputValue();
         expect(Number(text)).not.toBeNaN()
      }
   },

   async applyUrgencyCategories(urgentCategoryRadioButtons, calcTotalPrice) {
      const calcTotalPriceWithoutUrgent = Number(await calcTotalPrice.inputValue())

      const count = await urgentCategoryRadioButtons.count()
      for (let i = 1; i < count; i++) {

         // Получение размера скидки/наценки из названия срочности
         const labelText = await urgentCategoryRadioButtons.nth(i).innerText()
         const discountAmount = Number(labelText.match(/-?\d+/)[0], 10)

         // Применение категории срочности и сравненеие значений
         await urgentCategoryRadioButtons.nth(i).click()
         const calcTotalPriceAfterUrgent = Number(await calcTotalPrice.inputValue())
         const calcTotalPriceWithUrgent = calcTotalPriceWithoutUrgent + calcTotalPriceWithoutUrgent * (discountAmount / 100)
         expect(calcTotalPriceWithUrgent).toEqual(calcTotalPriceAfterUrgent)
      }

      // Возврат значения без скидки/наценки и сравнение значений с изначальным
      await urgentCategoryRadioButtons.nth(0).click()
      expect(Number(await calcTotalPrice.inputValue())).toEqual(calcTotalPriceWithoutUrgent)
   },

   async checkingTextForAnArrayOfElements(text, elements) {
      const count = await elements.count();

      for (let i = 0; i < count; i++) {
         const currentText = await elements.nth(i).textContent();
         await expect(elements.nth(i)).toContainText(text);
         // console.warn(`Исходный текст: ${text}, Получненный текст: ${currentText}`)
      }
   },

   async areAllStringsNotEmpty(elements) {
      const count = await elements.count();

      for (let i = 0; i < count; i++) {
         expect(await elements.nth(i).textContent()).not.toBe('');
      }
   },

   async checkClipboardText(page, textToCheck) {
      // Получение текста из буфера обмена
      const clipboardText = await page.evaluate(async () => {
         return await navigator.clipboard.readText(); // Чтение текста из буфера обмена
      });

      // Проверка, что текст в буфере обмена соответствует ожидаемому
      expect(clipboardText).toBe(textToCheck)
   },

   async checkingANewPageOpen(context, url, elLocator) {
      const [newPage] = await Promise.all([
         context.waitForEvent('page'),
      ]);
      await newPage.waitForLoadState('load')
      expect(newPage.url()).toMatch(url)
      if (elLocator) await newPage.locator(elLocator).waitFor('visible')
      await newPage.close()
   }

}