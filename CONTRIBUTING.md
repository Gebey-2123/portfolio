# Contributing

Thank you for contributing to this portfolio project. A few notes about working with large media files (MP4) used in this repository.

## Git LFS (Large File Support)

This repository uses Git LFS to store large media files (`*.mp4`). Please follow these steps when contributing videos or cloning the repo.

### Install Git LFS

Download and install from https://git-lfs.github.com/ or run:

```powershell
# Windows (PowerShell)
choco install git-lfs -y  # if you use Chocolatey
git lfs install
```

### When adding video files

```bash
git lfs install
git lfs track "*.mp4"
git add .gitattributes
git add public/videos/*.mp4
git commit -m "Add videos via Git LFS"
git push origin main
```

### When cloning the repository

```bash
git clone https://github.com/Gebey-2123/portfolio.git
cd portfolio
git lfs install
# LFS objects are automatically fetched by recent git/checkout; if missing:
git lfs pull
```

Notes:
- `actions/checkout` in CI is configured to fetch LFS objects for builds.
- If you see placeholder files instead of real media, run `git lfs pull`.
