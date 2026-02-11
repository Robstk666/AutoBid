from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # 1. Verify Pain Points Centering
    section = page.locator("#pain")
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    # Check container display style
    grid = page.locator(".glowing-grid")
    display = grid.evaluate("el => getComputedStyle(el).display")
    justify = grid.evaluate("el => getComputedStyle(el).justifyContent")
    print(f"Pain Grid Display: {display}")
    print(f"Pain Grid Justify: {justify}")

    page.screenshot(path="verification/pain_center.png")

    # 2. Verify Dock
    header = page.locator(".header")
    header.scroll_into_view_if_needed()
    dock = page.locator(".dock-navbar")
    print(f"Dock Visible: {dock.is_visible()}")

    if dock.is_visible():
        # Hover middle item
        items = page.locator(".dock-item")
        mid_item = items.nth(2)

        # Get initial width
        w_init = mid_item.bounding_box()['width']

        # Hover
        mid_item.hover()
        page.wait_for_timeout(200) # Wait for JS update

        # Get expanded width
        w_exp = mid_item.bounding_box()['width']

        print(f"Dock Item Width: Init={w_init}, Exp={w_exp}")
        if w_exp > w_init:
            print("Dock Magnification: YES")
        else:
            print("Dock Magnification: NO (Check JS)")

    page.screenshot(path="verification/dock_nav.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
