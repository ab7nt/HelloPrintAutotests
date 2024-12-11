import { expect } from "@playwright/test"
import { orderInfo } from "../data/orderInfo"

export class CompanySettingsPage {
   constructor(page) {
      this.page = page

      // Общие локаторы
      this.successAlert = page.locator('div[role="alert"]').filter({ hasText: 'Список правил успешно изменен' })

      // Поп-ап удаления
      this.popUpDeleteLimit = page.locator('div.modal-dialog').filter({ hasText: 'Вы уверены, что хотите удалить элемент?' })
      this.popUpDeleteLimitButtons = this.popUpDeleteLimit.locator('div.modal-footer button')

      // Навигациооные табы
      this.navTabs = page.locator('ul.nav-tabs li')
      // Кнопки
      this.newLimitButtonForOrder = page.locator('div#tab_orders button#add_limits')
      this.saveChangesButtonForOrder = page.locator('div#tab_orders button.save-company-status')
      // Локаторы для блока ограничений
      this.limitBlock = page.locator('div#tab_orders div.status-limit-section')
      this.limitBlockTypeField = page.locator('span[aria-labelledby*="select2-order0status_id"]')
      this.limitBlockTypeSelect = page.locator('select[name="order[0][status_id]"]')
      this.optionList = page.locator('ul.select2-results__options li')
      this.limitBlockLimits = page.locator('label.custom-checkbox')
      this.limitBlockCheckboxes = this.limitBlockLimits.locator('input')
      this.limitBlockDeleteButton = this.limitBlock.locator('div.btn-remove-card')
   }

   goToTheLimitsTab = async () => {
      await this.navTabs.filter({ hasText: 'Ограничения' }).waitFor()
      await this.navTabs.filter({ hasText: 'Ограничения' }).click()
      await this.page.waitForLoadState('networkidle')
   }

   addNewLimitForOrder = async () => {
      // Удаление ограничение, если уже создано
      if (await this.limitBlockTypeField.isVisible()) {
         await this.deleteLimits()
      }

      await this.newLimitButtonForOrder.waitFor()
      await this.newLimitButtonForOrder.click()
      expect(this.limitBlock).toBeVisible()
      // Выбор типа ограничения
      await this.limitBlockTypeField.waitFor()
      await this.limitBlockTypeField.click()
      await this.optionList.filter({ hasText: orderInfo.statusReadyToSent }).click()
      expect(await this.limitBlockTypeField.innerText()).toBe(orderInfo.statusReadyToSent)
      // Выбор самого ограничения
      await this.limitBlockLimits.filter({ hasText: orderInfo.limit }).click()
      expect(await this.limitBlockLimits.filter({ hasText: orderInfo.limit }).locator('input')).toBeChecked()
      // Сохранение ограничений
      await expect(this.saveChangesButtonForOrder).toBeEnabled()
      await this.saveChangesButtonForOrder.click()
      await this.page.waitForLoadState('networkidle')
      // Проверка что всё сохранено
      expect(await this.limitBlockLimits.filter({ hasText: orderInfo.limit }).locator('input')).toBeChecked()
      await this.successAlert.waitFor({ state: 'visible' })
   }

   deleteLimits = async () => {
      await this.limitBlockDeleteButton.waitFor()
      await this.limitBlockDeleteButton.click()
      await this.popUpDeleteLimit.waitFor({ state: 'visible' })
      await this.popUpDeleteLimitButtons.filter({ hasText: 'Да' }).click()
      // await this.successAlert.waitFor({ state: 'visible' })
      // await this.page.waitForLoadState('load')
      await this.limitBlockDeleteButton.waitFor({ state: 'hidden' })
   }
}