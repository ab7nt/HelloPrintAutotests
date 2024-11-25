import { describe, test } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage.js"
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage.js"
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage.js"
import { ProductRegisterPage } from "../page-objects/ProductRegisterPage.js"

describe.only('Проверка фильтрации реестра изделий', () => {
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

   describe('Проверка фильтров из блока "Основное"', () => {
      test('Проверка фильтра "Статус изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByStatusProduct()
      });
      test('Проверка фильтра "Менеджер изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByManager()
      });
      test('Проверка фильтра "Компания изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByCompany()
      });
      test('Проверка фильтра "Наименование изделия"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByNomenclatureName()
      });
   })

   describe('Проверка фильтров из блока "Маршрут и срочность"', () => {
      test('Проверка фильтра "Участок"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderStageDepartment()
      });
      test('Проверка фильтра "Срочность"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderExpress()
      });
      test('Проверка фильтра "Исполнитель"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderExecutor()
      });
   })

   describe('Проверка фильтров из блока "Даты и сроки"', () => {
      test('Проверка фильтра "Оформлено"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderCreationDate()
      });
      test('Проверка фильтра "Готовность спуска"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderPrepressAt()
      });
      test('Проверка фильтра "Готовность макета"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderLayoutAt()
      });
      test('Проверка фильтра "Макет - Для дизайнеров"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderImpositionAt()
      });
      test('Проверка фильтра "Готовность на производстве"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderProductionAt()
      });
      test('Проверка фильтра "Выдача"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByOrderDeliveryAt()
      });
   })

   // describe('Проверка фильтров из блока "Оплаты и документы"', () => {
   //    test('Проверка фильтра "Статус оплаты', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByPaymentStatus()
   //    });
   //    test('Проверка фильтра "Способ оплаты"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByPaymentType()
   //    });
   //    test('Проверка фильтра "УПД оригинал"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByOriginalUpd()
   //    });
   //    test('Проверка фильтра "Создан счет"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByCreatedInvoice()
   //    });
   //    test('Проверка фильтра "Создан УПД"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByCreatedUpd()
   //    });
   //    test('Проверка фильтра "Поставщик (Наше юр. лицо)"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByPaymentsPartnerCompany()
   //    });
   // })

   describe('Проверка фильтров из блока "Контрагенты"', () => {
      test('Проверка фильтра "Контрагент"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByPartner()
      });
      // test('Проверка фильтра "Представитель"', async ({ page }) => {
      //    const productRegisterPage = new ProductRegisterPage(page)
      //    await productRegisterPage.filteringByPartnerUser()
      // });
      // test('Проверка фильтра "Юридическое лицо контрагента"', async ({ page }) => {
      //    const productRegisterPage = new ProductRegisterPage(page)
      //    await productRegisterPage.filteringByPartnerCompany()
      // });
      // test('Проверка фильтра "Тип клиента"', async ({ page }) => {
      //    const productRegisterPage = new ProductRegisterPage(page)
      //    await productRegisterPage.()
      // });
      test('Проверка фильтра "ИНН контрагента"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByInn()
      });
   })

   // describe('Проверка фильтров из блока "Подряд"', () => {
   //    test('Проверка фильтра "Добавлен подряд"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractorAdded()
   //    });
   //    test('Проверка фильтра "Подрядчик"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractor()
   //    });
   //    test('Проверка фильтра "Номер от подрядчика"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractorNumber()
   //    });
   //    test('Проверка фильтр "Дата поставки"', async ({ page }) => {
   //       const productRegisterPage = new ProductRegisterPage(page)
   //       await productRegisterPage.filteringByContractorDate()
   //    });
   // })


   describe('Проверка фильтров из блока "Остальное"', () => {
      test('Проверка фильтра "Правки по макету"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByLayoutEdit()
      });
      test('Проверка фильтра "Объёмный заказ"', async ({ page }) => {
         const productRegisterPage = new ProductRegisterPage(page)
         await productRegisterPage.filteringByVolume()
      });
   })
});