from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # 1. Verify Floating Button
    float_btn = page.locator("#floating-request-btn")
    print(f"Floating Btn Visible: {float_btn.is_visible()}")

    # 2. Click Floating Button -> Check Request Modal
    float_btn.click()
    page.wait_for_timeout(500)

    req_modal = page.locator("#modal-request")
    print(f"Request Modal Active: {req_modal.get_attribute('class')}") # should have 'active'

    page.screenshot(path="verification/modal_request.png")

    # Close it
    page.locator("#modal-request .modal-close").click()
    page.wait_for_timeout(300)

    # 3. Click "Create Account" -> Check Register Modal
    # Find link with href="#register"
    reg_btn = page.locator('a[href="#register"]').first
    reg_btn.click()
    page.wait_for_timeout(500)

    reg_modal = page.locator("#modal-register")
    print(f"Register Modal Active: {reg_modal.get_attribute('class')}")

    page.screenshot(path="verification/modal_register.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
