// import * as nodeFetch from "node-fetch"
import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage";
import { CalcPageDropdowns } from "../page-objects/CalcPageDropdowns";
import { ChooseCompanyPage } from "../page-objects/ChooseCompanyPage"

// const calculatorDisplayType = "плитки"

// test.afterEach(async ({ page }, testInfo) => {
//   if (testInfo.status === "passed") {
//     await page.screenshot({ path: 'screenshot.png' })
//   }
// })

test('Calculation in a dropdowns standard calculator', async ({ page }) => {
  // Settings
  test.setTimeout(30 * 1000)

  // Visit page
  await page.goto("/calculator");

  // Page objects
  const loginPage = new LoginPage(page)
  const calcPageDropdowns = new CalcPageDropdowns(page)
  const chooseCompanyPage = new ChooseCompanyPage(page)

  // login
  await loginPage.enterUsernameAndPassword()

  // Select company
  await chooseCompanyPage.choosingCompany()

  // Select group and subgroup
  await calcPageDropdowns.selectGroupAndSubgroup(calculatorDisplayType)

  await page.pause()

  // Checking
  await calcPageDropdowns.checkingTheDefaultValuesForCustomPrintRuns()
  // await calcPageDropdowns.changingTheFirstAttribute()
  // await calcPageDropdowns.changingTheSecondAttribute()
  // await calcPageDropdowns.selectTheFirstItemTestOption()
  // await calcPageDropdowns.checkingTheMinimumCost()
  // await calcPageDropdowns.checkingTheCostPerUnit()
  // await calcPageDropdowns.ceckingTheCostPerPrintRun()
  // await calcPageDropdowns.checkingTheConnectionWithAnotherCalculatorOrBuild()
  await calcPageDropdowns.checkingTheSpecifiedPrintRuns()
  // await calcPageDropdowns.testNan()

  // if (test.state === "failed") {
  //   await page.screenshot({ path: 'screenshot.png' })
  // }

  // Pause test
  // await page.pause()
});
