import { describe, test, expect } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage";
import { ChooseCompanyPage } from "../../page-objects/ChooseCompanyPage";
import { OrderRegisterPage } from "../../page-objects/OrderRegisterPage";
import { CreateOrderPage } from "../../page-objects/CreateOrderPage";
import { LeftSideMenu } from "../../page-objects/LeftSideMenu";
import { OrderPage } from "../../page-objects/OrderPage";
import { CashierPage } from "../../page-objects/CashierPage";
import { CalcPageTiles } from "../../page-objects/CalcPageTiles";
import { OrderPageSpecification } from "../../page-objects/OrderPageSpecification";
import { addItemCashier } from "../../data/addItemCashier"
import { createOrderInfo } from "../../data/createOrderInfo";
import { helpers } from "../../utils/helpers";
import { settings } from "../../data/settings"

describe('Создание заказа', () => {
	// Настройки

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

	test("Создание заказа из реестра заказов", async ({ page }) => {
		const orderRegisterPage = new OrderRegisterPage(page)
		const createOrderPage = new CreateOrderPage(page)
		const leftSideMenu = new LeftSideMenu(page)
		const orderPage = new OrderPage(page)

		// Переход на страницу реестра заказов
		await leftSideMenu.goToTheOrderRegisterPage()

		// Нажатие на кнопку "Новый заказ" в реестре заказов
		await orderRegisterPage.clickOnNewOrderButton()

		// Сравнение названия компании на странице создания заказа с компанией, отображённой в левом сайд-меню
		const userCompany = await (await leftSideMenu.userCompany).innerText();
		const orderCompany = await (await createOrderPage.orderObjectField).innerText();
		expect(userCompany).toEqual(orderCompany);

		// Выбор контрагента и представителя
		await createOrderPage.selectPartner()
		await createOrderPage.selectPartnerUser()

		// Выбор параметров в блоке "Параметры"
		await createOrderPage.selectOrderObject()
		await createOrderPage.selectLayout()
		await createOrderPage.selectExpress()
		await createOrderPage.selectOversized()
		await createOrderPage.selectVolume()
		await createOrderPage.selectOffset()
		await createOrderPage.selectExtraditionComment()

		// Выбор параметров в блоке "Дополнительно"
		await createOrderPage.selectSource()
		await createOrderPage.selectAdSource()

		// Сбор данных из заполненных полей
		await createOrderPage.collectingTextFromFilledFields()

		// Нажатие на кнопку "Создать заказ" на странице создания заказа
		await createOrderPage.clickOnNewOrderButton()
		await page.waitForLoadState('networkidle')

		// Проверка параметров в блоке с номером заказа и действиями
		// const orderExpress = await (await orderPage.expressField).innerText()
		// expect(orderExpress).toEqual(createOrderInfo.express)

		// Проверка контрагента в карточке заказа
		const orderPartner = await (await orderPage.partner).innerText()
		expect(orderPartner).toEqual(createOrderInfo.partner)
		// Проверка представителя в карточке заказа
		const orderPartnerUser = await (await orderPage.partnerUser).innerText()
		expect(orderPartnerUser).toEqual(createOrderInfo.partnerUser)
		// Проверка контактов в карточке заказа
		const orderPhone = await (await orderPage.phone).innerText()
		const orderEmail = await (await orderPage.email).innerText()
		const orderTelegram = await (await orderPage.telegram).innerText()
		const orderVk = await (await orderPage.vk).innerText()
		const orderInstagram = await (await orderPage.instagram).innerText()
		expect(orderPhone).toEqual(createOrderInfo.phone)
		expect(orderEmail).toEqual(createOrderInfo.email)
		expect(orderTelegram).toEqual(createOrderInfo.telegram)
		expect(orderVk).toEqual(createOrderInfo.vk)
		expect(orderInstagram).toEqual(createOrderInfo.instagram)
		// Проверка дополнительных параметров
		const orderLayout = await (await orderPage.layoutField).innerText()
		const orderVolume = await (await orderPage.volumeField).innerText()
		const orderOversized = await (await orderPage.oversizedField).innerText()
		const orderOffset = await (await orderPage.offsetField).innerText()
		const orderAdSource = await (await orderPage.adSourceField).innerText()
		const orderSource = await (await orderPage.sourceField).innerText()
		expect(orderLayout).toEqual(createOrderInfo.layout)
		expect(orderVolume).toEqual(createOrderInfo.volume)
		expect(orderOversized).toEqual(createOrderInfo.oversized)
		expect(orderOffset).toEqual(createOrderInfo.offset)
		expect(orderAdSource).toEqual(createOrderInfo.adSource)
		expect(orderSource).toEqual(createOrderInfo.source)
	})

	test("Создание заказа из реестра заказов через кнопку Калькулятор", async ({ page }) => {
		const orderRegisterPage = new OrderRegisterPage(page)
		const createOrderPage = new CreateOrderPage(page)
		const calcPageTiles = new CalcPageTiles(page)
		const leftSideMenu = new LeftSideMenu(page)

		// Переход на страницу реестра заказов
		await leftSideMenu.goToTheOrderRegisterPage()

		// Нажатие на кнопку "Калькулятор" в реестре заказов
		await orderRegisterPage.clickOnOpenCalcButton()

		//
		await calcPageTiles.clickOnCreateOrderButton()

		//
		await createOrderPage.selectPartner()
		await createOrderPage.clickOnNewOrderButton()

		await page.pause()
	})

	test("Проверка кнопки копирования в буфер обмена", async ({ page }) => {
		const createOrderPage = new CreateOrderPage(page)

		await page.goto('/order/create')

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
		const createOrderPage = new CreateOrderPage(page)

		await page.goto('/order/create')

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

	test("Создание заказа из рабочего места оператора", async ({ page, context }) => {
		const cashierPage = new CashierPage(page)
		const leftSideMenu = new LeftSideMenu(page)


		// Переход в рабочее место оператора
		await leftSideMenu.goToTheCashierPage()

		// Добавление расчёта вручную и нажатие на кнопку "Создать заказ"
		expect(await cashierPage.tableItems.count()).toBe(0)
		await cashierPage.addNewItem()
		expect(await cashierPage.tableItems.count()).toBe(1)
		await cashierPage.clickOnCreateOrderButton()
		await cashierPage.clickOnCreateButtonInCreateOrderPopup()

		// Проверка информации на новой вкладке
		const [newPage] = await Promise.all([
			context.waitForEvent('page'),
		]);
		const orderPageSpecification = new OrderPageSpecification(newPage)
		await newPage.waitForLoadState('load')
		await newPage.waitForURL(/\/order\/\d+\/edit/)

		await orderPageSpecification.navItemTabButton.click()
		await orderPageSpecification.checkTableItemInfo(addItemCashier.name, addItemCashier.price, addItemCashier.qty)

		await newPage.close()

		await page.pause()
	})
})