from bs4 import BeautifulSoup

def update_accent_phrases():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # 1. No Calls Block (Already handled via update_nocalls_text.py, but let's double check)
    # "Вы полностью контролируете процесс." -> class='accent-phrase'

    # 2. Pain Points Block
    # "👉 Вы тратите время, деньги и нервы — ещё до начала ремонта"
    pain_section = soup.find('section', id='pain')
    if pain_section:
        pain_summary = pain_section.find('p', class_='pain-summary')
        if pain_summary:
            # Change tag to 'p' class='accent-phrase'
            pain_summary['class'] = 'accent-phrase'
            # Remove 👉
            text = pain_summary.get_text()
            text = text.replace('👉 ', '').strip()
            pain_summary.string = text

    # 3. Solution Block
    # "И выбираете лучшее предложение."
    solution_section = soup.find('section', id='solution')
    if solution_section:
        # Find p with class 'h3-highlight'
        highlight = solution_section.find('p', class_='h3-highlight')
        if highlight:
            highlight['class'] = 'accent-phrase'
            # Ensure text is clean
            highlight.string = "И выбираете лучшее предложение."

    # 4. Benefits Block
    # "👉 Вы выбираете сервис, а не наоборот." (Currently "❗ Вы выбираете сервис, а не наоборот.")
    benefits_section = soup.find('section', id='benefits')
    if benefits_section:
        benefits_summary = benefits_section.find('p', class_='benefits-summary')
        if benefits_summary:
            benefits_summary['class'] = 'accent-phrase'
            # Remove ❗
            text = benefits_summary.get_text()
            text = text.replace('❗ ', '').strip()
            benefits_summary.string = "Вы выбираете сервис, а не наоборот."

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    update_accent_phrases()
