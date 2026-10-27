# c0dewars.github.io

Bruno Garcia's portfolio and online CV — DevOps, cloud infrastructure and software engineering.

**Live website:** https://c0dewars.github.io/

## Development

This is a buildless static website, using semantic HTML, CSS and a small JavaScript file for mobile navigation and section highlighting. It has no runtime dependencies, third-party trackers, external fonts or backend service.

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

The site supports keyboard navigation, a skip link, visible focus indicators, reduced-motion preferences and responsive layouts. Its main content and contact links also work with JavaScript disabled. Contact uses public profile links; no data is collected by this website.
