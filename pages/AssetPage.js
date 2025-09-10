exports.AssetPage = class AssetPage {
  constructor(page) {
    this.page = page;
  }

  async createAsset(Uni) {
    await this.page.locator("//li[@class='dropdown']").click();
    await this.page.locator("a[href='https://demo.snipeitapp.com/hardware/create']").click();
    await this.page.locator("//input[@id='asset_tag']").clear();
    await this.page.locator("//input[@id='asset_tag']").fill(Uni);
    await this.page.getByText("Select a Model").click();
    await this.page.locator("input[role='searchbox']").fill("Macbook Pro");
    await this.page.getByText('Laptops - Macbook Pro 13\"').click();
    await this.page.locator("(//span[@id='select2-status_select_id-container'])[1]").click();
    await this.page.locator("input[role='searchbox']").fill("Ready");
    await this.page.locator('li[role="option"]', {
      hasText: "Ready to Deploy",
    }).click();
    await this.page.locator("div[id='assignto_selector'] div[class='col-md-8'] label:nth-child(1)").click();
    await this.page.locator("(//span[@role='combobox'])[4]").click();
    await this.page.locator("span[class='select2-container select2-container--default select2-container--open'] li:nth-child(1)").click();
    await this.page.locator("//button[@id='submit_button']").click();
  }

  async searchAndEditAsset(Uni) {
    await this.page.locator("a[href='https://demo.snipeitapp.com/hardware'][accesskey='1']").click();
    await this.page.waitForSelector("//input[@placeholder='Search']");
    await this.page.locator("//input[@placeholder='Search']").fill(Uni);
    await this.page.locator("//input[@placeholder='Search']").press('Enter');
    await this.page.waitForTimeout(3000);

    const rows = this.page.locator("//table[@id='assetsListingTable']//tr");
const count = await rows.count();

let found = false;

for (let i = 0; i < count; i++) {
  const row = rows.nth(i);
  const rowText = await row.innerText();

  if (rowText.includes(Uni)) {
    const editButton = row.locator('a.btn-warning');

    if (await editButton.isVisible()) {
      console.log("✅ Found asset in row:", i);
      await editButton.click();
      found = true;
      break;
    } else {
      console.warn("⚠️ Edit button not found in matched row:", i);
    }
  }
}

if (!found) {
  throw new Error(`Asset with ID "${Uni}" not found or edit button missing`);
}


  }

  async verifyAssetId(Uni) {
    const value = await this.page.locator("//input[@id='asset_tag']").inputValue();
    return value;
  }
};