import { describe, test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage";
import { OrderRegisterPage } from "../page-objects/OrderRegisterPage";
import { CreateOrderPage } from "../page-objects/CreateOrderPage";
import { LeftSideMenu } from "../page-objects/LeftSideMenu";
import { OrderPage } from "../page-objects/OrderPage";
import { createOrderInfo } from "../data/createOrderInfo";
import { helpers } from "../utils/helpers";

describe.parallel('Создание заказа', () => {
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

	test("Создание заказа из реестра заказов", async ({ page }) => {
		const orderRegisterPage = new OrderRegisterPage(page)
		const createOrderPage = new CreateOrderPage(page)
		const leftSideMenu = new LeftSideMenu(page)
		const orderPage = new OrderPage(page)

		// Нажатие на кнопку "Новый заказ" в реестре заказов
		await orderRegisterPage.clickOnNewOrderButton()

		// Сравнение названия компании на странице создания заказа с компанией, отображённой в левом сайд-меню
		const userCompany = await (await leftSideMenu.userCompany).innerText();
		const orderCompany = await (await createOrderPage.orderObjectField).innerText();
		expect(userCompany).toEqual(orderCompany);
		// Выбор контрагента и представителя
		await createOrderPage.selectPartner()
		await createOrderPage.selectPartnerUser()
		// Нажатие на кнопку "Создать заказ" на странице создания заказа
		await createOrderPage.clickOnNewOrderButton()

		// Проверка контрагента в карточке заказа
		const orderPartner = await (await orderPage.partner).innerText()
		expect(orderPartner).toEqual(createOrderInfo.partner)
		// Проверка контрагента в карточке заказа
		const orderPartnerUser = await (await orderPage.partnerUser).innerText()
		expect(orderPartnerUser).toEqual(createOrderInfo.partnerUser)
		// Проверка контактов в карточке заказа
		const orderPhone = await (await orderPage.phone).innerText()
		expect(orderPhone).toEqual(createOrderInfo.phone)
		const orderEmail = await (await orderPage.email).innerText()
		expect(orderEmail).toEqual(createOrderInfo.email)
		const orderTelegram = await (await orderPage.telegram).innerText()
		expect(orderTelegram).toEqual(createOrderInfo.telegram)
		const orderVk = await (await orderPage.vk).innerText()
		expect(orderVk).toEqual(createOrderInfo.vk)
		const orderInstagram = await (await orderPage.instagram).innerText()
		expect(orderInstagram).toEqual(createOrderInfo.instagram)
	})

	test("Проверка кнопки копирования в буфер обмена", async ({ page }) => {
		const orderRegisterPage = new OrderRegisterPage(page)
		const createOrderPage = new CreateOrderPage(page)

		// Нажатие на кнопку "Новый заказ" в реестре заказов
		await orderRegisterPage.clickOnNewOrderButton()

		// Выбор контрагента и представителя
		await createOrderPage.selectPartner()
		await createOrderPage.selectPartnerUser()
		// Нажатие на нопку копирования и проверка текста в буфер обмена
		// Контрагент
		await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.partnerCopyTextButton)
		await helpers.checkClipboardText(page, await (createOrderPage.partnerField).innerText())
		// Представитель
		// await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.orderPartnerUserCopyTextButton)
		// await helpers.checkClipboardText(page, await (createOrderPage.orderPartnerUserField).innerText())
		// Телефон
		await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.phoneCopyTextButton)
		await helpers.checkClipboardText(page, await (createOrderPage.phoneField).innerText())
		// Email
		await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.emailCopyTextButton)
		await helpers.checkClipboardText(page, await (createOrderPage.emailField).innerText())
		// Телеграм
		await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.telegramCopyTextButton)
		await helpers.checkClipboardText(page, await (createOrderPage.telegramField).innerText())
		// Вконтакте
		await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.vkCopyTextButton)
		await helpers.checkClipboardText(page, await (createOrderPage.vkField).innerText())
		// Инстаграм
		await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.instagramCopyTextButton)
		await helpers.checkClipboardText(page, await (createOrderPage.instagramField).innerText())
		// Юр. лицо
		await createOrderPage.clickOnCopyToClipboardButton(createOrderPage.legalEntityCopyTextButton)
		await helpers.checkClipboardText(page, await (createOrderPage.legalEntitySelect).innerText())
	})

	test("Проверка кнопки перехода в карточку", async ({ page, context }) => {
		const orderRegisterPage = new OrderRegisterPage(page)
		const createOrderPage = new CreateOrderPage(page)

		// Нажатие на кнопку "Новый заказ" в реестре заказов
		await orderRegisterPage.clickOnNewOrderButton()

		// Выбор контрагента и представителя
		await createOrderPage.selectPartner()
		await createOrderPage.selectPartnerUser()

		// Сохранение выбранных значений из селектов, чтобы проверить их наличие в URL страниц, открытых в новых вкладках
		const idForCheckPartnerUrl = await (createOrderPage.partnerSelect).inputValue()
		const idForCheckPartnerUserUrl = 202439 // Временная заплатка, так как value в select не соответсвует id представителя. Вместо числа должно быть await (createOrderPage.orderPartnerUserSelect).inputValue()
		const idForCheckLegalEntityUrl = await (createOrderPage.legalEntitySelect).inputValue()

		// Нажатие на кнопку открытия в новой вкладке и проверка наличия id в URL новой страницы
		// Контрагент
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.partnerInNewTabButton, idForCheckPartnerUrl)
		// Представитель
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.partnerUserInNewTabButton, idForCheckPartnerUserUrl)
		// Телефон
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.phoneInNewTabButton, idForCheckPartnerUserUrl)
		// Email
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.emailInNewTabButton, idForCheckPartnerUserUrl)
		// Телеграм
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.telegramInNewTabButton, idForCheckPartnerUserUrl)
		// Вконтакте
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.vkInNewTabButton, idForCheckPartnerUserUrl)
		// Инстаграм
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.instagramInNewTabButton, idForCheckPartnerUserUrl)
		// Юр. лицо
		await createOrderPage.clickOnOpenNewTabButtonAndChecks(
			context, createOrderPage.legalEntityInNewTabButton, idForCheckLegalEntityUrl)
	})
})