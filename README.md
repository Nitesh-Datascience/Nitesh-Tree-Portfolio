# Nitesh — A Garden of Insights

A complete, animated tree portfolio inspired by the supplied reference video. Cream paper, a sparse black tree, colorful clickable fruit, a carpet of falling letters and symbols, and a serif headline with a multicolor “grow”.

## Open it

Open **`index.html`** in Chrome, Edge, Firefox, or Safari. No Node.js, npm, Python, API keys, database, or installation is needed.

For optional local HTTP preview, run `python -m http.server 8000 ` from this folder, then visit `http://localhost:8000`.

## What works

- Five fruit buttons: four project details and a GitHub branch.
- Hover or keyboard focus to show each fruit label.
- A gently swaying black tree, small drifting letters and symbols, and colorful round project fruits.
- Letters settle into a line along the roots; an occasional automatic breeze lifts some of them again.
- Move your mouse through the garden or press **Send a little breeze**.
- Pause/play animation. The operating system's reduced-motion preference is respected on first load.
- Project filtering, accessible project dialogs, Escape to close, and focus restoration.
- Navigation to Work, About, and Contact; portfolio-link copying on a hosted page.
- Responsive desktop and mobile layouts; animations stop when the page is hidden or the garden leaves view.

## Make it yours

1. Edit **`projects.js`** to change your name, GitHub URL, project names, descriptions, links, and technologies.
2. Edit **`index.html`** for the headline, about text, and contact copy.
3. Edit the color variables at the top of **`styles.css`** to change the palette.
4. Save and refresh the page.

The project drawings are illustrative previews, not screenshots or measured model results. The external project URLs come from the supplied portfolio context; their current availability and model behavior were not verified. Change them in `projects.js` as needed.

## Files

```text
  index.html          Page content and accessible structure
  styles.css          Design, animation and responsive layouts
  projects.js         Editable profile and project data
  app.js              Tree, particles, filters and project dialogs
  assets/sprout.svg   Local favicon
GITHUB-PAGES.md        Simple GitHub hosting instructions
```

The site runs entirely in your browser. There are no external fonts, tracking scripts, contact-form services, or remote assets required to render it.
