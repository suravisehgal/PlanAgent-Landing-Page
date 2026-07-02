from pathlib import Path
import re

root = Path('.')

og_template = '''  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:image" content="https://via.placeholder.com/1200x630?text=PlanAgent" />
  <meta name="twitter:card" content="summary_large_image" />
  <!-- Google Analytics: replace G-XXXXXXXXXX with your own measurement ID -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
'''

age_gate_pattern = re.compile(r'<div class="modal" id="ageGateModal"[\s\S]*?<\/div>\s*(?=<script src="script\.js"\><\/script>)', re.MULTILINE)

waitlist_section = '''
      <section class="section section-waitlist" id="waitlist" aria-label="Join the waitlist">
        <div class="container section-heading" data-reveal>
          <span class="eyebrow">Get early access</span>
          <h2>Join the PlanAgent waitlist</h2>
          <p>Be the first to try new productivity tools, exclusive student deals, and team planning insights.</p>
        </div>
        <div class="container waitlist-shell" data-reveal>
          <form class="waitlist-form" id="waitlistForm">
            <label for="waitlistName">Name</label>
            <input id="waitlistName" name="name" type="text" placeholder="Your name" required />
            <label for="waitlistEmail">Email</label>
            <input id="waitlistEmail" name="email" type="email" placeholder="you@example.com" required />
            <button class="btn btn-primary btn-lg" type="submit">Join the Waitlist</button>
            <p class="waitlist-note">We respect your inbox. No spam, only product updates and launch invitations.</p>
          </form>
        </div>
      </section>
'''

html_files = sorted([p for p in root.glob('*.html') if p.is_file()])
print('HTML files to patch:', [p.name for p in html_files])
for path in html_files:
    text = path.read_text(encoding='utf-8')
    if 'og:title' not in text:
        title_match = re.search(r'<title>(.*?)</title>', text, re.S)
        desc_match = re.search(r'<meta name="description" content="([^"]*)"', text)
        title = title_match.group(1).strip() if title_match else 'PlanAgent'
        desc = desc_match.group(1).strip() if desc_match else 'Smart planning and productivity for students, teams, and businesses.'
        block = og_template.format(title=title.replace('"', '&quot;'), desc=desc.replace('"', '&quot;'))
        text = text.replace('</title>', '</title>\n' + block, 1)

    if path.name in {'index.html', 'contact.html', 'docs.html', 'privacy.html', 'terms.html'}:
        text = age_gate_pattern.sub('', text)

    if path.name == 'index.html':
        if 'id="waitlist"' not in text:
            text = text.replace('      </section>\n\n      <section class="feature-strip"', '      </section>' + waitlist_section + '\n      <section class="feature-strip"')
        text = text.replace('href="#pricing" class="btn btn-primary btn-lg">Get Started</a>', 'href="#waitlist" class="btn btn-primary btn-lg">Get Started</a>')
        text = text.replace('href="#pricing" class="btn btn-primary btn-lg btn-pill">Try Free for 7 Days</a>', 'href="#waitlist" class="btn btn-primary btn-lg btn-pill">Try Free for 7 Days</a>')

    path.write_text(text, encoding='utf-8')
    print('Patched', path.name)
