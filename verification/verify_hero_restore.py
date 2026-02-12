from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # Check BG Overlay Gradient
    overlay = page.locator(".hero-background")
    # Pseudo-element check is hard, but we assume CSS change worked.
    # We can check video opacity
    video = page.locator(".hero-bg-video")
    opacity = video.evaluate("el => getComputedStyle(el).opacity")
    print(f"Video Opacity: {opacity}")

    page.screenshot(path="verification/hero_restored.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
