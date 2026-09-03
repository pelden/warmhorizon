# Warm Horizon Care — Improved Website

## What this is
A rebuilt, accessible, production-ready static version of warmhorizon.com.au, expanded from a one-page site into a full multi-page NDIS provider website.

## Mapping from the original site
| Original section | New page/feature |
|---|---|
| Our Services (6 cards) | `services.html` (searchable directory) + 6 dedicated `service-*.html` pages |
| Why Choose Us | Home page trust grid |
| Client Stories | Home page testimonial carousel with schema.org Review markup |
| Service Areas | Home page badges + service filter by location |
| (not present) About/Team | New `about.html` |
| (not present) NDIS explainer | New `ndis.html` with FAQ, onboarding steps |
| (not present) Contact form | New `contact.html` with validated form + complaints info |
| (not present) Blog | New `blog/` folder, JSON-driven |
| (not present) Client portal | New `portal.html` front-end mock-up |
| (not present) Resources | New `resources.html`, `onboarding-checklist.html` |
| (not present) Staff directory | New `staff-directory.html` with vCard downloads |
| (not present) Policies | `privacy.html`, `terms.html`, `accessibility.html` (placeholders) |

## What changed and why
- Added navigation, breadcrumbs and multiple pages for clarity (original was one page).
- Added accessibility toggles (contrast, large text), skip link, ARIA, and semantic headings to meet WCAG 2.1 AA.
- Added client-side form validation with a honeypot field for basic spam protection.
- Replaced ratings/response-time claims with placeholders — verify real figures before publishing.
- Added JSON data files (`data/*.json`) to separate content from markup for easier updates.
- Added JSON-LD structured data (LocalBusiness) for SEO.

## Accessibility checklist
- [x] Skip link, landmark regions, heading order
- [x] Keyboard-operable nav, accordion, tabs, carousel
- [x] Visible focus states, ARIA attributes on interactive controls
- [x] High-contrast and large-text toggles (persisted via localStorage)
- [x] Alt text on all images (placeholder SVGs included)
- [ ] Manual screen-reader test (recommended before launch)
- Target Lighthouse scores: Accessibility 95+, Performance 90+, Best Practices 95+, SEO 95+

## Connecting forms, analytics and maps
- **Contact form:** currently client-side only. Connect to Formspree, Netlify Forms, or a serverless function (see DEPLOY.md).
- **Analytics:** `script.js` includes a `window.whcAnalytics.track()` stub. Replace with Google Analytics (gtag.js) or Matomo snippet in each page `<head>`.
- **Maps:** replace the placeholder `<div>` in `contact.html` with a Google Maps or OpenStreetMap `<iframe>` using your business address.

## Multi-language scaffolding
`script.js` includes a basic English/Arabic switcher using `data-i18n` attributes and localStorage. Expand the `translations` object and add `data-i18n` to more elements as needed. This is a front-end demo only — for full localisation, use a proper i18n build process.

## Client portal mock-up
`portal.html` uses sample data from `data/portal-sample.json`. No backend or real login is included. To make it real, add authentication (e.g. Auth0, Firebase Auth) and connect to your case-management or NDIS plan-management system via API.
