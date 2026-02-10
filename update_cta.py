from bs4 import BeautifulSoup

def update_final_cta():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    cta_section = soup.find('section', id='final-cta')
    if cta_section:
        container = cta_section.find('div', class_='container')
        if container:
            # Find the paragraph "Без звонков. Без давления. Бесплатно."
            for p in container.find_all('p'):
                if "Без звонков" in p.text:
                    # Wrap in a new div with class 'cta-blue-block'
                    new_div = soup.new_tag('div', **{'class': 'cta-blue-block'})
                    new_div.string = p.string
                    p.replace_with(new_div)
                    break

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    update_final_cta()
