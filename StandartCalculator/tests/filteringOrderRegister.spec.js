import { describe, test } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage.js"
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage.js"
import { OrderRegisterPage } from "./../page-objects/OrderRegisterPage.js"

describe('Проверка фильтрации реестра заказов', () => {
   // Настройки
   test.setTimeout(300 * 1000)

   test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page)
      const chooseCompanyPage = new ChooseCompanyPage(page)
      const orderRegisterPage = new OrderRegisterPage(page)

      // Открытие страницы
      await page.goto("/order");
      // Авторизация
      await loginPage.enterUsernameAndPassword()
      // Выбор компании
      await chooseCompanyPage.choosingCompany()
      // Сброс всех фильров и открытие поп-апа с фильтрами
      await orderRegisterPage.resetAllFilters()
      await orderRegisterPage.openPopUpFilter()
   })

   describe('Проверка фильтров из блока "Основное"', () => {
      test('Проверка фильтра "Статус заказа"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByStatusOrder()
      });
      test('Проверка фильтра "Менеджер заказа"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByManager()
      });
      test('Проверка фильтра "Компания"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCompany()
      });
      test('Проверка фильтра "Продукт"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByProduct()
      });
   })

   describe('Проверка фильтров из блока "Маршрут и срочность"', () => {
      test('Проверка фильтра "Участок"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderStageDepartment()
      });
      test('Проверка фильтра "Срочность"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderExpress()
      });
      test('Проверка фильтра "Исполнитель"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderExecutor()
      });
   })

   describe('Проверка фильтров из блока "Даты и сроки"', () => {
      test('Проверка фильтра "Заказ оформлен"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderCreationDate()
      });
      test('Проверка фильтра "Готовность спуска"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderPrepressAt()
      });
      test('Проверка фильтра "Готовность макета"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderLayoutAt()
      });
      test('Проверка фильтра "Макет - Для дизайнеров"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderImpositionAt()
      });
      test('Проверка фильтра "Готовность на производстве"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderProductionAt()
      });
      test('Проверка фильтра "Выдача заказа"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderDeliveryAt()
      });
      test('Проверка фильтра "Заказ закрыт"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderCompletedAt()
      });
   })

   describe('Проверка фильтров из блока "Оплаты и документы"', () => {
      test('Проверка фильтра "Статус оплаты', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentStatus()
      });
      test('Проверка фильтра "Способ оплаты"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentType()
      });
      test('Проверка фильтра "УПД оригинал"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOriginalUpd()
      });
      test('Проверка фильтра "Создан счет"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCreatedInvoice()
      });
      test('Проверка фильтра "Создан УПД"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCreatedUpd()
      });
      test('Проверка фильтра "Поставщик (Наше юр. лицо)"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentsPartnerCompany()
      });
   })

   describe('Проверка фильтров из блока "Контрагенты"', () => {
      test('Проверка фильтра "Контрагент"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartner()
      });
      test('Проверка фильтра "Представитель"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartnerUser()
      });
      test('Проверка фильтра "Юридическое лицо контрагента"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartnerCompany()
      });
      // test('Проверка фильтра "Тип клиента"', async ({ page }) => {
      //    const orderRegisterPage = new OrderRegisterPage(page)
      //    await orderRegisterPage.()
      // });
      test('Проверка фильтра "ИНН контрагента"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByInn()
      });
   })

   describe('Проверка фильтров из блока "Подряд"', () => {
      test('Проверка фильтра "Добавлен подряд"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractorAdded()
      });
      test('Проверка фильтра "Подрядчик"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractor()
      });
      test('Проверка фильтра "Номер от подрядчика"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractorNumber()
      });
      test('Проверка фильтр "Дата поставки"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractorDate()
      });
   })


   describe('Проверка фильтров из блока "Остальное"', () => {
      test('Проверка фильтра "Правки по макету"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByLayoutEdit()
      });
      test('Проверка фильтра "Объёмный заказ"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByVolume()
      });
   })
});