import { describe, test, expect, } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage";
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage";
import { CreateOrderPage } from "../page-objects/CreateOrderPage";
import { OrderPage } from "../page-objects/OrderPage";
import { LeftSideMenu } from "../page-objects/LeftSideMenu";
import { createOrderInfo } from "../data/createOrderInfo";
import { orderInfo } from "../data/orderInfo";
import { settings } from "../data/settings";
import { CompaniesListPage } from "../page-objects/CompaniesListPage";
import { CompanySettingsPage } from "../page-objects/CompanySettingsPage copy";
import { helpers } from "../utils/helpers";

describe('Функции общей панели для большинства вкладок заказа', () => {
    // Настройки
    test.setTimeout(180 * 1000)

    test.beforeEach(async ({ page, context }) => {
        const loginPage = new LoginPage(page)
        const chooseCompanyPage = new ChooseCompanyPage(page)

        // Разрешение на использование буфера обмена
        await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: settings.env });

        // Открытие страницы
        await page.goto("/")
        // Авторизация
        await loginPage.enterUsernameAndPassword()
        // Выбор компании
        await chooseCompanyPage.choosingCompany()
    })

    test('Добавление доп. номера и проверка его сохранения', async ({ page }) => {
        const orderRegisterPage = new OrderRegisterPage(page)
        const createOrderPage = new CreateOrderPage(page)
        const orderPage = new OrderPage(page)

        // Нажатие на кнопку "Новый заказ" в реестре заказов
        await orderRegisterPage.clickOnNewOrderButton()

        // Выбор контрагента и представителя
        await createOrderPage.selectPartner()
        await createOrderPage.selectPartnerUser()

        // Нажатие на кнопку "Создать заказ" на странице создания заказа
        await createOrderPage.clickOnNewOrderButton()

        // Ввод доп. номера в карточке заказа
        await orderPage.enterAdditionalNumber()

        // Клик по доп. номеру и проверка скопированного текста 
        await orderPage.clickOnAdditionalNunber()

        // Перезагрузка страницы и проверка доп. номера (за вычетом символа "х" вначале)
        await page.reload()
        await page.waitForLoadState('networkidle')
        expect(createOrderInfo.additionalNumber).toBe((await orderPage.additionalNumber.innerText()).slice(1))
    })

    test('Добавление срочности', async ({ page }) => {
        const orderRegisterPage = new OrderRegisterPage(page)
        const createOrderPage = new CreateOrderPage(page)
        const orderPage = new OrderPage(page)

        // Нажатие на кнопку "Новый заказ" в реестре заказов
        await orderRegisterPage.clickOnNewOrderButton()

        // Выбор контрагента и представителя
        await createOrderPage.selectPartner()
        await createOrderPage.selectPartnerUser()

        // Нажатие на кнопку "Создать заказ" на странице создания заказа
        await createOrderPage.clickOnNewOrderButton()

        // Выбор срочночти
        await page.waitForLoadState('networkidle')
        await orderPage.selectExpress()

        // Перезагрузка страницы и проверка срочности
        await page.reload()
        await page.waitForLoadState('networkidle')
        expect('Да').toBe(await orderPage.expressField.innerText()) //Пока проверка идёт на Да", так как заказ создаётся 
    })

    test('Установить заказу каждый статус', async ({ page }) => {
        const orderRegisterPage = new OrderRegisterPage(page)
        const createOrderPage = new CreateOrderPage(page)
        const orderPage = new OrderPage(page)

        // Нажатие на кнопку "Новый заказ" в реестре заказов
        await orderRegisterPage.clickOnNewOrderButton()

        // Выбор контрагента и представителя
        await createOrderPage.selectPartner()
        await createOrderPage.selectPartnerUser()

        // Нажатие на кнопку "Создать заказ" на странице создания заказа
        await createOrderPage.clickOnNewOrderButton()

        // Выбоор статусов кроме "В работе" и "Отменён"
        await page.waitForLoadState('networkidle')
        await orderPage.selectOrderStatusAndChecks(orderInfo.statusIssued)
        await orderPage.selectOrderStatusAndChecks(orderInfo.statusReadyToSent)
        await orderPage.selectOrderStatusAndChecks(orderInfo.statusReadyToIssued)
        await orderPage.selectOrderStatusAndChecks(orderInfo.statusIssued)
        await orderPage.selectOrderStatusAndChecks(orderInfo.statusClosed)
        await orderPage.selectOrderStatusAndChecks(orderInfo.statusNew)
    })

    test('Установить заказу статус "Отменён"', async ({ page }) => {
        const orderRegisterPage = new OrderRegisterPage(page)
        const createOrderPage = new CreateOrderPage(page)
        const orderPage = new OrderPage(page)

        // Нажатие на кнопку "Новый заказ" в реестре заказов
        await orderRegisterPage.clickOnNewOrderButton()

        // Выбор контрагента и представителя
        await createOrderPage.selectPartner()
        await createOrderPage.selectPartnerUser()

        // Нажатие на кнопку "Создать заказ" на странице создания заказа
        await createOrderPage.clickOnNewOrderButton()

        // Выбор статуса "Отменён" с указанием причины
        await page.waitForLoadState('networkidle')
        await orderPage.selectCancelStatus()
        await orderPage.selectReasonForCancellation(orderInfo.reasonForCancellation)
        await orderPage.fillReasonForCancellation()
        await orderPage.clickOnSubmitButtonInPopUpCancel()

        // Перход на вкладку "История" и проверка наличия причины отмены
        await orderPage.clickOnHistoryButton()
    })

    test('Проверка работы ограничений на смену статуса', async ({ page }) => {
        const createOrderPage = new CreateOrderPage(page)
        const orderPage = new OrderPage(page)
        const leftSideMenu = new LeftSideMenu(page)
        const companiesListPage = new CompaniesListPage(page)
        const companySettingsPage = new CompanySettingsPage(page)

        // Переход в карточку компании
        await page.waitForLoadState('load')
        await leftSideMenu.goToTheCompanySettingsPage()
        await companiesListPage.clickOnCompanyName()

        // Установка ограничения для статуса "Заказ - Выполнен | Готов к отправке"
        await companySettingsPage.goToTheLimitsTab()
        await companySettingsPage.addNewLimitForOrder()

        // Создание заказа
        await page.goto('/order/create')
        await createOrderPage.selectPartner()
        await createOrderPage.clickOnNewOrderButton()

        // Выбор статуса "Заказ - Выполнен | Готов к отправке"
        await page.waitForLoadState('networkidle')
        const orderId = page.url().match(/\d+/)[0]
        await orderPage.selectOrderStatus(orderInfo.statusReadyToSent)
        await orderPage.popupLimits.waitFor({ state: 'visible' })

        // Проверка, что в поп-апе есть название статуса (только название, без подстроки "Заказ -") и текс ограничения
        expect(await orderPage.popupLimits.innerText()).toContain(orderInfo.statusReadyToSent.split(" - ")[1])
        expect(await orderPage.popupLimits.innerText()).toContain('комментарий к выдаче')

        // Возврат в карточку компании и удаление ограничения
        await leftSideMenu.goToTheCompanySettingsPage()
        await companiesListPage.clickOnCompanyName()
        await companySettingsPage.goToTheLimitsTab()
        await companySettingsPage.deleteLimits()

        // Возврат в заказ и повторная попытка выбора статуса "Заказ - Выполнен | Готов к отправке"
        await page.goto(`/order/${orderId}/edit`, { waitUntil: 'networkidle' })
        await orderPage.selectOrderStatusAndChecks(orderInfo.statusReadyToSent)
    })
})