import re

def verify_hero_css():
    with open('styles.css', 'r') as f:
        css = f.read()

    if '.hero { ' in css and 'text-align: center;' in css.split('.hero { ')[1].split('}')[0]:
        print("Hero CSS: text-align: center - OK")
    else:
        print("Hero CSS: text-align: center - FAIL")

    if '.hero-text { ' in css and 'align-items: center;' in css.split('.hero-text { ')[1].split('}')[0]:
        print("Hero Text CSS: align-items: center - OK")
    else:
        print("Hero Text CSS: align-items: center - FAIL")

def verify_lottie_data():
    with open('lottie-data.js', 'r') as f:
        content = f.read()

    # Check if riskData contains "dislike" which is the name in the new JSON
    if '"nm":"dislike"' in content:
        print("Lottie Data: Updated (contains 'dislike') - OK")
    else:
        print("Lottie Data: Not Updated (missing 'dislike') - FAIL")

def verify_form_html():
    with open('index.html', 'r') as f:
        html = f.read()

    fields = ['id="firstname"', 'id="phone"', 'id="email"', 'id="city"']
    missing = [field for field in fields if field not in html]

    if not missing:
        print("Form Fields: All present - OK")
    else:
        print(f"Form Fields: Missing {missing} - FAIL")

if __name__ == "__main__":
    verify_hero_css()
    verify_lottie_data()
    verify_form_html()
