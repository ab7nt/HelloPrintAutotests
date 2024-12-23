import { describe, test } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage.js"
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage.js"
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage.js"
import { ProductRegisterPage } from "../page-objects/ProductRegisterPage.js"

describe('Проверка фильтрации реестра изделий', () => {
   // Настройки
   test.setTimeout(60 * 1000)

   test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page)
      const chooseCompanyPage = new ChooseCompanyPage(page)
      // const productRegisterPage = new ProductRegisterPage(page)
      const orderRegisterPage = new OrderRegisterPage(page)

      // Открытие страницы
      await page.goto("/products");
      // Авторизация
      await loginPage.enterUsernameAndPassword()
      // Выбор компании
      await chooseCompanyPage.choosingCompany()
      // Сброс всех фильров и открытие поп-апа с фильтрами
      await orderRegisterPage.resetAllFilters()
      await orderRegisterPage.openPopUpFilter()
   })

   describe('Изделия. Проверка фильтров из блока "Основное"', () => {
      test('Изделия. Проверка фильтра "Статус изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByStatusProduct()
      });
      test('Изделия. Проверка фильтра "Менеджер изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByManager()
      });
      test('Изделия. Проверка фильтра "Компания изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByCompany()
      });
      test('Изделия. Проверка фильтра "Наименование изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByNomenclatureName()
      });
   })

   describe('Изделия. Проверка фильтров из блока "Маршрут и срочность"', () => {
      test('Изделия. Проверка фильтра "Участок"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderStageDepartment()
      });
      test('Изделия. Проверка фильтра "Срочность"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderExpress()
      });
      test('Изделия. Проверка фильтра "Исполнитель"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderExecutor()
      });
   })

   describe('Изделия. Проверка фильтров из блока "Даты и сроки"', () => {
      test('Изделия. Проверка фильтра "Оформлено"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderCreationDate()
      });
      test('Изделия. Проверка фильтра "Готовность спуска"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderPrepressAt()
      });
      test('Изделия. Проверка фильтра "Готовность макета"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderLayoutAt()
      });
      test('Изделия. Проверка фильтра "Макет - Для дизайнеров"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderImpositionAt()
      });
      test('Изделия. Проверка фильтра "Готовность на производстве"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderProductionAt()
      });
      test('Изделия. Проверка фильтра "Выдача"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderDeliveryAt()
      });
   })

   // describe('Изделия. Проверка фильтров из блока "Оплаты и документы"', () => {
   //    test('Изделия. Проверка фильтра "Статус оплаты', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByPaymentStatus()
   //    });
   //    test('Изделия. Проверка фильтра "Способ оплаты"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByPaymentType()
   //    });
   //    test('Изделия. Проверка фильтра "УПД оригинал"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByOriginalUpd()
   //    });
   //    test('Изделия. Проверка фильтра "Создан счет"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByCreatedInvoice()
   //    });
   //    test('Изделия. Проверка фильтра "Создан УПД"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByCreatedUpd()
   //    });
   //    test('Изделия. Проверка фильтра "Поставщик (Наше юр. лицо)"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByPaymentsPartnerCompany()
   //    });
   // })

   describe('Изделия. Проверка фильтров из блока "Контрагенты"', () => {
      test('Изделия. Проверка фильтра "Контрагент"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByPartner()
      });
      // test('Изделия. Проверка фильтра "Представитель"', async ({ page }) => {
      //    const productRegisterPage = new ProductRegisterPage(page)
      //    await productRegisterPage.filteringByPartnerUser()
      // });
      // test('Изделия. Проверка фильтра "Юридическое лицо контрагента"', async ({ page }) => {
      //    const productRegisterPage = new ProductRegisterPage(page)
      //    await productRegisterPage.filteringByPartnerCompany()
      // });
      // test('Изделия. Проверка фильтра "Тип клиента"', async ({ page }) => {
      //    const productRegisterPage = new ProductRegisterPage(page)
      //    await productRegisterPage.()
      // });
      test('Изделия. Проверка фильтра "ИНН контрагента"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByInn()
      });
   })

   // describe('Изделия. Проверка фильтров из блока "Подряд"', () => {
   //    test('Изделия. Проверка фильтра "Добавлен подряд"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractorAdded()
   //    });
   //    test('Изделия. Проверка фильтра "Подрядчик"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractor()
   //    });
   //    test('Изделия. Проверка фильтра "Номер от подрядчика"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractorNumber()
   //    });
   //    test('Изделия. Проверка фильтр "Дата поставки"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractorDate()
   //    });
   // })


   describe('Изделия. Проверка фильтров из блока "Остальное"', () => {
      test('Изделия. Проверка фильтра "Правки по макету"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByLayoutEdit()
      });
      test('Изделия. Проверка фильтра "Объёмный заказ"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByVolume()
      });
   })
});