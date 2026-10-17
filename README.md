# Our New Home — Shopping Planner

A static, mobile-friendly shopping and to-do planner for a couple moving into a 3-bedroom apartment in Stockholm (move-in **1 December 2026**). No build step — plain HTML, CSS, and JavaScript.

## Features

- Items grouped by urgency (before move-in, first week, first month, later) with room tags
- SEK price ranges with running min/max/typical totals and checked-item totals
- “We’re handling it” section (bed, bedding, vacuum) excluded from budget totals
- Check off items, assign buyer (Vasile / Huda / either), edit prices
- Filter by urgency and room, progress bar
- **localStorage** persistence
- **Export / Import JSON** and **Copy share link** (state in URL hash)

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8765
```

Then visit `http://localhost:8765`.

## GitHub Pages

Public repo: [github.com/lopatamd/new-home-planner](https://github.com/lopatamd/new-home-planner)

**Live site (after deploy):** [https://lopatamd.github.io/new-home-planner/](https://lopatamd.github.io/new-home-planner/)

### One-time setup

1. Push this project to `main` on GitHub (the remote repo must contain `index.html` at the root).
2. On GitHub: **Settings → Pages → Build and deployment → Source:** **GitHub Actions**.
3. Push to `main` (or re-run the **Deploy to GitHub Pages** workflow). The workflow is in `.github/workflows/pages.yml`.

If you prefer classic Pages instead of Actions: **Settings → Pages → Deploy from branch → `main` / (root)**.

### Push from a local clone

```bash
git remote add github https://github.com/lopatamd/new-home-planner.git
git push -u github main
```
