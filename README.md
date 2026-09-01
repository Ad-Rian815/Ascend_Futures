# Ascend Futures — Website Project

A multi-page static website for the **Ascend Futures** non-profit, built from
the original single-page design. Plain HTML, CSS and vanilla JavaScript — no
build step, no dependencies. Just open it in VS Code and start editing.

## Project structure

```
ascend-futures/
├── index.html            # Home (hero, causes, impact, gallery, donate, stories)
├── causes.html           # All 5 causes (anchors: #education #water #health #food #women)
├── donate.html           # Donation form (currency, frequency, amount, cause)
├── impact.html           # Impact stats + downloadable reports
├── about.html            # Mission & approach
├── team.html             # Team grid
├── partners.html         # Partnership info
├── careers.html          # Open roles
├── faq.html              # Accordion FAQ
├── contact.html          # Contact form + details
├── thank-you.html        # Post-donation landing page
├── privacy.html          # Privacy policy (placeholder text)
├── terms.html            # Terms of use (placeholder text)
├── tax-receipts.html     # Tax receipt help
├── 404.html              # Custom not-found page
│
├── assets/
│   ├── css/styles.css    # All styles (design tokens + components + interior pages)
│   ├── js/main.js        # Nav, donate form, FAQ accordion, contact form, reveals
│   └── images/           # Drop your own images here (currently using Unsplash URLs)
│
├── _redirects            # Netlify redirects
├── netlify.toml          # Netlify config (clean URLs, caching, headers)
├── vercel.json           # Vercel config (clean URLs + redirects)
├── .htaccess             # Apache / cPanel config (clean URLs + redirects + 404)
├── robots.txt
├── sitemap.xml
└── .gitignore
```

## Running it locally

It's static, so any of these work:

- **Easiest:** double-click `index.html`, or in VS Code right-click → *Open with Live Server*
  (install the "Live Server" extension first).
- **Or** start a quick server from the project folder:
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

Using a server (Live Server / `http.server`) is recommended over `file://`
because clean-URL routing and some browser features behave more realistically.

## How the shared parts work

The `<head>`, navigation, footer and success modal are **copied into every page**
(this is a no-framework static site). If you change the nav or footer, update it
in each `.html` file — or paste the block once and find-and-replace across files
in VS Code (`Ctrl/Cmd + Shift + H`).

The active nav link is highlighted automatically by `assets/js/main.js` based on
the current page.

## Redirects

Three configs are included so redirects work whichever host you choose — you only
need the one matching your host:

| Host            | File          |
|-----------------|---------------|
| Netlify         | `_redirects` + `netlify.toml` |
| Vercel          | `vercel.json` |
| Apache / cPanel | `.htaccess`   |

They map friendly URLs (e.g. `/donate-now`, `/about-us`, `/give`) to the real
pages, enable clean URLs (`/donate` instead of `/donate.html`), and route unknown
URLs to `404.html`. Edit the lists to add your own.

## Donation popup

Clicking **Donate Now** (nav, mobile menu, hero, or any cause button) opens the
donation form as a **pop-up overlay** — there is no separate donate section/page
to scroll to. The form markup lives in one place, `assets/js/main.js`
(`DONATE_FORM`), and is injected into every page automatically, so it stays in
sync everywhere. `donate.html` still exists for direct links and simply auto-opens
the same popup.

The **Donate Now** buttons have a heartbeat pulse on hover (disabled automatically
for visitors who prefer reduced motion).

## The forms are front-end demos

The donation popup and the `contact.html` form just show a confirmation modal —
they don't send anything yet. To make them real, connect to a provider:

- **Donations:** Stripe Checkout, PayPal, Donorbox, or GiveButter — wire it into
  `handleDonate()` in `assets/js/main.js`. A good flow: on success, send the user
  to `thank-you.html` instead of the modal.
- **Contact:** Formspree, Netlify Forms, or your own endpoint.

Remember to point the footer **social icons** at your real profile URLs (they're
`href="#"` placeholders in each page's footer).

## To-do before launch

- Replace the Unsplash image URLs with your own assets in `assets/images/`.
- Replace placeholder legal text in `privacy.html` and `terms.html`.
- Update contact details, social links, email addresses and the domain in
  `sitemap.xml` / `robots.txt`.
- Wire up real payment + contact form handling.

## Theme / colors

The site uses a **light (white) theme**. All colors are driven by CSS custom
properties in the `:root` block at the top of `assets/css/styles.css`, with a
clearly-labelled **"LIGHT THEME — FINISHING OVERRIDES"** block at the bottom.
To re-skin the site, edit those — you rarely need to touch individual rules.

Key tokens: `--bg` (page), `--bg-alt` (alternating sections), `--surface` /
`--card-bg` (cards), `--ink` (primary text), `--muted` (secondary text),
`--gold` (buttons/fills) and `--gold-ink` (gold for small text/links — deeper so
it stays legible on white). All normal-size text/background pairs meet WCAG AA
(4.5:1).

The previous dark theme is preserved at `assets/css/styles.dark-backup.css` — to
revert, point the pages' stylesheet link there (or copy it back over
`styles.css`).

## Refinement pass (navigation + sub-pages)

The site now uses grouped navigation with dropdowns:

- **About Us** → Staff, Board, Financials, Press, Careers
- **Our Work** → Our Work, Initiatives, Stories & Insights, Campaigns & Events
- **Get Involved** → Ways to Give, Corporate Partnerships

