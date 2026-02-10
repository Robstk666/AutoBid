from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    section = page.locator("#security")
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    # Check overlapping margin
    glass_cards = page.locator(".glass")
    count = glass_cards.count()
    print(f"Glass cards found: {count}")

    if count > 0:
        margin = glass_cards.first.evaluate("el => getComputedStyle(el).marginLeft")
        print(f"Glass card margin-left: {margin}")

    # Check Hover Effect
    container = page.locator("#glass-cards-container")
    container.hover()
    page.wait_for_timeout(500)

    # Check margin after hover
    margin_hover = glass_cards.first.evaluate("el => getComputedStyle(el).marginLeft")
    print(f"Glass card margin-left (hover): {margin_hover}")

    page.screenshot(path="verification/glass_fan.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
