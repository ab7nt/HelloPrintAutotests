// import * as nodeFetch from "node-fetch"
import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage";
import { CalcPage } from "../page-objects/CalcPage";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage"


test('Calculation in a standard calculator', async ({ page }) => {
  // Settings
  test.setTimeout(30 * 1000)

  // Visit page
  await page.goto("/calculator");

  // Page objects
  const loginPage = new LoginPage(page)
  const calcPage = new CalcPage(page)
  const chooseCompanyPage = new ChooseCompanyPage(page)

  // login
  await loginPage.enterUsernameAndPassword()

  // Select company
  await chooseCompanyPage.choosingCompany()

  // Select group and subgroup
  await calcPage.selectGroupAndSubgroup()

  // Checking
  await calcPage.checkingTheDefaultValuesForCustomPrintRuns()
  // await calcPage.changingTheFirstAttribute()
  // await calcPage.changingTheSecondAttribute()
  // await calcPage.selectTheFirstItemTestOption()
  // await calcPage.checkingTheMinimumCost()
  // await calcPage.checkingTheCostPerUnit()
  // await calcPage.ceckingTheCostPerPrintRun()
  // await calcPage.checkingTheConnectionWithAnotherCalculatorOrBuild()
  await calcPage.checkingTheSpecifiedPrintRuns()

  // Pause test
  await page.pause()
});
