// import * as nodeFetch from "node-fetch"
import { test, expect } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage";
import { CalcPageTiles } from "../../page-objects/CalcPageTiles";
import { ChooseCompanyPage } from "../../page-objects/ChooseCompanyPage"

// const calculatorDisplayType = "плитки"

// test.afterEach(async ({ page }, testInfo) => {
//   if (testInfo.status === "passed") {
//     await page.screenshot({ path: 'screenshot.png' })
//   }
// })

test('Calculation in a tiles standard calculator', async ({ page }) => {
  // Settings
  test.setTimeout(300 * 1000)

  // Visit page
  await page.goto("/calculator");

  // Page objects
  const loginPage = new LoginPage(page)
  const calcPageTiles = new CalcPageTiles(page)
  const chooseCompanyPage = new ChooseCompanyPage(page)

  // login
  await loginPage.enterUsernameAndPassword()

  // Select company
  await chooseCompanyPage.choosingCompany()

  // Select group and subgroup
  await calcPageTiles.selectGroupAndSubgroup()



  // Checking
  await calcPageTiles.checkingTheDefaultValuesForCustomPrintRuns()
  await calcPageTiles.changingTheFirstAttribute()
  await calcPageTiles.changingTheSecondAttribute()
  await calcPageTiles.selectTheFirstItemTestOption()
  // await calcPageTiles.checkingTheMinimumCost()
  // await calcPageTiles.checkingTheCostPerUnit()
  // await calcPageTiles.ceckingTheCostPerPrintRun()
  // await calcPageTiles.checkingTheConnectionWithAnotherCalculatorOrBuild()
  // await calcPageTiles.checkingTheSpecifiedPrintRuns()
  // await calcPageTiles.testNan()

  // if (test.state === "failed") {
  //   await page.screenshot({ path: 'screenshot.png' })
  // }

  // Pause test
  await page.pause()
});
