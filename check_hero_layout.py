from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000")

    hero = page.locator("#hero")
    hero_text = page.locator(".hero-text")
    title = page.locator(".hero-title")
    button = page.locator(".hero-text .button-shine")

    print(f"Hero visible: {hero.is_visible()}")
    print(f"Hero text visible: {hero_text.is_visible()}")
    print(f"Title visible: {title.is_visible()}")
    print(f"Button visible: {button.is_visible()}")

    # Check bounding box
    hero_bbox = hero.bounding_box()
    text_bbox = hero_text.bounding_box()
    title_bbox = title.bounding_box()
    button_bbox = button.bounding_box()

    print(f"Hero BBox: {hero_bbox}")
    print(f"Hero Text BBox: {text_bbox}")
    print(f"Title BBox: {title_bbox}")
    print(f"Button BBox: {button_bbox}")

    # Check alignment (centered vs left)
    print(f"Hero Text align-items: {hero_text.evaluate('el => getComputedStyle(el).alignItems')}")
    print(f"Title text-align: {title.evaluate('el => getComputedStyle(el).textAlign')}")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
