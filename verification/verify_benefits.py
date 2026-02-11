from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    section = page.locator("#benefits")
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    # Check Background
    bg = page.locator(".infinite-grid-bg")
    print(f"Infinite Grid BG Visible: {bg.is_visible()}")

    # Check Cards
    cards = page.locator(".display-card")
    print(f"Display Cards Count: {cards.count()}")

    # Check CSS Variables update on mousemove
    highlight = page.locator(".grid-highlight")

    # Move mouse over section
    box = section.bounding_box()
    page.mouse.move(box['x'] + 50, box['y'] + 50)
    page.wait_for_timeout(100)

    # Check style attribute for mouse var
    style = highlight.get_attribute("style")
    print(f"Grid Highlight Style (Mouse Interaction): {style}")

    page.screenshot(path="verification/benefits_grid.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
