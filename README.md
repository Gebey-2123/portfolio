This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Project Overview & Helpful Notes

- **Purpose:** This portfolio showcases a Next.js + Tailwind project with interactive demo sections for `Video Editing`, `Digital Marketing`, and `Content Creation`. It includes a local-first demo player that prefers files in `public/videos/` for reliable playback.
- **Local video samples:** To replace or add playable demos, place MP4 files in `public/videos/`. The app looks for names like `video editing1.mp4`, `video editing2.mp4`, `Digital Marketing.mp4`, and `content-1.mp4`. Use the exact filenames or update `src/components/OtherSkills.tsx` `videoMap` entries to match your files.
- **Content idea (ready-to-use):** Add a `CONTENT_ID` project that includes a 60s explainer: 3 visual steps, 1 surprising stat, and a CTA. Include a short 'making-of' caption thread to improve engagement.

## How to push this project to GitHub from VS Code

Option A — VS Code UI (recommended if you prefer GUI):
1. Open the project in VS Code.
2. Open the Source Control view (left sidebar) and click **Initialize Repository** if not already a repo.
3. Sign into GitHub via the Accounts icon (bottom-left) if prompted.
4. Click **Publish to GitHub** in the Source Control view or the status bar, choose visibility, and confirm.

Option B — Command line (works in VS Code Terminal):
Replace `<USERNAME>` and `<REPO>` with your values.
```bash
git init
git branch -M main
git add .
git commit -m "Initial commit: add portfolio and sample videos"
# create GitHub repo and push (replace remote URL below)
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```

Option C — GitHub CLI (if `gh` installed):
```bash
gh auth login
gh repo create <REPO> --public --source=. --remote=origin --push
```

If you want, I can create a ready-to-paste README snippet with screenshots and badges — tell me which logos/badges you prefer (Vercel, Next.js, Tailwind, TypeScript).
