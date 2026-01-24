# Portfolio Template (GitHub Pages)

A single-page, monochrome portfolio template built with plain HTML, CSS, and vanilla JavaScript. All editable content lives in `content.js` so you can update the site from a phone without touching the layout code.

## Quick Edit Guide (content.js)
Open `content.js` and update the fields:

- **Name + tagline**
  - `name`
  - `tagline`
- **Social links**
  - `socialLinks.instagram`, `discord`, `tiktok`, `github`, `line`, `linkedin`, `facebook`
  - Leave a value empty (`''`) to show a “Set link in content.js” toast.
- **About section**
  - `aboutText`
- **Project stats** (3 cards)
  - `stats`: each item has `value`, `suffix`, `title`, `description`
- **Tools grid** (12 cards)
  - `tools`: each item has `name`, `description`, `iconPath`
- **Projects** (4 cards)
  - `projects`: each item has `title`, `description`, `imagePath`, `url`, `tags`
  - Leave `url` empty to show a “Set link in content.js” toast.
- **Contact**
  - `contact.email`, `phone`, `address`, `linkedin`, `instagram`
- **Footer text**
  - `footerText`

## Replace Images
All placeholder images live in `assets/`.

- **Avatar**: `assets/avatar-placeholder.svg`
- **About photo**: `assets/about-photo-placeholder.svg`
- **Projects**: `assets/project-1-placeholder.svg` to `project-4-placeholder.svg`
- **Tool logos**: `assets/tool-placeholder.svg`

You can either:
1. Replace the files and keep the same filenames, **or**
2. Add your own files and update the paths in `content.js`.

## Publish on GitHub Pages
1. Push this repository to GitHub.
2. Open **Settings** → **Pages**.
3. Under **Build and deployment**, select your branch and choose **/ (root)**.
4. Click **Save**.
5. Wait a minute and open the URL shown by GitHub Pages.

## Mobile Editing Tips
- Use a code editor app that supports JavaScript syntax highlighting.
- Keep `content.js` open in split view while previewing in a browser.
- Replace one section at a time to avoid mistakes.

---

Made for quick edits, clean visuals, and smooth scrolling.
