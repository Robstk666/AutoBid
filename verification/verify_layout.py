from playwright.sync_api import sync_playwright
import os
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})

    # Assuming index.html is in the current directory
    cwd = os.getcwd()
    file_url = f"file://{cwd}/index.html"

    print(f"Navigating to {file_url}")
    page.goto(file_url)

    # Wait for preloader to disappear
    try:
        page.wait_for_selector("#preloader", state="hidden", timeout=5000)
    except:
        print("Preloader did not disappear in 5s, forcing it hidden via JS")
        page.evaluate("document.getElementById('preloader').style.display = 'none'")

    # Wait a bit for animations
    time.sleep(1)

    # Screenshot of Hero Section
    print("Taking screenshot of Hero section...")
    page.screenshot(path="verification/hero_screenshot.png", clip={"x": 0, "y": 0, "width": 1280, "height": 800})

    # Scroll to Register section
    register_section = page.locator("#register")
    if register_section.count() > 0:
        register_section.scroll_into_view_if_needed()
        time.sleep(0.5)
        print("Taking screenshot of Register section...")
        register_section.screenshot(path="verification/register_screenshot.png")
    else:
        print("Register section not found!")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
