import { test } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage"
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage"
import { OrderRegisterPage } from "./../page-objects/OrderRegisterPage"



test.only('filtering the register', async ({ page }) => {
   // Settings
   test.setTimeout(300 * 1000)
   // test.beforeEach(async ({ page }) => {
   //    await orderRegisterPage.resetAllFilters()
   // })

   // Page objects
   const loginPage = new LoginPage(page)
   const chooseCompanyPage = new ChooseCompanyPage(page)
   const orderRegisterPage = new OrderRegisterPage(page)

   // Visit page
   await page.goto("/order");

   // login
   await loginPage.enterUsernameAndPassword()

   // Select company
   await chooseCompanyPage.choosingCompany()

   // filtering the register by order status
   await orderRegisterPage.resetAllFilters()
   await orderRegisterPage.openPopUpFilter()
   await orderRegisterPage.filterByStatusOrder()

   // filtering the register by order manager
   await orderRegisterPage.resetAllFilters()
   await orderRegisterPage.openPopUpFilter()
   await orderRegisterPage.filterByManager()

   // await page.pause()
})

// test('filtering the register by order manager', async ({ page }) => {
//    // Visit page
//    await page.goto("/order");

//    // Page objects
//    const loginPage = new LoginPage(page)
//    const chooseCompanyPage = new ChooseCompanyPage(page)
//    const orderRegisterPage = new OrderRegisterPage(page)

//    // login
//    await loginPage.enterUsernameAndPassword()

//    // Select company
//    await chooseCompanyPage.choosingCompany()

//    // Reset all filters
//    await orderRegisterPage.resetAllFilters()

//    // Checking
//    await orderRegisterPage.openPopUpFilter()
//    await orderRegisterPage.filterByManager()

//    await page.pause()
// })