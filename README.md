
# Arunkumaar TS — Web Presence

Two complementary sites that present the professional profile of Arunkumaar TS:
- Landing Page: a lightweight, single-screen introduction with quick links and theme toggle.
- Portfolio Website: a multi-section site showcasing projects, skills, and contact details.


## 👤 About
Hi, this is Arunkumaar TS — a CS Engineering student focused on cybersecurity and networking.
Interests include cloud security, digital forensics, malware analysis, and how AI/automation shape modern defense.
Hands-on experience spans home lab engineering, network forensics tooling, and practical security projects.

## 🔗 Repositories / Folders
- landing-page/
  - index.html
  - assests/
    - styles.css 
    - scripts.js
- portfolio/
  - index.html
  - assests/
    - styles.css 
    - scripts.js

---

### Run Locally
```bash
cd RESPECTIVE_DIRECTORY
# open in a browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

---

## 🌓 Theme Toggle
Both sites implement a theme toggle with:
- localStorage persistence
- OS color-scheme detection
- Accessible button with ARIA label

 - Landing Page: handled in scripts.js
 - Portfolio: handled in scripts.js 

---

## 🛠️ Development
- No build step required; pure HTML/CSS/JS
- Recommended VS Code extensions: Live Server, Prettier
- Linting: optional ESLint/Stylelint if converting to a larger project

## 📦 Deployment
- GitHub Pages: place each site in its own repository or folder, enable Pages in settings
- Netlify/Vercel: drag-and-drop or connect repo, set root to each folder
- Custom Domain: map landing page to root and portfolio to /portfolio or subdomain (e.g., portfolio.example.com)

---

## 📄 License
* Released under the Apache License 2.0. See [LICENSE](LICENSE) for details.
* Personal portfolio/landing page content © 2024 Arunkumaar TS. 
