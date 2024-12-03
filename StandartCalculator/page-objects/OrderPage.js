import { expect } from "@playwright/test"

export class OrderPage {
   constructor(page) {
      this.page = page

      // Заказчик
      this.partner = page.locator('span[id*="select2-partner_id"]')
      this.partnerUser = page.locator('span[id*="select2-partner_user_id"]')
      this.phone = page.locator('span[id*="select2-partner_phone"]')
      this.email = page.locator('span[id*="select2-partner_email"]')
      this.telegram = page.locator('span[id*="select2-partner_telegram"]')
      this.vk = page.locator('span[id*="select2-partner_vk"]')
      this.instagram = page.locator('span[id*="select2-partner_instagram"]')
   }

   selectPartnerType = async () => {

   }

}