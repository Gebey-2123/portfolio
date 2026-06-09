<!-- Polished README for GitHub landing page -->

# Portfolio — Creative Ventures

[![Vercel](https://img.shields.io/badge/deploy-vercel-000000?logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/framework-Next.js-000000?logo=next.js)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/style-Tailwind%20CSS-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/lang-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![CI](https://img.shields.io/badge/ci-GitHub%20Actions-2088FF?logo=github)](https://github.com/Gebey-2123/portfolio/actions)


# My Portfolio - Software Engineering & Cybersecurity

Welcome to my digital workspace! This repository houses my portfolio, a showcase of my technical skills, passion projects, and ongoing journey in the tech industry.

## 🚀 About
I am a Software Engineering and Cybersecurity student focused on building secure, scalable, and user-centric digital solutions. This portfolio represents my growth and the projects I’ve built to bridge the gap between complex backend logic and creative frontend design.

## 🛠️ Technical Stack
- **Web Development:** React, Next.js, HTML, CSS, JavaScript
- **Deployment:** Vercel
- **Focus Areas:** Full-Stack Architecture, Secure Coding, UI/UX Design

## 🌐 Live Demo
Check out my live portfolio here: [https://portfolio-nace.vercel.app/](https://portfolio-nace.vercel.app/)

## 📈 What's Inside?
- **E-commerce Applications:** Scalable platforms built with security in mind.
- **Cybersecurity Projects:** Documentation of secure coding practices and system protection.
- **UI/UX & Graphics:** Creative designs aimed at enhancing user experience.





A deploy-ready personal portfolio showcasing Creative Ventures: Video Editing, Digital Marketing, and Content Creation. Built with Next.js, TypeScript and Tailwind CSS, and designed for fast local demos using playable MP4s stored in `public/videos/` (Git LFS recommended).

Live repo: https://github.com/Gebey-2123/portfolio

---

## Hero / Screenshots

Add visual polish by including one or two screenshots. Place images under `public/screenshots/` and they will render on the README.

Example (add these files under `public/screenshots/`):

```markdown
![Hero screenshot](/screenshots/hero.png "Portfolio hero")
![OtherSkills demo](/screenshots/otherskills.png "OtherSkills demo modal")
```

I can add the images into the README for you once you upload them or tell me which screenshots to include.

---

## Quick start (developer)

Prerequisites: Node 18+ and Git. For media work, install `git-lfs`.

```bash
# install dependencies
npm ci

# run dev server
npm run dev

# visit the URL shown in the console (usually http://localhost:3000)
```

Notes:
- Static demo videos live in `public/videos/` and are served at `/videos/<filename>.mp4`.
- The dev server may auto-select a different port if `3000` is busy.

---

## What makes this project special

- Local-first demo player: interactive modal prefers local MP4s in `public/videos/` and falls back to configured remote samples.
- Designed for portfolio storytelling: short playable demos mapped to `OtherSkills` samples for immediate presentation.
- Media-friendly workflow: this repository uses Git LFS to handle videos without bloating git history.

---

## Expected demo filenames

To enable quick local demos, the app looks for these files (place them in `public/videos/`):

- `video editing1.mp4`
- `video editing2.mp4`
- `video editing3.mp4`
- `video editing4.mp4`
- `Digital Marketing.mp4`

If you use different names, update `src/components/OtherSkills.tsx` `videoMap` entries to match your filenames.

---

## Files & structure (quick)

- `src/components/OtherSkills.tsx` — demo modal + `videoMap` used to locate local demo files.
- `src/components/SkillOrbs.tsx` — animated skill orbs and visuals.
- `public/videos/` — add MP4 demo files here (tracked with Git LFS in this repo).
- `.github/workflows/ci.yml` — PR and push CI that checks out LFS objects and builds the app.

---

## Adding or replacing demo videos (advanced)

1. Copy your MP4 files into `public/videos/`.
2. Ensure Git LFS is enabled and tracking `*.mp4` (see `CONTRIBUTING.md`).
3. Commit and push your branch. Prefer feature branches for content or doc changes.

Example commands:

```powershell
git lfs install
git lfs track "*.mp4"
git add .gitattributes public/videos/"video editing1.mp4"
git commit -m "Add demo video"
git push origin main
```

If you prefer not to add heavy files to `main`, push them to a feature branch and open a PR draft.

---

## Contributing (inline summary)

Short checklist for contributors:

- Use Git LFS for media: `git lfs install` and `git lfs track "*.mp4"`.
- Use `npm ci` to install dependencies for reproducible builds.
- Create feature branches for non-trivial changes, commit related files together, and open a PR draft for review.

Create and push a branch, then open a PR draft with `gh` (GitHub CLI):

```bash
git checkout -b docs/readme-enhanced
git add README.md CONTRIBUTING.md .github/workflows/ci.yml
git commit -m "docs: improve README with badges and screenshots"
git push --set-upstream origin docs/readme-enhanced

# create PR draft (requires gh cli)
gh auth login
gh pr create --title "docs: enhance README" --body "Polished README with badges, screenshots, and contributing notes." --base main --head docs/readme-enhanced --draft
```

If you don't have `gh` installed I can provide the PR body text or help create the branch and commands to push.

---

## CI & Deployment

- CI: `.github/workflows/ci.yml` runs `npm ci` and `npm run build` on PRs and pushes to `main`. It is configured to fetch Git LFS objects during checkout.
- Deployment: Vercel is recommended — connect the repo and enable Automatic Deploys for `main`.

---

## Troubleshooting

- If the player shows a placeholder instead of a video on GitHub, run `git lfs pull` locally to download actual media objects.
- If `git push` fails for large packs, use Git LFS or increase `git config http.postBuffer` temporarily.


## 🤝 Let's Connect
I am always open to collaboration, feedback, and tech discussions.
- **LinkedIn:** [Insert Your LinkedIn Profile Link]
- **Email:** gebregebey@gmail.com

---
*Built by Gebey | Learning, Building, and Growing.*

