from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # Verify Hero Video
    hero_bg = page.locator(".hero-background video")
    print(f"Hero Video Visible: {hero_bg.is_visible()}")
    print(f"Hero Video Src: {hero_bg.get_attribute('src')}")

    page.screenshot(path="verification/hero_video_check.png")

    # Verify Benefits Cards
    benefits = page.locator("#benefits")
    benefits.scroll_into_view_if_needed()
    page.wait_for_timeout(500)

    cards = page.locator(".display-card")
    bg_color = cards.first.evaluate("el => getComputedStyle(el).backgroundColor")
    print(f"Benefits Card BG Color: {bg_color}")

    page.screenshot(path="verification/benefits_blue.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
