# Snipe-IT Asset Lifecycle Automation with Playwright

This project automates the lifecycle of an asset in the [Snipe-IT Demo](https://demo.snipeitapp.com) system using Playwright, following the **Page Object Model (POM)** structure.

---

## 📁 Project Structure

```
QAAssessment/
├── pages/
│   ├── LoginPage.js         # Handles login logic
│   ├── AssetPage.js         # Handles asset creation and search
│   └── HistoryPage.js       # Verifies history tab
├── tests/
│   └── Global360.spec.js    # Serial test execution using POM
├── package.json
├── playwright.config.js
└── README.md
```

---

## Test Flow (Serial Execution)

1. **Login**
   - Open Snipe-IT login page
   - Enter credentials (admin/password)
   - Validate login by asserting dashboard title

2. **Create Asset**
   - Navigate to hardware creation page
   - Generate a unique asset tag using `Date.now()`
   - Fill model, status, assignee, and save

3. **Search and Edit Asset**
   - Navigate to hardware listing
   - Search for asset using unique ID
   - Locate and click the edit button inside matching row
   - Verify that the asset tag matches

4. **Verify in History Tab**
   - Search globally using the tag
   - Navigate to History tab
   - Validate entry logs (e.g., "create new", user, and asset ID)

---

## Setup Instructions

1. **Install Dependencies**
```bash
npm install
```

2. **Install Playwright Browsers**
```bash
npx playwright install
```

3. **Run All Tests**
```bash
npx playwright test
```

4. **Run Single Test File**
```bash
npx playwright test tests/Global360.spec.js
```

---

## Notes

- Tests run in **serial** mode using `test.describe.serial`.
- Project uses **XPath** locators as provided (no modifications).
- Supports **Chromium** by default, configurable via `playwright.config.js`.

---

## Common Issues

| Error | Fix |
|------|-----|
| `Permission denied` on `playwright` | Run `chmod +x node_modules/.bin/playwright` |
| `No tests found` | Ensure the file path is correct and Playwright is installed |
| `Cannot read properties of undefined (reading 'locator')` | Ensure `page` is initialized in `beforeAll()` and passed to page objects |

---

## 🧑‍💻 Author

This project is maintained by Dheryyavier Singh using Playwright with Node.js.
