# Playwright Tool Demo — Project Plan

## Project Description
This project is a hands-on demo showcasing Microsoft Playwright as a modern
end-to-end browser automation and testing framework. The goal is to
demonstrate Playwright's core capabilities — reliable element interaction,
cross-browser execution, debugging tools, and handling of real-world UI
scenarios (forms, alerts, popups, file uploads, etc.) — through a set of
small, focused test scripts run against a demo web application.

The demo should feel practical rather than theoretical: each feature is
tied to a concrete, relatable UI interaction that developers and testers
encounter daily.

**Target audience:** developers/QA engineers evaluating Playwright as a
testing tool.

**Suggested demo site:** a sandbox site with varied UI elements
(e.g. `https://the-internet.herokuapp.com`, `https://demoqa.com`, or your
own app) so alerts, forms, iframes, and file uploads are all available
without building a custom app.

---

## Features to Implement

### 1. Auto Form Filling
- Fill a multi-field form (text, dropdown, checkbox, radio button, date
  picker) using `getByLabel` / `getByRole` locators.
- Submit and assert on the confirmation message.
- Demonstrate auto-waiting — no manual sleeps needed even if fields load
  dynamically.

### 2. Handling Alerts & Dialogs
- Trigger a native JS `alert()`, `confirm()`, and `prompt()`.
- Show `page.on('dialog', ...)` to accept/dismiss and read dialog text.

### 3. Handling Popups & New Tabs
- Click a link that opens a new tab/window.
- Capture the new page context with `page.waitForEvent('popup')` and
  assert content on it.

### 4. iFrame Interaction
- Locate and interact with an element inside an `<iframe>` using
  `page.frameLocator()`.

### 5. File Upload
- Use `setInputFiles()` to upload a file through a file input element.
- Verify the uploaded filename appears on the page.

### 6. File Download
- Trigger a download and capture it via `page.waitForEvent('download')`.
- Save and verify the downloaded file.

### 7. Drag and Drop
- Perform a drag-and-drop interaction using `dragTo()` or manual
  mouse events.

### 8. Hover & Tooltips
- Hover over an element and assert a tooltip/dropdown menu appears.

### 9. Keyboard & Mouse Actions
- Demonstrate keyboard shortcuts, key combinations, and precise mouse
  actions (right-click, double-click).

### 10. Network Interception / Mocking
- Mock an API response using `page.route()`.
- Simulate a failed request or slow network to test error states.

### 11. Visual Regression Testing
- Capture a baseline screenshot with `toHaveScreenshot()`.
- Show a diff after a UI change.

### 12. Cross-Browser Execution
- Run the same test suite against Chromium, Firefox, and WebKit via
  Playwright's `projects` config.

### 13. Mobile Emulation
- Run a test using a device profile (e.g. `devices['iPhone 13']`).

### 14. Trace Viewer & Debugging
- Record a trace (`--trace on`) and open it with
  `npx playwright show-trace` to walk through DOM snapshots, network
  calls, and console logs.

### 15. API Testing (Bonus)
- Use Playwright's `request` context to test a REST API endpoint
  without opening a browser.

### 16. Parallel Execution & Reporting
- Show tests running in parallel by default.
- Generate and open the built-in HTML report (`npx playwright show-report`).

---

## Suggested Folder Structure
```
playwright-demo/
├── tests/
│   ├── form-fill.spec.ts
│   ├── alerts.spec.ts
│   ├── popups.spec.ts
│   ├── iframe.spec.ts
│   ├── file-upload.spec.ts
│   ├── file-download.spec.ts
│   ├── drag-drop.spec.ts
│   ├── hover.spec.ts
│   ├── network-mocking.spec.ts
│   ├── visual-regression.spec.ts
│   └── api-testing.spec.ts
├── playwright.config.ts
└── README.md
```

## Demo Flow Recommendation
1. Codegen quick win (record a form-fill flow live)
2. Form filling + alerts + popups (core interactivity)
3. File upload/download
4. Network mocking
5. Trace Viewer walkthrough (biggest "wow" moment)
6. Cross-browser + mobile emulation run
7. Q&A
