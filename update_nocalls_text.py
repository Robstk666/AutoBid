from bs4 import BeautifulSoup

def update_nocalls_content():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    nocalls_section = soup.find('section', id='nocalls')
    if nocalls_section:
        box = nocalls_section.find('div', class_='nocalls-box')
        if box:
            # 1. Update text (remove empty lines, add accent classes)
            # Find the paragraph with "Они видят только описание..."
            # It seems the text structure is: h2, p, p, p.tagline

            # Let's rebuild the content to be precise.
            # Keep h2.
            h2 = box.find('h2')

            # Combine first two paragraphs?
            # "Автосервисы не получают ваши контакты при подаче заявки. Они видят только описание и фотографии повреждений."
            # "Контакты передаются только тому СТО, которое вы выберете."
            # "❗ Вы полностью контролируете процесс." -> Accent

            new_content = []
            if h2: new_content.append(h2)

            p1 = soup.new_tag('p')
            p1.string = "Автосервисы не получают ваши контакты при подаче заявки. Они видят только описание и фотографии повреждений."
            new_content.append(p1)

            p2 = soup.new_tag('p')
            p2.string = "Контакты передаются только тому СТО, которое вы выберете."
            new_content.append(p2)

            accent_p = soup.new_tag('p', **{'class': 'accent-phrase'})
            accent_p.string = "Вы полностью контролируете процесс." # Removed '❗ '
            new_content.append(accent_p)

            box.clear()
            for elem in new_content:
                box.append(elem)

    # Save changes
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    update_nocalls_content()
