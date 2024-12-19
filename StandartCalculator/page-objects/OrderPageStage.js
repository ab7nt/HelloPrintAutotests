import { expect } from "@playwright/test"
import { helpers } from "../utils/helpers"
import { createOrderInfo } from "../data/createOrderInfo"
import { orderInfo } from "../data/orderInfo"

export class OrderPageStage {
   constructor(page) {
      this.page = page

      // Локаторы для дат
      this.issueAtField = page.locator('#dead-lines div').filter({ hasText: 'Оформлен' }).locator(' input')
      this.layoutAtField = page.locator('#dead-lines div').filter({ hasText: 'Готовность макета' }).locator(' input')
      this.impositionAtField = page.locator('#dead-lines div').filter({ hasText: 'Макет - Для дизайнеров' }).locator(' input')
      this.prepressAtField = page.locator('#dead-lines div').filter({ hasText: 'Готовность спуска' }).locator(' input')
      this.productionAtField = page.locator('#dead-lines div').filter({ hasText: 'Производство' }).locator(' input')
      this.deliveryAtField = page.locator('#dead-lines div').filter({ hasText: 'Выдача' }).locator(' input')
   }

   123 = async () => {

   }
}