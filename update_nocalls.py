from bs4 import BeautifulSoup

def update_nocalls_section():
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    nocalls_section = soup.find('section', id='nocalls')
    if nocalls_section:
        # 1. Remove Aurora Background (it was added via CSS ::before, so we just ensure no conflicting classes)
        # 2. Add Video Background Structure

        # Create container for video if not exists
        video_container = soup.new_tag('div', **{'class': 'video-bg-container'})

        video = soup.new_tag('video', autoplay='', muted='', playsinline='', loop='')
        # Use the specific file requested, even if it's currently missing (placeholder behavior will apply if 404)
        source = soup.new_tag('source', src='assets/videos/123.mp4', type='video/mp4')
        video.append(source)

        overlay = soup.new_tag('div', **{'class': 'video-overlay'})

        video_container.append(video)
        video_container.append(overlay)

        # Prepend to section
        nocalls_section.insert(0, video_container)

        # Ensure container has relative positioning (handled in CSS)

    # Save changes
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(str(soup))

if __name__ == "__main__":
    update_nocalls_section()
