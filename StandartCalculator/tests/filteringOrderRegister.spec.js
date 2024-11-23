import { describe, test } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage"
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage"
import { OrderRegisterPage } from "./../page-objects/OrderRegisterPage"

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
      test('Проверка фильтрации по статусу заказа', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByStatusOrder()
      });
      test('Проверка фильтрации по менеджеру', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByManager()
      });
      test('Проверка филььтрации по компании', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCompany()
      });
      test('Проверка филььтрации по продукту', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByProduct()
      });
   })

   describe('Проверка фильтров из блока "Маршрут и срочность"', () => {
      test('Проверка фильтрации по участку', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderStageDepartment()
      });
      test('Проверка фильтрации по срочности', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderExpress()
      });
      test('Проверка филььтрации по исполнителю', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderExecutor()
      });
   })

   describe.only('Проверка фильтров из блока "Даты и сроки"', () => {
      test('Проверка фильтрации по дате оформления заказа', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderCreationDate()
      });
      test('Проверка фильтрации по дате готовности спуска', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderPrepressAt()
      });
      test('Проверка фильтрации по дате готовности макета', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderLayoutAt()
      });
      test('Проверка фильтрации по макету для дизайнеров', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderImpositionAt()
      });
      test('Проверка фильтрации по готовности на производстве', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderProductionAt()
      });
      test('Проверка фильтрации по выдаче заказа', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderDeliveryAt()
      });
      test.only('Проверка фильтрации по дате закрытия заказа', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOrderCompletedAt()
      });
   })

   describe('Проверка фильтров из блока "Оплаты и документы"', () => {
      test('Проверка фильтрации по статусу оплаты', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentStatus()
      });
      test('Проверка фильтрации по способу оплаты', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentType()
      });
      test('Проверка фильтрации по оригиналу УПД', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByOriginalUpd()
      });
      test('Проверка фильтрации по наличию счёта', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCreatedInvoice()
      });
      test('Проверка фильтрации по наличию УПД', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByCreatedUpd()
      });
      test('Проверка фильтрации по поставщику (наше юр.лицо)', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPaymentsPartnerCompany()
      });
   })

   describe('Проверка фильтров из блока "Контрагенты"', () => {
      test('Проверка фильтрации по контрагенту', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartner()
      });
      test('Проверка фильтрации по представителю', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartnerUser()
      });
      test('Проверка фильтрации по юр.лицу контрагента', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByPartnerCompany()
      });
      // test('Проверка фильтрации по типу клиента', async ({ page }) => {
      //    const orderRegisterPage = new OrderRegisterPage(page)
      //    await orderRegisterPage.()
      // });
      test('Проверка фильтрации по ИНН контрагента', async ({ page }) => {
         const orderRegisterPage = new OrderRegisterPage(page)
         await orderRegisterPage.filteringByInn()
      });
   })
});