from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # Check Video
    video = page.locator(".hero-bg-video")
    print(f"Video Visible: {video.is_visible()}")
    print(f"Video Opacity: {video.evaluate('el => getComputedStyle(el).opacity')}")

    # Check Overlay
    # Pseudo-elements are hard to check directly with standard locators, but we can check if the parent has the class
    bg = page.locator(".hero-background")
    print(f"Background Element Visible: {bg.is_visible()}")
    print(f"Background Z-Index: {bg.evaluate('el => getComputedStyle(el).zIndex')}")

    page.screenshot(path="verification/hero_bg_check_final.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
