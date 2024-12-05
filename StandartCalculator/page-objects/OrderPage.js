import { expect } from "@playwright/test"

export class OrderPage {
   constructor(page) {
      this.page = page

      // Хлебные крошки
      this.headerTitle = page.locator('header span.page-header__title')
      // Блок с номером заказа и действиями
      this.expressSelect = page.locator('select[data-select2-id="custom_express"]')
      this.expressField = page.locator('span[aria-labelledby*="select2-custom_express"]')

      // Заказчик
      this.partner = page.locator('span[id*="select2-partner_id"]')
      this.partnerUser = page.locator('span[id*="select2-partner_user_id"]')
      this.phone = page.locator('span[id*="select2-partner_phone"]')
      this.email = page.locator('span[id*="select2-partner_email"]')
      this.telegram = page.locator('span[id*="select2-partner_telegram"]')
      this.vk = page.locator('span[id*="select2-partner_vk"]')
      this.instagram = page.locator('span[id*="select2-partner_instagram"]')

      // Параметры
      // Параметры относящиеся к компании
      this.ownerCompanyField = page.locator('span[aria-labelledby*="select2-company_id"]')
      this.ownerCompanySelect = page.locator('select[name="company_id"]')
      this.creatorCompanyField = page.locator('span[aria-labelledby*="select2-object_id"]')
      this.creatorCompanySelect = page.locator('select[name="object_id"]')
      this.performedCompanyField = page.locator('span[aria-labelledby*="select2-company_performed_id"]')
      this.performedCompanySelect = page.locator('select[name="company_performed_id"]')
      this.issueCompanyField = page.locator('span[aria-labelledby*="select2-company_issue_id"]')
      this.issueCompanySelect = page.locator('select[name="company_issue_id"]')
      this.paymentCompanyInput = page.locator('input[id="legal-entity-payment"]')
      // Остальные параметры
      this.layoutSelect = page.locator('select[name="is_layout_edit"]')
      this.layoutField = page.locator('span[aria-labelledby*="select2-is_layout_edit"]')
      this.volumeSelect = page.locator('select[name="is_volume_order"]')
      this.volumeField = page.locator('span[aria-labelledby*="select2-is_volume_order"]')
      this.oversizedSelect = page.locator('select[name="is_oversized_order"]')
      this.oversizedField = page.locator('span[aria-labelledby*="select2-is_oversized"]')
      this.offsetSelect = page.locator('select[name="is_offset_order"]')
      this.offsetField = page.locator('span[aria-labelledby*="select2-is_offset_order"]')
      this.adSourceSelect = page.locator('select[name="ad_source_id"]')
      this.adSourceField = page.locator('span[aria-labelledby*="select2-ad_source_id"]')
      this.sourceSelect = page.locator('select[name="source_id"]')
      this.sourceField = page.locator('span[aria-labelledby*="select2-source_id"]')

   }

   selectPartnerType = async () => {

   }

}