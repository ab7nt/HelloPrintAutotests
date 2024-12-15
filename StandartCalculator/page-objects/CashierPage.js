import { expect } from "@playwright/test"
import { addItemCashier } from "../data/addItemCashier"

export class CashierPage {
   constructor(page) {
      this.page = page

      // Общие локаторы
      this.popupCreateOrder = page.locator('div#cashierCreateOrderModal').filter({ hasText: 'Создание заказа' })

      // Локаторы для поп-апа создания заказа
      this.createOrderButton = page.locator('button#createOrder')
      this.popupCreateOrderButton = this.popupCreateOrder.locator('button#create_order_btn')

      // Локаторы для таблицы с калькуляциями
      this.itemTable = page.locator('table.item-table')
      this.itemNameInput = this.itemTable.locator('input[placeholder="Введите название"]')
      this.itemPriceInput = this.itemTable.locator('input[placeholder="Цена"]')
      this.itemQtyInput = this.itemTable.locator('input[placeholder="Кол-во"]')
      this.addNewItemButton = this.itemTable.locator('button#add-non-standard-service')
      this.tableItems = this.itemTable.locator('tbody tr[data-id]')
   }

   addNewItem = async () => {
      await this.itemNameInput.waitFor()
      await this.itemNameInput.fill(addItemCashier.name)
      expect(this.itemNameInput).toHaveValue(addItemCashier.name)

      await this.itemPriceInput.waitFor()
      await this.itemPriceInput.fill(addItemCashier.price)
      expect(this.itemPriceInput).toHaveValue(addItemCashier.price)

      await this.itemQtyInput.waitFor()
      await this.itemQtyInput.fill(addItemCashier.qty)
      expect(this.itemQtyInput).toHaveValue(addItemCashier.qty)

      await this.addNewItemButton.waitFor('visible')
      await this.addNewItemButton.click()
      await this.tableItems.first().waitFor()
   }

   clickOnCreateOrderButton = async () => {
      await expect(this.createOrderButton).toBeEnabled()
      await this.createOrderButton.click()
      await this.popupCreateOrder.waitFor('visible')
   }

   clickOnCreateButtonInCreateOrderPopup = async () => {
      await this.popupCreateOrderButton.waitFor()
      await this.popupCreateOrderButton.click()
   }
}