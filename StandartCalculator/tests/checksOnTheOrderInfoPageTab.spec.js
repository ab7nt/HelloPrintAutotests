import { describe, test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage";
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage";
import { CreateOrderPage } from "../page-objects/CreateOrderPage";
import { LeftSideMenu } from "../page-objects/LeftSideMenu";
import { OrderPage } from "../page-objects/OrderPage";
import { CashierPage } from "../page-objects/CashierPage";
import { CalcPageTiles } from "../page-objects/CalcPageTiles";
import { OrderPageSpecification } from "../page-objects/OrderPageSpecification";
import { addItemCashier } from "../data/addItemCashier"
import { createOrderInfo } from "../data/createOrderInfo";
import { helpers } from "../utils/helpers";
import { settings } from "../data/settings"

describe('Создание заказа', () => {
	// Настройки
	test.setTimeout(90 * 1000)

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

	test("Смена контрагента и представилеля", async ({ page }) => {
		const createOrderPage = new CreateOrderPage(page)
		const orderPage = new OrderPage(page)

		await page.goto('/order/create')

		// Выбор контрагента
		await createOrderPage.selectPartner()

		// Сбор данных из заполненных полей
		await createOrderPage.collectingTextFromFilledFields()

		// Нажатие на кнопку "Создать заказ" на странице создания заказа
		await createOrderPage.clickOnNewOrderButton()
		await page.waitForLoadState('networkidle')

		// Проверка контрагента в карточке заказа
		const orderPartner = await orderPage.partner.innerText()
		expect(orderPartner).toEqual(createOrderInfo.partner)
		// Проверка телефона в карточке заказа
		const orderPhone = await orderPage.phone.innerText()
		expect(orderPhone).toEqual(createOrderInfo.phone)
		// Проверка емейла в карточке заказа
		const orderEmail = await orderPage.email.innerText()
		expect(orderEmail).toEqual(createOrderInfo.email)

		// Проверка наличия имени контрагента в хлебных крошках
		expect(await orderPage.headerTitle.innerText()).toContain(createOrderInfo.partner)

		// Добавление представителя
		await orderPage.chooseUserPartner()
		await page.reload()

		// Проверка наличия имени контрагента в хлебных крошках
		expect(await orderPage.headerTitle.innerText()).toContain(createOrderInfo.partnerUser)

		// Проверка телефона в карточке заказа
		const orderPhoneAfterSelectPartnerUser = await orderPage.phone.innerText()
		expect(orderPhoneAfterSelectPartnerUser).toEqual('+7 (674) 784-76-56')
		// Проверка емейла в карточке заказа
		const orderEmaiAfterSelectPartnerUser = await orderPage.email.innerText()
		expect(orderEmaiAfterSelectPartnerUser).toEqual('testAPI875689596@test.test')
	})
})