import { expect } from "@playwright/test"
import { normalize } from "path";
import { createOrderByAPI } from "../api-calls/createOrder";
import { getaAthorizationToken } from "../api-calls/authorization";
import { LoginPage } from "../page-objects/LoginPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage";
import { settings } from "../data/settings";

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
   },

   async formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0'); // Получаем день
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Получаем месяц (месяцы начинаются с 0)
      const year = date.getFullYear(); // Получаем год
      const hours = String(date.getHours()).padStart(2, '0'); // Получаем часы
      const minutes = String(date.getMinutes()).padStart(2, '0'); // Получаем минуты
      return `${day}.${month}.${year} ${hours}:${minutes}`; // Форматируем в dd.mm.yyyy HH:mm
   },

   async hidingElementBySelector(page, selector) {
      // const openedDateTimePickerSelector = 'div.xdsoft_datetimepicker[style*="display: block"]'
      await page.waitForSelector(selector, { visible: true });
      await page.evaluate(selector => {
         document.querySelector(selector).style.display = 'none'; // Скрываем элемент
      }, selector);
   },

   normalizeValue(value) {
      return value.replace(/\s+/g, ' ')
   },

   async createNewOrderByApiAndOpenItsPage(page) {
      const newOrderURL = await createOrderByAPI()
      await page.goto(newOrderURL)
      expect(page).toHaveURL(newOrderURL)
      await page.waitForLoadState('networkidle')
   },

   async getaAthorizationCookie(browser) {
      // Создаем новый контекст браузера
      const browserContext = await browser.newContext();
      // Создаем новую страницу в этом контексте
      const page = await browserContext.newPage();

      const loginPage = new LoginPage(page)
      const chooseCompanyPage = new ChooseCompanyPage(page)
      // Открытие страницы
      await page.goto("/login")
      // Авторизация
      await loginPage.enterUsernameAndPassword()
      // // Выбор компании
      await chooseCompanyPage.choosingCompany()
      // Сохранение куков авторизации
      settings.authorizationCookies = await browserContext.cookies()
      // Закрытие браузера
      await browserContext.close()
   }
}