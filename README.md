# Coding Society Website

A responsive multi-page website for the **Coding Society** campus club, built with HTML5, CSS3, and vanilla JavaScript.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home — hero, stats, upcoming events, why join |
| `about.html` | About — mission, learning areas, team |
| `events.html` | Events — tabbed upcoming / past event listings |
| `contact.html` | Join Us — accessible membership signup form |

## Project Structure

```
coding-society/
├── index.html
├── about.html
├── events.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── coding-activity.svg
│   ├── avatar-alex.svg
│   ├── avatar-priya.svg
│   ├── avatar-jordan.svg
│   └── avatar-sam.svg
└── README.md
```

## Technology Stack

- **HTML5** — semantic elements, ARIA attributes, accessible forms
- **CSS3** — mobile-first, Flexbox, CSS Grid, custom properties
- **JavaScript (ES5/ES6)** — unobtrusive, no frameworks

## Features

- Responsive layout with breakpoints at 480 px, 768 px, and 1024 px
- Hamburger menu for mobile navigation
- Accessible event tabs with keyboard arrow-key support
- Client-side form validation with inline error messages
- Skip-to-main-content link for keyboard/screen-reader users
- Visible focus indicators on all interactive elements

## Setup

No build step required. Open `index.html` in any modern browser, or serve with a local server:

```bash
npx serve .
# or
python -m http.server 8080
```

## Image & Icon Credits

All images in this project are original SVG illustrations created for this project and are free to use.

Emoji icons used in cards are Unicode standard characters (no external library required).

## Accessibility Notes

- Semantic HTML5 structure on every page
- `aria-current="page"` on active nav links
- `aria-label` on nav, form, and landmark regions
- `role="alert"` on inline form error messages
- `role="tablist"` / `role="tab"` / `role="tabpanel"` on the events tabs
- Colour contrast meets WCAG AA for all text/background combinations

## License

MIT — free to use and adapt for educational purposes.
