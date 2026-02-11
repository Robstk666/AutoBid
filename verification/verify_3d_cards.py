from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    section = page.locator("#pain")
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    # Check if .card-3d elements exist
    cards = page.locator(".card-3d")
    print(f"3D Cards found: {cards.count()}")

    if cards.count() > 0:
        # Hover over the first card to check effect
        tracker = page.locator(".tr-13").first # Center tracker
        tracker.hover()
        page.wait_for_timeout(500)

        # Take screenshot of hover state
        page.screenshot(path="verification/3d_card_hover.png")
        print("Screenshot taken: verification/3d_card_hover.png")

        # Verify alignment/colors via screenshot inspection (manual step later)
        # But we can check computed styles
        bg_color = cards.first.evaluate("el => getComputedStyle(el).backgroundColor")
        print(f"Card Background Color: {bg_color}") # Should be rgb(255, 255, 255)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
