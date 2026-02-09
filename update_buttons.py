from bs4 import BeautifulSoup

def process_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Define the new button structure
    def create_new_button(text, href="#register"):
        wrapper = soup.new_tag('a', href=href, **{'class': 'button-drawing type--A'})

        # Text container
        btn_text = soup.new_tag('div', **{'class': 'button-drawing__text'})
        btn_text.string = text
        wrapper.append(btn_text)

        # Lines
        line1 = soup.new_tag('div', **{'class': 'button-drawing__line'})
        line2 = soup.new_tag('div', **{'class': 'button-drawing__line'})
        wrapper.append(line1)
        wrapper.append(line2)

        # Drow animations
        drow1 = soup.new_tag('div', **{'class': 'button-drawing__drow1'})
        drow2 = soup.new_tag('div', **{'class': 'button-drawing__drow2'})
        wrapper.append(drow1)
        wrapper.append(drow2)

        return wrapper

    # 1. Header Button
    header_btn_container = soup.find('div', class_='nav-actions').find('div', class_='button-container')
    if header_btn_container:
        new_btn = create_new_button("Создать аккаунт", href="#register")
        header_btn_container.replace_with(new_btn)

    # 2. Hero Button
    hero_btn_container = soup.find('div', class_='hero-text').find('div', class_='button-container')
    if hero_btn_container:
        new_btn = create_new_button("Получить предложения", href="#request")
        new_btn['style'] = "margin-bottom: 32px;" # Maintain spacing
        hero_btn_container.replace_with(new_btn)

    # 3. Steps Button
    steps_btn_container = soup.find('section', id='steps').find('div', class_='button-container')
    if steps_btn_container:
        new_btn = create_new_button("Получить предложения", href="#request") # Shortened text to fit
        steps_btn_container.replace_with(new_btn)

    # 4. Request Form Button
    req_btn_container = soup.find('section', id='request').find('div', class_='button-container')
    if req_btn_container:
        # This one needs to be a button type=submit, not <a>
        # We'll adapt the structure slightly to wrap a button or be a button
        # But the CSS is designed for the wrapper.
        # Let's make it a <button> with the same classes.

        btn_wrapper = soup.new_tag('button', type="submit", **{'class': 'button-drawing type--A'})
        btn_wrapper['style'] = "width: 100%; border: none; background: transparent;"

        btn_text = soup.new_tag('div', **{'class': 'button-drawing__text'})
        btn_text.string = "Отправить заявку"
        btn_wrapper.append(btn_text)

        line1 = soup.new_tag('div', **{'class': 'button-drawing__line'})
        line2 = soup.new_tag('div', **{'class': 'button-drawing__line'})
        btn_wrapper.append(line1)
        btn_wrapper.append(line2)

        drow1 = soup.new_tag('div', **{'class': 'button-drawing__drow1'})
        drow2 = soup.new_tag('div', **{'class': 'button-drawing__drow2'})
        btn_wrapper.append(drow1)
        btn_wrapper.append(drow2)

        req_btn_container.replace_with(btn_wrapper)

    # 5. Final CTA Button
    final_btn_container = soup.find('section', id='final-cta').find('div', class_='button-container')
    if final_btn_container:
        new_btn = create_new_button("Подать заявку на ремонт", href="#request")
        final_btn_container.replace_with(new_btn)

    # Save changes
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    process_html()
