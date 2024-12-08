import { describe, test, expect, wait_until } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage";
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage";
import { CreateOrderPage } from "../page-objects/CreateOrderPage";
import { OrderPage } from "../page-objects/OrderPage";
import { createOrderInfo } from "../data/createOrderInfo";
import { orderInfo } from "../data/orderInfo";

describe.parallel('Функции общей панели для большинства вкладок заказа', () => {
    // Настройки
    test.setTimeout(90 * 1000)

    test.beforeEach(async ({ page, context }) => {
        const loginPage = new LoginPage(page)
        const chooseCompanyPage = new ChooseCompanyPage(page)

        // Разрешение на использование буфера обмена
        await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://dev.helloprint.ru/' });

        // Открытие страницы
        await page.goto("/order")
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

        // Перезагрузка стракницы и проверка доп. номера (за вычетом символа "х" вначале)
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
        await orderPage.selectOrderStatus(orderInfo.statusIssued)
        await orderPage.selectOrderStatus(orderInfo.statusReadyToSent)
        await orderPage.selectOrderStatus(orderInfo.statusReadyToIssued)
        await orderPage.selectOrderStatus(orderInfo.statusIssued)
        await orderPage.selectOrderStatus(orderInfo.statusClosed)
        await orderPage.selectOrderStatus(orderInfo.statusNew)



        await page.pause()
    })
})