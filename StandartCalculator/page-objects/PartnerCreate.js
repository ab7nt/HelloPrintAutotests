import { expect } from "@playwright/test"

export class PartnerPage {
   constructor(page) {
      this.page = page

      this.partnerTypeRadioButtons = page.locator('input[name="partner-type"]:not([disabled])')
      this.nameInput = page.locator('.row:has(label:has-text("Наименование")) input')
   }

   selectPartnerType = async (partnerID) => {
      await this.partnerTypeRadioButtons.first().waitFor()
      await this.partnerTypeRadioButtons.nth(partnerID - 1).click()
   }

   fillingDetails = async () => {
      console.log(this.nameInput)
      await this.nameInput.waitFor()
      await this.nameInput.fill('ООО "Рога и Копыта"')
      await expect(this.nameInput).toHaveValue('ООО "Рога и Копыта"')
   }
}