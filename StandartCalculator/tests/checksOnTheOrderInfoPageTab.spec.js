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
import { OrderPageStage } from "../page-objects/OrderPageStage";
import { helpers } from "../utils/helpers";
import { settings } from "../data/settings"
import { orderInfo } from "../data/orderInfo";

describe('Заказ. Вкладка "Инфо"', () => {
	// Настройки
	test.setTimeout(90 * 1000)

	test.beforeEach(async ({ page, context }) => {
		const loginPage = new LoginPage(page)
		const chooseCompanyPage = new ChooseCompanyPage(page)

		// Разрешение на использование буфера обмена
		// await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: settings.env });

		// Открытие страницы
		await page.goto("/")
		// Авторизация
		await loginPage.enterUsernameAndPassword()
		// Выбор компании
		await chooseCompanyPage.choosingCompany()
	})

	test('Заказ. Вкладка "Инфо". Смена контрагента и представилеля', async ({ page }) => {
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
		const orderPartner = await orderPage.partnerField.innerText()
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

	test('Заказ. Вкладка "Инфо". Смена менеджера и кнопка "Взять заказ в работу"', async ({ page }) => {
		const createOrderPage = new CreateOrderPage(page)
		const orderPage = new OrderPage(page)
		const leftSideMenu = new LeftSideMenu(page)

		await page.goto('/order/create')

		// Выбор контрагента
		await createOrderPage.selectPartner()

		// Нажатие на кнопку "Создать заказ" на странице создания заказа
		await createOrderPage.clickOnNewOrderButton()
		await page.waitForLoadState('networkidle')

		// Проверка, что менеджером является авторизованный пользователь
		const lastnameCurrentUser = (await leftSideMenu.userName.innerText()).split(' ')[0]
		const lastnameOrderManager = (await orderPage.managerField.innerText()).split(' ')[0]
		expect(lastnameCurrentUser).toBe(lastnameOrderManager)
		// Проверка наличия имени контрагента в хлебных крошках
		expect(await orderPage.headerTitle.innerText()).toContain(lastnameOrderManager)

		// Смена менеджера
		await orderPage.managerField.click()
		await orderPage.optionList.filter({ hasText: orderInfo.manager2 }).click()
		await orderPage.successAlertSaveChanges.waitFor('visible')

		await page.reload()
		await page.waitForLoadState('networkidle')

		// Проверка, что менеджер поменялся
		expect(await orderPage.managerField.innerText()).toBe(orderInfo.manager2)

		// Проверка наличия имени контрагента в хлебных крошках
		const lastnameOrderManagerAfterChange = (await orderPage.managerField.innerText()).split(' ')[0]
		expect(await orderPage.headerTitle.innerText()).toContain(lastnameOrderManagerAfterChange)

		// Нажатие на кнопку "Взять заказ в работу" и подтверждение в по-апе
		await orderPage.changeManagerByClickOnButton()

		await page.reload()
		await page.waitForLoadState('networkidle')

		// Проверка, что менеджером является авторизованный пользователь
		expect(lastnameCurrentUser).toBe(lastnameOrderManager)
		// Проверка наличия имени контрагента в хлебных крошках
		expect(await orderPage.headerTitle.innerText()).toContain(lastnameOrderManager)
	})

	test('Заказ. Вкладка "Инфо". Возможность создания контрагента в блоке "Заказчик"', async ({ page, context }) => {
		const createOrderPage = new CreateOrderPage(page)
		const orderPage = new OrderPage(page)

		await page.goto('/order/create')

		// Выбор контрагента и представителя
		await createOrderPage.selectPartner()
		await createOrderPage.selectPartnerUser()

		// Нажатие на кнопку "Создать заказ" на странице создания заказа
		await createOrderPage.clickOnNewOrderButton()
		await page.waitForLoadState('networkidle')

		// Открытие страницы создания контрагента при нажатии на "+Добавить" в поле "Контрагент"
		await orderPage.clickOnCreatePartnerButtonFromPartnerField()

		// Проверка открытия страницы создания контрагента в ноовй вкладке
		await helpers.checkingANewPageOpen(context, 'partner/create')

		// Открытие страницы создания контрагента при нажатии на "+Добавить" в поле "Контрагент"
		await orderPage.clickOnCreatePartnerButtonFromPartnerUserField()

		// Проверка открытия страницы контрагента в ноовй вкладке и формы создания представителя
		await helpers.checkingANewPageOpen(
			context,
			/\/partner\/\d+\/edit\?is_user_partner_create=true#agents/,
			'div#create-user-partner-modal')
	})

	test('Заказ. Вкладка "Инфо". Проверка блока "Сроки"', async ({ page, }) => {
		const createOrderPage = new CreateOrderPage(page)
		const orderPage = new OrderPage(page)
		const orderPageStage = new OrderPageStage(page)

		await page.goto('/order/create')

		// Выбор контрагента
		await createOrderPage.selectPartner()

		// Нажатие на кнопку "Создать заказ" на странице создания заказа
		await createOrderPage.clickOnNewOrderButton()
		await page.waitForLoadState('networkidle')

		// Заполнение дат
		// Текущая дата для "Готовность макета"
		const currentDate = new Date()
		const formattedCurrentDate = await helpers.formatDate(currentDate)
		await orderPage.enterADateAtDateInput(formattedCurrentDate, orderPage.layoutAtInput)
		// Плюс 1 день для "Макет - Для дизайнеров"
		const impositionAtDate = new Date()
		impositionAtDate.setDate(currentDate.getDate() + 1)
		const formattedImpositionAtDate = await helpers.formatDate(impositionAtDate)
		await orderPage.enterADateAtDateInput(formattedImpositionAtDate, orderPage.impositionAtInput)
		// Плюс 2 дня для "Готовность спуска"
		const prepressAtDate = new Date()
		prepressAtDate.setDate(currentDate.getDate() + 2)
		const formattedPrepressAtDate = await helpers.formatDate(prepressAtDate)
		await orderPage.enterADateAtDateInput(formattedPrepressAtDate, orderPage.prepressAtInput)
		// Плюс 3 дня для "Готовность заказа"
		const productionAtDate = new Date()
		productionAtDate.setDate(currentDate.getDate() + 3)
		const formattedProductionAtDate = await helpers.formatDate(productionAtDate)
		await orderPage.enterADateAtDateInput(formattedProductionAtDate, orderPage.productionAtInput)
		// Плюс 4 дня для "Выдача"
		const deliveryAtDate = new Date()
		deliveryAtDate.setDate(currentDate.getDate() + 4)
		const formattedDeliveryAtDate = await helpers.formatDate(deliveryAtDate)
		await orderPage.enterADateAtDateInput(formattedDeliveryAtDate, orderPage.deliveryAtInput)

		// Проверка сохранения дат в карточке заказа
		await page.reload()
		expect(orderPage.layoutAtInput).toHaveValue(formattedCurrentDate)
		expect(orderPage.impositionAtInput).toHaveValue(formattedImpositionAtDate)
		expect(orderPage.prepressAtInput).toHaveValue(formattedPrepressAtDate)
		expect(orderPage.productionAtInput).toHaveValue(formattedProductionAtDate)
		expect(orderPage.deliveryAtInput).toHaveValue(formattedDeliveryAtDate)

		// Проверка дат на вкладке "Маршрут"
		await orderPage.clickOnTheStageTab()

		expect(helpers.normalizeValue(await orderPageStage.layoutAtField.inputValue()))
			.toContain(formattedCurrentDate)
		expect(helpers.normalizeValue(await orderPageStage.impositionAtField.inputValue()))
			.toContain(formattedImpositionAtDate)
		expect(helpers.normalizeValue(await orderPageStage.prepressAtField.inputValue()))
			.toContain(formattedPrepressAtDate)
		expect(helpers.normalizeValue(await orderPageStage.productionAtField.inputValue()))
			.toContain(formattedProductionAtDate)
		expect(helpers.normalizeValue(await orderPageStage.deliveryAtField.inputValue()))
			.toContain(formattedDeliveryAtDate)
	})

	test('Заказ. Вкладка "Инфо". Добавление подряда', async ({ page, }) => {
		const createOrderPage = new CreateOrderPage(page)
		const orderPage = new OrderPage(page)

		await page.goto('/order/create')

		// Выбор контрагента
		await createOrderPage.selectPartner()

		// Нажатие на кнопку "Создать заказ" на странице создания заказа
		await createOrderPage.clickOnNewOrderButton()
		await page.waitForLoadState('networkidle')

		// Открытие блока с дополнительной информацией
		await orderPage.clickOnMoreButton()

		// Заполненение полей в блоке "Подрядчики"
		await orderPage.selectContractorsOrganization()
		await orderPage.enteringTheContractNumber()
		await orderPage.selectContractDeliveryDate()

		// Ожидание алерта и перезагрузка страницы
		await orderPage.successAlertSaveChanges.waitFor('visible')
		await page.reload()
		await page.waitForLoadState('networkidle')

		// Проверка заполненных данных после перезагрузки
		expect(await orderPage.contractorOrganizationField.innerText()).toContain(orderInfo.contractorName)
		expect(await orderPage.contractorOrderNumbersField.innerText()).toContain(orderInfo.contractorNumber.replace('x', ''))
		expect(orderPage.contractorDeliveryDateInput).toHaveValue(orderInfo.contractorDeliveryDate)
	})
})