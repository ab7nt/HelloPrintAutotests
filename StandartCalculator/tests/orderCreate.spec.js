import { describe, test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage";
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage";
import { CreateOrderPage } from "../page-objects/CreateOrderPage";
import { LeftSideMenu } from "../page-objects/LeftSideMenu";
import { OrderPage } from "../page-objects/OrderPage";
import { createOrderInfo } from "../data/createOrderInfo";

describe('Создание заказа', () => {
	// Настройки
	test.setTimeout(90 * 1000)

	test.beforeEach(async ({ page }) => {
		const loginPage = new LoginPage(page)
		const chooseCompanyPage = new ChooseCompanyPage(page)

		// Открытие страницы
		await page.goto("/order")
		// Авторизация
		await loginPage.enterUsernameAndPassword()
		// Выбор компании
		await chooseCompanyPage.choosingCompany()
	})

	test("Создание заказа из реестра заказов", async ({ page }) => {
		const orderRegisterPage = new OrderRegisterPage(page)
		const createOrderPage = new CreateOrderPage(page)
		const leftSideMenu = new LeftSideMenu(page)
		const orderPage = new OrderPage(page)

		await orderRegisterPage.clickOnNewOrderButton()

		const userCompany = await (await leftSideMenu.userCompany).innerText();
		const orderCompany = await (await createOrderPage.orderObject).innerText();
		expect(userCompany).toEqual(orderCompany);

		await createOrderPage.selectPartner()
		await createOrderPage.selectPartnerUser()
		await createOrderPage.clickOnNewOrderButton()

		const orderPartner = await (await orderPage.partner).innerText()
		expect(orderPartner).toEqual(createOrderInfo.partner)

		const orderPhone = await (await orderPage.phone).innerText()
		expect(orderPhone).toEqual(createOrderInfo.phone)

		await page.pause()
	})
})