// import * as nodeFetch from "node-fetch"
import { test, expect } from "@playwright/test"
import { UserInfo } from "../data/userInfo";
import { CalcPage } from "../page-objects/CalcPage";

test('Calculation in a standard calculator', async ({ page }) => {
  test.setTimeout(3000 * 1000)

  await page.goto('https://release1.helloprint.ru/calculator');

  const calcPage = new CalcPage(page)
  const loginInput = page.locator("form input#name")
  const passwordInput = page.locator("form input#password")
  const submitButton = page.locator("form button[type='submit']")
  const companyList = page.locator("form select#company_id")

  // login
  await loginInput.waitFor()
  await loginInput.fill(UserInfo.name)
  await passwordInput.waitFor()
  await passwordInput.fill(UserInfo.password)
  await submitButton.click()

  // Select company
  await page.waitForURL(/company/)
  await companyList.waitFor()
  await companyList.selectOption({ value: "51" })
  await submitButton.click()

  // Select group and subgroup
  await calcPage.selectGroupAndSubgroup()

  // Checking
  await calcPage.checkingTheDefaultValues()
  await calcPage.changingTheFirstAttribute()
  await calcPage.changingTheSecondAttribute()
  await calcPage.selectTheFirstItemTestOption()
  await calcPage.checkingTheMinimumCost()
  await calcPage.checkingTheCostPerUnit()
  await calcPage.ceckingTheCostPerPrintRun()

  // Pause test
  await page.pause()
});
