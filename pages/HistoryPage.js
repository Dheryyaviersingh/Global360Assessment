exports.HistoryPage = class HistoryPage {
  constructor(page) {
    this.page = page;
  }

  async verifyHistory(Uni) {

    
    await this.page.locator("//input[@id='tagSearch']").fill(Uni);
    await this.page.locator("//button[@id='topSearchButton']").click();
    await this.page.locator("//span[normalize-space()='History']").click();
    const historyRow = this.page.locator("//table[@id='assetHistory']").first();
    await historyRow.waitFor();
    return historyRow;
  }
};