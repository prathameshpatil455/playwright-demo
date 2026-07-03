# Playwright Tool Demo

A hands-on demo showcasing [Microsoft Playwright](https://playwright.dev/) as a modern end-to-end browser automation and testing framework. Each test maps to a real-world UI interaction developers and QA engineers encounter daily.

**Demo sites used:**
- [the-internet.herokuapp.com](https://the-internet.herokuapp.com) — alerts, popups, iframes, uploads, downloads, drag-and-drop, hovers
- [demoqa.com](https://demoqa.com) — multi-field form practice
- [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) — API testing & network mocking

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests across all browser projects (parallel by default)
npm test

# Run on a single browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run a specific spec
npx playwright test tests/form-fill.spec.ts

# Run with UI mode (great for live demos)
npm run test:ui

# Run headed (see the browser)
npm run test:headed
```

## Demo Flow (Recommended)

1. **Codegen quick win** — `npx playwright codegen https://demoqa.com/automation-practice-form`
2. **Core interactivity** — form filling, alerts, popups
3. **File upload/download** — `tests/file-upload.spec.ts`, `tests/file-download.spec.ts`
4. **Network mocking** — `tests/network-mocking.spec.ts`
5. **Trace Viewer** — `npm run test:trace` then `npx playwright show-trace test-results/.../trace.zip`
6. **Cross-browser + mobile** — `npm test`
7. Q&A

## Reports & Debugging

```bash
# Generate HTML report after a test run
npx playwright show-report

# Record traces on every run (demo mode)
npm run test:trace

# Open Trace Viewer
npx playwright show-trace <path-to-trace.zip>
```

## Visual Regression

Baseline screenshots are stored in `tests/visual-regression.spec.ts-snapshots/`. To update baselines after intentional UI changes:

```bash
npx playwright test tests/visual-regression.spec.ts --update-snapshots
```

## Project Structure

```
playwright-demo/
├── tests/
│   ├── form-fill.spec.ts        # Auto form filling with getByLabel/getByRole
│   ├── alerts.spec.ts           # alert(), confirm(), prompt() dialogs
│   ├── popups.spec.ts           # New tab/window handling
│   ├── iframe.spec.ts           # frameLocator() interaction
│   ├── file-upload.spec.ts      # setInputFiles()
│   ├── file-download.spec.ts    # waitForEvent('download')
│   ├── drag-drop.spec.ts        # dragTo()
│   ├── hover.spec.ts            # Hover, keyboard & mouse actions
│   ├── network-mocking.spec.ts  # page.route() mocking
│   ├── visual-regression.spec.ts# toHaveScreenshot()
│   ├── api-testing.spec.ts      # request context (no browser)
│   ├── mobile.spec.ts           # iPhone 13 device profile
│   ├── dynamic-loading.spec.ts  # Auto-wait for dynamic content
│   ├── navigation.spec.ts       # Back, forward, refresh
│   ├── links.spec.ts            # Hyperlink identification
│   ├── color-picker.spec.ts     # HTML5 color input
│   └── javascript-executor.spec.ts # Scroll & slider via evaluate
├── fixtures/
│   └── sample-upload.txt
├── playwright.config.ts
└── README.md
```

## Browser Projects

Configured in `playwright.config.ts`:

| Project        | Device / Browser   |
|----------------|--------------------|
| chromium       | Desktop Chrome     |
| firefox        | Desktop Firefox    |
| webkit         | Desktop Safari     |
| mobile-chrome  | iPhone 13          |

## Features Covered

| # | Feature                    | Spec file                  |
|---|----------------------------|----------------------------|
| 1 | Auto form filling          | `form-fill.spec.ts`        |
| 2 | Alerts & dialogs           | `alerts.spec.ts`           |
| 3 | Popups & new tabs          | `popups.spec.ts`           |
| 4 | iFrame interaction         | `iframe.spec.ts`           |
| 5 | File upload                | `file-upload.spec.ts`      |
| 6 | File download              | `file-download.spec.ts`    |
| 7 | Drag and drop              | `drag-drop.spec.ts`        |
| 8 | Hover & tooltips           | `hover.spec.ts`            |
| 9 | Keyboard & mouse           | `hover.spec.ts`            |
| 10| Network mocking            | `network-mocking.spec.ts`  |
| 11| Visual regression          | `visual-regression.spec.ts`|
| 12| Cross-browser execution    | `playwright.config.ts`     |
| 13| Mobile emulation           | `mobile.spec.ts`           |
| 14| Trace viewer               | `npm run test:trace`       |
| 15| API testing                | `api-testing.spec.ts`      |
| 16| Parallel + HTML reporting    | `playwright.config.ts`     |
| 17| Dynamic loading / auto-wait  | `dynamic-loading.spec.ts`  |
| 18| Browser navigation           | `navigation.spec.ts`       |
| 19| Link identification          | `links.spec.ts`            |
| 20| HTML5 color picker           | `color-picker.spec.ts`     |
| 21| JavaScript executor          | `javascript-executor.spec.ts` |
