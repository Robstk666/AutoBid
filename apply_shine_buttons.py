from bs4 import BeautifulSoup

def update_buttons_to_shine():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Remove the previous complex 'button-drawing' structures and replace with simple 'button-shine'
    # We look for the 'button-drawing' class we added previously.

    # 1. Header
    header_container = soup.find('div', class_='nav-actions').find('a', class_='button-drawing')
    if header_container:
        new_btn = soup.new_tag('a', href="#register", **{'class': 'button-shine'})
        new_btn.string = "Создать аккаунт"
        header_container.replace_with(new_btn)

    # 2. Hero
    hero_container = soup.find('div', class_='hero-text').find('a', class_='button-drawing')
    if hero_container:
        new_btn = soup.new_tag('a', href="#request", **{'class': 'button-shine'})
        new_btn.string = "Получить предложения"
        new_btn['style'] = "margin-bottom: 32px;"
        hero_container.replace_with(new_btn)

    # 3. Steps
    steps_container = soup.find('section', id='steps').find('a', class_='button-drawing')
    if steps_container:
        new_btn = soup.new_tag('a', href="#request", **{'class': 'button-shine'})
        new_btn.string = "Получить предложения"
        steps_container.replace_with(new_btn)

    # 4. Request Form (Button type submit)
    # It was wrapped in a <button class="button-drawing">
    req_btn = soup.find('section', id='request').find('button', class_='button-drawing')
    if req_btn:
        new_btn = soup.new_tag('button', type="submit", **{'class': 'button-shine'})
        new_btn.string = "Отправить заявку"
        new_btn['style'] = "width: 100%; border: none;" # Ensure full width
        req_btn.replace_with(new_btn)

    # 5. Final CTA
    final_container = soup.find('section', id='final-cta').find('a', class_='button-drawing')
    if final_container:
        new_btn = soup.new_tag('a', href="#request", **{'class': 'button-shine'})
        new_btn.string = "Подать заявку на ремонт"
        final_container.replace_with(new_btn)

    # Save changes
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    update_buttons_to_shine()
