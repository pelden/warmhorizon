# Deploying to GitHub Pages

1. Create or open a GitHub repository (e.g. `warmhorizon`).
2. Upload every file and folder from this package to the repository **root** — keep the `blog/`, `data/` and `images/` folders intact.
3. Commit directly to the `main` branch.
4. In the repository, go to **Settings → Pages**.
5. Under **Build and deployment**, set:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**
6. Click **Save** and wait 1–5 minutes.
7. Your temporary URL will be `https://<username>.github.io/<repo>/`.

## Connecting your custom domain (warmhorizon.com.au)
1. In **Settings → Pages → Custom domain**, enter `warmhorizon.com.au` and save.
2. In GoDaddy DNS settings, **do not remove existing MX/email records**. Add:
   - Four A records for `@` pointing to: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One CNAME record for `www` pointing to `<username>.github.io`
3. Wait for DNS propagation, then tick **Enforce HTTPS** in GitHub Pages settings.

## Connecting the contact form (choose one)
- **Formspree:** sign up, get a form endpoint, change the form's `action` attribute and add `method="POST"`; remove the JS `preventDefault` submit-block or adapt it to submit via fetch.
- **Netlify Forms:** requires hosting on Netlify instead of GitHub Pages; add `data-netlify="true"` to the form tag.
- **Serverless function:** write a small function (e.g. on Cloudflare Workers or AWS Lambda) that accepts POST requests and emails/stores submissions; point the form's `action` at that endpoint.

## Spam protection
- The honeypot field (`.honeypot`) is already included — keep it hidden via CSS.
- For stronger protection, add Google reCAPTCHA v3 or hCaptcha script tags and a hidden token field.

## Final QA checklist before going live
- [ ] Verify NDIS provider number, ABN and all contact details
- [ ] Replace all placeholder images, ratings and review counts with verified content
- [ ] Connect contact form to a real backend and test submission
- [ ] Replace map placeholder with live embed
- [ ] Have a qualified reviewer check privacy.html, terms.html and accessibility.html
- [ ] Run Lighthouse and fix any issues below target scores
- [ ] Test with keyboard only and with a screen reader
- [ ] Test on a real mobile device
