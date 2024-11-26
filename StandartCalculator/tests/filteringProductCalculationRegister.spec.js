import { describe, test } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage.js"
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage.js"
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage.js"
import { ProductCalculationRegisterPage } from "../page-objects/ProductCalculationRegisterPage.js"

describe.only('Проверка фильтрации реестра изделий', () => {
   // Настройки
   test.setTimeout(60 * 1000)

   test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page)
      const chooseCompanyPage = new ChooseCompanyPage(page)
      // const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
      const orderRegisterPage = new OrderRegisterPage(page)

      // Открытие страницы
      await page.goto("/product-calculation");
      // Авторизация
      await loginPage.enterUsernameAndPassword()
      // Выбор компании
      await chooseCompanyPage.choosingCompany()
      // Сброс всех фильров и открытие поп-апа с фильтрами
      await orderRegisterPage.resetAllFilters()
      await orderRegisterPage.openPopUpFilter()
   })

   describe('Проверка фильтров из блока "Основное"', () => {
      test('Проверка фильтра "Контрагент"', async ({ page }) => {
         const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
         await productCalculationRegisterPage.filteringByPartner()
      });
      test('Проверка фильтра "Менеджер расчёта"', async ({ page }) => {
         const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
         await productCalculationRegisterPage.filteringByManager()
      });
   })

   // describe('Проверка фильтров из блока "Маршрут и срочность"', () => {
   //    test('Проверка фильтра "Участок"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByOrderStageDepartment()
   //    });
   //    test('Проверка фильтра "Срочность"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByOrderExpress()
   //    });
   //    test('Проверка фильтра "Исполнитель"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByOrderExecutor()
   //    });
   // })

   describe('Проверка фильтров из блока "Даты и сроки"', () => {
      test('Проверка фильтра "Заказ оформлен"', async ({ page }) => {
         const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
         await productCalculationRegisterPage.filteringByOrderCreationDate()
      });
      // test('Проверка фильтра "Готовность спуска"', async ({ page }) => {
      //    const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
      //    await productCalculationRegisterPage.filteringByOrderPrepressAt()
      // });
      // test('Проверка фильтра "Готовность макета"', async ({ page }) => {
      //    const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
      //    await productCalculationRegisterPage.filteringByOrderLayoutAt()
      // });
      // test('Проверка фильтра "Макет - Для дизайнеров"', async ({ page }) => {
      //    const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
      //    await productCalculationRegisterPage.filteringByOrderImpositionAt()
      // });
      // test('Проверка фильтра "Готовность на производстве"', async ({ page }) => {
      //    const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
      //    await productCalculationRegisterPage.filteringByOrderProductionAt()
      // });
      // test('Проверка фильтра "Выдача"', async ({ page }) => {
      //    const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
      //    await productCalculationRegisterPage.filteringByOrderDeliveryAt()
      // });
   })

   // describe('Проверка фильтров из блока "Оплаты и документы"', () => {
   //    test('Проверка фильтра "Статус оплаты', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByPaymentStatus()
   //    });
   //    test('Проверка фильтра "Способ оплаты"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByPaymentType()
   //    });
   //    test('Проверка фильтра "УПД оригинал"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByOriginalUpd()
   //    });
   //    test('Проверка фильтра "Создан счет"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByCreatedInvoice()
   //    });
   //    test('Проверка фильтра "Создан УПД"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByCreatedUpd()
   //    });
   //    test('Проверка фильтра "Поставщик (Наше юр. лицо)"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByPaymentsPartnerCompany()
   //    });
   // })

   // describe('Проверка фильтров из блока "Контрагенты"', () => {
   //    test('Проверка фильтра "Контрагент"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByPartner()
   //    });
   //    test('Проверка фильтра "Представитель"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByPartnerUser()
   //    });
   //    test('Проверка фильтра "Юридическое лицо контрагента"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByPartnerCompany()
   //    });
   //    test('Проверка фильтра "Тип клиента"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.()
   //    });
   //    test('Проверка фильтра "ИНН контрагента"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByInn()
   //    });
   // })

   // describe('Проверка фильтров из блока "Подряд"', () => {
   //    test('Проверка фильтра "Добавлен подряд"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByContractorAdded()
   //    });
   //    test('Проверка фильтра "Подрядчик"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByContractor()
   //    });
   //    test('Проверка фильтра "Номер от подрядчика"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByContractorNumber()
   //    });
   //    test('Проверка фильтр "Дата поставки"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByContractorDate()
   //    });
   // })


   // describe('Проверка фильтров из блока "Остальное"', () => {
   //    test('Проверка фильтра "Правки по макету"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByLayoutEdit()
   //    });
   //    test('Проверка фильтра "Объёмный заказ"', async ({ page }) => {
   //       const productCalculationRegisterPage = new ProductCalculationRegisterPage(page)
   //       await productCalculationRegisterPage.filteringByVolume()
   //    });
   // })
});