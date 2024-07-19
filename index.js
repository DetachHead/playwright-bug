const { chromium } = require('playwright')

;(async () => {
    // Setup
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()
    await context.tracing.start({ sources: true })
    await page.goto('http://playwright.dev')
    const locator = page.locator('div').first()
    await locator.getAttribute('a') // does NOT appear in the trace
    await locator.isVisible() // does NOT appear in the trace
    await locator.getAttribute('b') // DOES appear in the trace
    await locator.isVisible() // DOES appear in the trace
    // Teardown
    await context.tracing.stop({ path: 'asdf.zip' })
    await context.close()
    await browser.close()
})()
