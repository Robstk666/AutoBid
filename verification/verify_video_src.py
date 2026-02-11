from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000")

    # Check source tag
    source = page.locator(".hero-bg-video source")
    print(f"Source Src: {source.get_attribute('src')}")

    # Check z-index
    bg_z = page.locator(".hero-background").evaluate("el => getComputedStyle(el).zIndex")
    content_z = page.locator(".hero-text").evaluate("el => getComputedStyle(el).zIndex")
    print(f"BG Z-Index: {bg_z}, Text Z-Index: {content_z}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
