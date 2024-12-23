import { test } from "@playwright/test"
import { LoginPage } from "../page-objects/LoginPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage";
import { PartnerPage } from "../page-objects/partnerCreate";

test.afterEach(async ({ page }, testInfo) => {
	if (testInfo.status === "failed") {
		await page.screenshot({ path: 'screenshot.png' })
	}
})

test("Создание контрагента типа физ. лицо", async ({ page }) => {
	await page.goto("/partner/create")

	const loginPage = new LoginPage(page)
	const chooseCompanyPage = new ChooseCompanyPage(page)
	const partnerPage = new PartnerPage(page)

	await loginPage.enterUsernameAndPassword()
	await chooseCompanyPage.choosingCompany()

	await partnerPage.selectPartnerType(3)
	await partnerPage.fillingDetails()

	await page.pause()
}) 