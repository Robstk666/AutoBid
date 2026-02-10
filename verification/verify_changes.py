from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # Hero Section
    page.wait_for_selector("#hero")
    page.screenshot(path="verification/hero_section.png")

    # Registration Form
    page.locator("#register").scroll_into_view_if_needed()
    page.wait_for_timeout(500) # Wait for scroll
    page.screenshot(path="verification/registration_form.png")

    # Risk Icon (Pain Points)
    page.locator("#pain").scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    page.screenshot(path="verification/pain_points.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
