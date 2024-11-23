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
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByStatusOrder()

   // filtering the register by order manager
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByManager()

   // filtering the register filtering by order company
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByCompany()

   // filtering the register filtering by product
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByProduct()

   // filtering the register filtering by order creation date
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByOrderCreationDate()

   // filtering the register filtering by stage department
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByOrderStageDepartment()

   // filtering the register filtering by executor
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByOrderExecutor()

   // filtering the register filtering by express
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByOrderExpress()

   // filtering the register filtering by payment status
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByPaymentStatus()

   // filtering the register filtering by payment status
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByPaymentType()

   // filtering the register filtering by original UPD
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByOriginalUpd()

   // filtering the register filtering by created invoice
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByCreatedInvoice()

   // filtering the register filtering by created invoice
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByCreatedUpd()

   // filtering the register filtering by payments partner company
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByPaymentsPartnerCompany()

   // filtering the register filtering by partner
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByPartner()

   // filtering the register filtering by partner user
   // await orderRegisterPage.resetAllFilters()
   // await orderRegisterPage.openPopUpFilter()
   // await orderRegisterPage.filteringByPartnerUser()

   // filtering the register filtering by partner company
   await orderRegisterPage.resetAllFilters()
   await orderRegisterPage.openPopUpFilter()
   await orderRegisterPage.filteringByPartnerCompany()

   await page.pause()
})