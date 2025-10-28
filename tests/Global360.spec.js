const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { AssetPage } = require('../pages/AssetPage');
const { HistoryPage } = require('../pages/HistoryPage');

let page;
let context;
let Uni;

test.describe.serial('Snipe-IT Asset Lifecycle Flow with POM', () => {

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test('Login to Snipe-IT', async () => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("admin", "password");
    await expect(page).toHaveTitle("Dashboard :: Snipe-IT Asset Management Demo");
    console.log('Logged in');
  });

  test('Create Asset with Unique ID', async () => {
    const assetPage = new AssetPage(page);
    const date = Date.now();
    Uni = date.toString();
    await assetPage.createAsset(Uni);
    console.log('Asset created with ID:', Uni);
  });

  test('Search and Verify Asset in Edit Tab', async () => {
    const assetPage = new AssetPage(page);
    await assetPage.searchAndEditAsset(Uni);
    const assetId = await assetPage.verifyAssetId(Uni);
    expect(assetId).toBe(Uni);
    console.log('Verified asset ID:', assetId);
  });

  test('Verify Asset in History Tab', async () => {
    const historyPage = new HistoryPage(page);
    const historyRow = await historyPage.verifyHistory(Uni);
    await expect(historyRow).toContainText('create new');
    await expect(historyRow).toContainText(Uni);
    await expect(historyRow).toContainText('Admin User');
    console.log('Verified asset in history tab');
  });

});
