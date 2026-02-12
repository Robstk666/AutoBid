from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # Open Request Modal
    page.locator("#floating-request-btn").click()
    page.wait_for_timeout(500)

    # Check Title
    title = page.locator("#modal-request h2").inner_text()
    print(f"Title: {title}")

    # Check Fields
    fields = [
        "Марка и модель автомобиля",
        "Год выпуска",
        "Тип повреждений",
        "Описание повреждений",
        "Фотографии автомобиля",
        "Город ремонта"
    ]

    content = page.locator("#modal-request").inner_text()
    for f in fields:
        if f in content:
            print(f"Field Found: {f}")
        else:
            print(f"Field MISSING: {f}")

    # Check Checkboxes
    checkboxes = page.locator(".damage-checkboxes input")
    print(f"Checkboxes count: {checkboxes.count()}")

    page.screenshot(path="verification/request_form_full.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
