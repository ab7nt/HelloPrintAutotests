import { describe, test } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage.js"
import { ChooseCompanyPage } from "../../page-objects/ChooseCompanyPage.js"
import { OrderRegisterPage } from "../../page-objects/OrderRegisterPage.js"

describe('Проверка фильтрации реестра заказов', () => {
   // Настройки
   test.setTimeout(90 * 1000)

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

   describe('Заказы. Проверка фильтров из блока "Основное"', () => {
      test('Заказы. Проверка фильтра "Статус заказа"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByStatusOrder()
      });
      test('Заказы. Проверка фильтра "Менеджер заказа"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByManager()
      });
      test('Заказы. Проверка фильтра "Компания"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCompany()
      });
      test('Заказы. Проверка фильтра "Продукт"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByProduct()
      });
   })

   describe('Заказы. Проверка фильтров из блока "Маршрут и срочность"', () => {
      test('Заказы. Проверка фильтра "Участок"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderStageDepartment()
      });
      test('Заказы. Проверка фильтра "Срочность"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderExpress()
      });
      test('Заказы. Проверка фильтра "Исполнитель"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderExecutor()
      });
   })

   describe('Заказы. Проверка фильтров из блока "Даты и сроки"', () => {
      test('Заказы. Проверка фильтра "Заказ оформлен"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderCreationDate()
      });
      test('Заказы. Проверка фильтра "Готовность спуска"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderPrepressAt()
      });
      test('Заказы. Проверка фильтра "Готовность макета"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderLayoutAt()
      });
      test('Заказы. Проверка фильтра "Макет - Для дизайнеров"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderImpositionAt()
      });
      test('Заказы. Проверка фильтра "Готовность на производстве"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderProductionAt()
      });
      test('Заказы. Проверка фильтра "Выдача заказа"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderDeliveryAt()
      });
      test('Заказы. Проверка фильтра "Заказ закрыт"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderCompletedAt()
      });
   })

   describe('Заказы. Проверка фильтров из блока "Оплаты и документы"', () => {
      test('Заказы. Проверка фильтра "Статус оплаты', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentStatus()
      });
      test('Заказы. Проверка фильтра "Способ оплаты"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentType()
      });
      test('Заказы. Проверка фильтра "УПД оригинал"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOriginalUpd()
      });
      test('Заказы. Проверка фильтра "Создан счет"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCreatedInvoice()
      });
      test('Заказы. Проверка фильтра "Создан УПД"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCreatedUpd()
      });
      test('Заказы. Проверка фильтра "Поставщик (Наше юр. лицо)"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentsPartnerCompany()
      });
   })

   describe('Заказы. Проверка фильтров из блока "Контрагенты"', () => {
      test('Заказы. Проверка фильтра "Контрагент"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartner()
      });
      test('Заказы. Проверка фильтра "Представитель"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartnerUser()
      });
      test('Заказы. Проверка фильтра "Юридическое лицо контрагента"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartnerCompany()
      });
      // test('Заказы. Проверка фильтра "Тип клиента"', async ({ page }) => {
      //    const orderRegisterPage = new OrderRegisterPage(page)
      //    await orderRegisterPage.()
      // });
      test('Заказы. Проверка фильтра "ИНН контрагента"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByInn()
      });
   })

   describe('Заказы. Проверка фильтров из блока "Подряд"', () => {
      test('Заказы. Проверка фильтра "Добавлен подряд"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractorAdded()
      });
      test('Заказы. Проверка фильтра "Подрядчик"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractor()
      });
      test('Заказы. Проверка фильтра "Номер от подрядчика"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractorNumber()
      });
      test('Заказы. Проверка фильтр "Дата поставки"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByContractorDate()
      });
   })

   describe('Заказы. Проверка фильтров из блока "Остальное"', () => {
      test('Заказы. Проверка фильтра "Правки по макету"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByLayoutEdit()
      });
      test('Заказы. Проверка фильтра "Объёмный заказ"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByVolume()
      });
   })


   describe('Заказы. Проверка создания шаблона и фильтрации по нескольким фильтрам', () => {
      test('Заказы. Создание шаблона фильтров "Статус" и "Участок"', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByFilterTemplate()
      })
      test('Заказы. Проверка лимита на создание шаблонов', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.checkingTheTemplateLimit()
      })
   })


});