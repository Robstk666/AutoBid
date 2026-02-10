from bs4 import BeautifulSoup

def remove_onlyfans():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the social button for OnlyFans
    # It contains text "OnlyFans"
    socials = soup.find('div', class_='aceternity-socials')
    if socials:
        buttons = socials.find_all('button')
        for btn in buttons:
            if "OnlyFans" in btn.text:
                btn.decompose()
                break

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    remove_onlyfans()
