# c0dewars.github.io

Bruno Garcia's portfolio and online CV — DevOps, cloud infrastructure and software engineering.

**Live website:** https://c0dewars.github.io/

## Development

This is a buildless static website, using semantic HTML, CSS and a small JavaScript file for mobile navigation and section highlighting. It has no build dependencies, external fonts or backend service. Optional Google Analytics 4 is loaded only after explicit consent.

Preview locally from the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/ in a browser.

## Updating the site

- Update profile, experience, projects, skills and contact links in `index.html`.
- Update presentation and responsive breakpoints in `styles.css`.
- Replace `assets/Bruno_Garcia_DevOps_Cloud_ATS_CV.pdf` when the CV changes. Preserve the filename or update the download links.
- Refresh the stylesheet URL version and PDF download URL versions in `index.html` when those files change, so returning visitors receive the new versions immediately.
- Keep the canonical URL, structured data, social metadata, `robots.txt` and `sitemap.xml` in sync if the domain changes.
- Open a pull request against `main` and squash merge it. GitHub Pages publishes the repository root automatically after the merge. `.nojekyll` keeps the site independent of Jekyll processing.

## Content and assets

Professional history and contact details are based on the supplied CV and subsequent confirmed updates: the current DevOps Engineer role from February 2026, Terraform, GitHub Actions, and proficiency with GitHub Copilot, ChatGPT, Claude and OpenCode. Public project descriptions are based on the repositories linked from the website. The KBorg dashboard screenshot is from [c0dewars/kborg](https://github.com/c0dewars/kborg/blob/main/docs/screenshots/dashboard-health.png). The cloud illustration was generated for this portfolio using the built-in image-generation tool.

The HyperMac project image is the [per-display layouts screenshot](https://github.com/c0dewars/HyperMac/blob/main/docs/media/screenshots/34-layouts-080.png) from the public HyperMac repository. Its original JPEG bytes are served locally as `assets/hypermac-layouts.jpg`.

Technology logos are locally hosted SVGs from [Devicon](https://github.com/devicons/devicon), [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/), and the official OpenAI and OpenCode brand resources. Product names and logos belong to their respective owners and are used for identification; no endorsement is implied. Source URLs, provenance and applicable license notices are in `assets/tech/`.

Cloud illustration prompt: “Stylized-concept square hero illustration for a professional DevOps and cloud engineer portfolio. Solid dark navy #031426 backdrop. Luminous white and ice-blue cloud above a refined layered navy server pedestal, surrounded by four connected isometric cubes with unbranded wheel, cloud, triangular geometry, and stacked-container pictograms. Fine cyan circuit lines and light nodes. Premium 3D geometry, beveled matte surfaces, cool studio lighting, restrained emissive outlines. Compact centered composition, full subject visible with safe margins. Navy, cobalt, cyan, ice-blue and white. No people, text, UI, labels, watermarks, malformed logos, purple neon, or galaxy backdrop.”

## Accessibility and privacy

The site supports keyboard navigation, a skip link, visible focus indicators, reduced-motion preferences and responsive layouts. Its main content and contact links also work with JavaScript disabled. Contact uses public profile links. GitHub Pages performs security logging. Google Analytics 4 (G-DS2PN2ZKER) uses basic consent mode: no Google script or analytics pings before acceptance. Equal Accept/Reject buttons and Cookie settings appear on both pages; choices expire after 180 days. Advertising consent remains denied. See privacy.html.

Run consent regression checks with `node --test tests/analytics.test.cjs` and syntax checks with `node --check analytics.js`.

In the GA4 dashboard, verify the web stream hostname, disable unwanted enhanced measurement and Google signals, review data sharing and event retention, and verify a consented page_view in Realtime. Dashboard settings and report receipt require authenticated account access; source deployment alone does not verify them.

## Orbit role context

Team membership in Orbit Core AWS and the BMW, MINI and Rolls-Royce connected-vehicle service scope were supplied by Bruno. Public platform context is based on these AWS articles; they describe Orbit, not Bruno's individual contributions or the specific Core AWS team's complete remit:

- [An Engine of Efficiency: BMW Group’s CI/CD Modernization Journey with AWS](https://aws.amazon.com/blogs/migration-and-modernization/an-engine-of-efficiency-bmw-groups-ci-cd-modernization-journey-with-aws/) (26 February 2026): Orbit is an Amazon EKS-based platform providing managed networking, logging and microservice scaling. Orbit Spaceship is the CI/CD platform integrated with Orbit; it is not presented as Bruno's team.
- [Transforming the BMW Connected Vehicle Backend with Karpenter](https://aws.amazon.com/blogs/industries/transforming-the-bmw-connected-vehicle-backend-with-karpenter/) (16 October 2025): connected-vehicle backend and Orbit platform context.

The portfolio scopes the role to connected-vehicle cloud infrastructure; it does not claim ownership of every BMW Group IT system or attribute platform-wide scale metrics to Bruno.
