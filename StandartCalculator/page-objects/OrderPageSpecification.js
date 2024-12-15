import { expect } from "@playwright/test"
import { helpers } from "../utils/helpers"
import { createOrderInfo } from "../data/createOrderInfo"
import { orderInfo } from "../data/orderInfo"

export class OrderPageSpecification {
   constructor(page) {
      this.page = page

      // Общие локаторы
      this.navItemTabButton = page.locator('a#specification_tab')

      // Локаторы для списка изделий
      this.tableItem = page.locator('div#specification-block tbody tr[data-id]')
      this.tableItemName = this.tableItem.locator('span[uitest="order-spec-name"]')
      this.tableItemPrice = this.tableItem.locator('span[uitest="order-spec-discount"]')
      this.tableItemQty = this.tableItem.locator('span[uitest="order-spec-count"]')
   }

   checkTableItemInfo = async (name, price, qty) => {
      expect(await this.tableItemName.innerText()).toBe(name)
      expect(Number(await this.tableItemPrice.innerText())).toBe(Number(price))
      expect(Number(await this.tableItemQty.innerText())).toBe(Number(qty))
   }
}