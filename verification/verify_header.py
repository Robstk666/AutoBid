from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()
    page.set_viewport_size({"width": 1280, "height": 720})
    page.goto("http://localhost:8000")

    # Check Stacking Nav existence
    nav = page.locator(".stacking-navbar")
    print(f"Stacking Navbar Visible: {nav.is_visible()}")

    # Check items
    items = page.locator(".stacking-item")
    print(f"Menu Items Count: {items.count()}")

    # Check Hover Effect (Expansion)
    if items.count() > 0:
        # Initial position of last item
        last_item = items.last
        initial_box = last_item.bounding_box()

        # Hover container
        nav.hover()
        page.wait_for_timeout(500)

        # Expanded position
        expanded_box = last_item.bounding_box()

        print(f"Initial X: {initial_box['x']}, Expanded X: {expanded_box['x']}")
        if expanded_box['x'] > initial_box['x']:
            print("Menu Expanded: YES")
        else:
            print("Menu Expanded: NO (Check Logic)")

    # Check Contacts
    contacts = page.locator(".header-contacts")
    print(f"Contacts Visible: {contacts.is_visible()}")
    print(f"Phone Text: {page.locator('.contact-phone').inner_text()}")

    page.screenshot(path="verification/header_stack.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
