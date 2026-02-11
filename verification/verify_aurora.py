from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    section = page.locator("#steps")
    section.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    # Check background existence
    bg = page.locator(".aurora-background")
    print(f"Aurora BG Visible: {bg.is_visible()}")

    # Check animation
    gradient = page.locator(".aurora-gradient")
    anim_name = gradient.evaluate("el => getComputedStyle(el).animationName")
    print(f"Animation Name: {anim_name}")

    page.screenshot(path="verification/aurora_bg.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