Notes on the interactive pieces (all demo/front-end only — wire to a backend before launch):

- **Staff** photos swap on hover (two images per person — replace with your own).
- **Financials** uses year tabs (`openTab`).
- **Careers** is a searchable/filterable job portal (`filterJobs`, `setDept`).
- **Ways to Give** includes a volunteer sign-up form (`handleVolunteer`).
- **Corporate Partnerships** shows a logo wall (placeholder wordmarks — swap for real logos) and a partnerships email.
- **Footer** has a newsletter signup (`subscribeNewsletter`) plus Contact, Safeguarding, Terms and Privacy links.

`team.html`, `causes.html` and `partners.html` are retained for backwards compatibility and overlap with Staff, Initiatives and Corporate Partnerships respectively.

## Navbar refresh (Comic Relief style) + page polish

- The top navigation is now a **mega-menu**: three grouped items — **About Us**, **Our Work**, **Get Involved** — each opening a panel with its sub-links plus a featured image card, with a bold **Donate Now** pill on the right. Panels open on hover (and keyboard focus) on desktop; the mobile menu uses tap-to-expand accordions. Redundant top-level items (Causes/Impact/Contact) were removed from the bar — Impact now lives under *Our Work*, and Contact remains in the footer.
- Fixed two lines of leftover invisible (dark-theme) text on the 404 and thank-you pages.
- Normalised the *Ways to Give* cards: removed off-brand purple/pink/teal gradients in favour of the consistent green/gold card style, and added hover lift/shadow to cards across the new pages.

## Content update — real organisational content (Strategic Plan 2026–2028 + Organisation Profile)

All placeholder charity copy has been replaced with AFF's real identity and strategy:
- **Home**: motto ("Building Dreams, Transforming Communities"), mission, tiered strategic model, honest 2026–2028 targets, ED quote, How-We-Work principles.
- **About**: founding (2017, by two HIV prevention advocates from Zambia & Malawi; registered 2024), vision, mission, 5 core values, populations served, national/global alignment.
- **Our Work**: tiered model — Core (SRHR & HIV Prevention; Community Advocacy & Systems Accountability), Growth (Climate-Health; Mental Health), Enablers (Research, Digital, MEAL, Community Engagement).
- **Initiatives**: 2026–2028 implementation framework targets per strategic goal.
- **Impact**: contributions to date (CAB-LA/Lenacapavir/DVR advocacy, AGYW programming, SHIELD/Empower Her/AWPCAB, child safeguarding) + headline targets + MEAL.
- **Staff / Board**: real organisational & governance structure (no invented individuals — add leadership names/photos when ready).
- **Careers**: roles from the org structure as expressions of interest (mailto), searchable/filterable.
- **Contact / Footer**: Stand No 287/15, Chipata Compound, along Highland Road, Lusaka · info@ascendfuturesfoundation.org · +260 770 983 978 · Facebook/LinkedIn/Instagram(@ascendfutures)/TikTok(@ascendfuturesfoundation).
- **Financials**: stewardship & accountability commitments (publish real statements when available).
- Important framing: 2026–2028 numbers are presented as **targets**, not achievements, matching the Strategic Plan.

Photos are still stock placeholders — swap in AFF's own photos (like those in the Profile document) in `assets/images/` when ready.

## Deploy for the presentation (GitHub + Vercel)

1. **Create the repo** (PowerShell, inside the unzipped `ascend-futures` folder):
   ```powershell
   git init
   git add .
   git commit -m "AFF website"
   ```
   Create an empty repo on github.com (e.g. `aff-website`), then:
   ```powershell
   git remote add origin https://github.com/<your-username>/aff-website.git
   git branch -M main
   git push -u origin main
   ```
2. **Vercel**: go to vercel.com → Add New → Project → Import the GitHub repo → Framework preset: **Other** → leave build settings empty (it's a static site) → Deploy. The included `vercel.json` handles clean URLs and the 404 page.
3. Your site is live at `https://<project>.vercel.app` in about a minute; every `git push` redeploys automatically.
   - Alternative without GitHub: `npm i -g vercel` then run `vercel` in the folder.
   - Netlify also works (drag-and-drop the folder; `_redirects`/`netlify.toml` are included).

Local preview: `python -m http.server 8000` → http://localhost:8000

## Redesign — floating nav, photo hero, content refresh

- **Navigation** rebuilt as a floating "island" bar: fixed, always visible, rounded, translucent with a blur/saturation effect, and it tightens slightly on scroll. Dropdown panels are glass cards; the right-most panel opens leftward and every panel is capped at the viewport width, so nothing can run off-screen. Feature images are now real `<img>` elements (previously CSS backgrounds that could render as empty blocks), and they drop out below 1120px so the panel shrinks to fit its links. Desktop nav collapses to the mobile sheet at 900px.
- **Home hero** is now a full-bleed team photograph with a layered scrim that keeps headline, buttons and stats legible and fades seamlessly into the page. Stats sit on frosted-glass cards. The photo is served at two sizes (760px / 1080px) via `srcset` so phones download less.
- **Content** updated from the latest copy document: Our Work pillars (incl. Child Protection & Gender Justice), Where We Work, Staff (Technical Advisors), About, Safeguarding (full principles + framework + how it is upheld), Programmes (PrEP Ring rename, partner lines, Her Choice facilities).
