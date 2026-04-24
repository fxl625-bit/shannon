# Shannon Fu Site

Minimal personal website built with Next.js and Tailwind CSS.

## Run

```bash
npm install
npm run dev
```

## Edit content

Update project cards and short thoughts in `data/site.ts`.

## Deploy to GitHub Pages

This project is configured for GitHub Pages static export with GitHub Actions.

1. Create a GitHub repository.
2. Push this folder to the `main` branch.
3. In GitHub, open `Settings` -> `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push again or run the `Deploy to GitHub Pages` workflow.

If the repository name is not `<username>.github.io`, the site will automatically build under `/<repository-name>`.
