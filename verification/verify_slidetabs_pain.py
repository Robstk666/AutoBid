from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # 1. Verify Slide Tabs
    page.wait_for_selector(".slide-tabs-nav")
    tabs = page.locator(".slide-tab")
    cursor = page.locator(".slide-cursor")

    print(f"Tabs count: {tabs.count()}")

    # Hover first tab
    first_tab = tabs.first
    first_tab.hover()
    page.wait_for_timeout(300)

    # Check cursor pos
    cursor_box = cursor.bounding_box()
    tab_box = first_tab.bounding_box()
    nav_box = page.locator(".slide-tabs-nav").bounding_box()

    # Cursor left relative to nav should match tab left relative to nav (approx)
    # The script uses style.left = tab.left - nav.left
    # Let's check opacity
    cursor_opacity = cursor.evaluate("el => getComputedStyle(el).opacity")
    print(f"Cursor Opacity (Hover): {cursor_opacity}")

    page.screenshot(path="verification/slidetabs.png")

    # 2. Verify Pain Points Width/Row
    section = page.locator("#pain")
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    cards = page.locator(".card-3d-container")
    # Check if top of first and last card are roughly same Y (in one row)
    y1 = cards.first.bounding_box()['y']
    y5 = cards.nth(4).bounding_box()['y']

    print(f"Card 1 Y: {y1}")
    print(f"Card 5 Y: {y5}")

    if abs(y1 - y5) < 10:
        print("Cards are in one row: YES")
    else:
        print("Cards are in one row: NO")

    page.screenshot(path="verification/pain_row.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
