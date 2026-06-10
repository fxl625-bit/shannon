# Shannon Fu — AI × Human Potential

An **AI × Human Potential** concept site — a motion-driven interface exploring how AI extends human memory, expression, judgment, and creativity.

Built with Next.js 16, React Three Fiber, Framer Motion, and Blender-generated 3D assets.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Animation | Framer Motion 12 |
| 3D Engine | React Three Fiber + Drei + Three.js |
| 3D Assets | Blender 4+ Python automation |
| Deployment | GitHub Pages (static export) |
| CI/CD | GitHub Actions |

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (Hero + 7 sections)
│   ├── layout.tsx          # Root layout with fonts + metadata
│   ├── globals.css         # Design system + global styles
│   ├── cases/              # Case studies (index + [slug]/detail)
│   ├── skills/             # AI skill engineering
│   ├── apps/               # Apps & tools
│   ├── lab/                # AI Lab experiments
│   ├── second-brain/       # Knowledge system
│   ├── obsidian/           # Obsidian knowledge base
│   ├── projects/           # Projects
│   └── thoughts/           # Thoughts
├── components/
│   ├── AmbientBackground.tsx   # Full-page dynamic background
│   ├── Navigation.tsx          # Glass nav with scroll transition
│   ├── HeroSection.tsx         # 3D hero with scroll effects
│   ├── ManifestoSection.tsx    # Magazine-style manifesto
│   ├── PotentialMapSection.tsx # SVG-connected knowledge map
│   ├── ExperimentsSection.tsx  # 3D tilt experiment cards
│   ├── WorkflowSection.tsx     # Input→Output flow diagram
│   ├── AppsSection.tsx         # App preview cards
│   ├── ClosingSection.tsx      # Closing statement
│   ├── animation/
│   │   ├── Reveal.tsx          # Reusable scroll-reveal wrapper
│   │   └── MouseGlow.tsx       # Mouse-following radial glow
│   ├── three/
│   │   ├── ThreeCanvas.tsx     # R3F Canvas wrapper (SSR-safe)
│   │   ├── HeroScene.tsx       # Hero 3D scene with GLB loading
│   │   ├── ModelViewer.tsx     # Generic GLB model viewer
│   │   ├── FallbackOrb.tsx     # Fallback 3D orb when GLB fails
│   │   └── FloatingNodes.tsx   # Reusable floating node cloud
│   └── language-provider.tsx   # EN/ZH bilingual context
├── data/
│   ├── site.ts             # Site content & navigation data
│   ├── experiments.ts      # Featured experiments data
│   ├── potential-map.ts    # Knowledge map nodes & connections
│   └── cases.ts            # Case study content
├── assets/
│   └── blender/
│       └── hero-orb.blend  # Blender source file
├── public/
│   ├── models/
│   │   └── hero-orb.glb    # Web-optimized 3D model
│   ├── renders/
│   │   └── hero-orb-preview.png
│   └── images/             # App screenshots
└── scripts/
    ├── blender/
    │   ├── generate_hero_orb.py  # Blender Python script
    │   └── README.md
    └── run-blender-hero.js       # Auto-detect Blender + run
```

## Design System

The site uses a **Soft Futurism / Humanistic AI** visual language:

- **Background:** Deep space blue-black (`#05070D` → `#0B1020`)
- **Surfaces:** Subtle glass with `rgba(255,255,255,0.045)`
- **Accents:** Cyan (`#67E8F9`), Violet (`#A78BFA`), Warm Gold (`#F5D7A1`)
- **Typography:** Inter, with magazine-style hierarchy
- **Motion:** Framer Motion with consistent ease curve `[0.22, 1, 0.36, 1]`
- **Reduced Motion:** `prefers-reduced-motion` fully respected

## Blender 3D Assets

### Hero Orb Asset

The homepage 3D hero visual (`hero-orb.glb`) is auto-generated via Blender Python:

```bash
npm run blender:hero
```

Or manually:

```bash
"C:\Program Files\Blender Foundation\Blender 4.3\blender.exe" --background --python scripts/blender/generate_hero_orb.py
```

### What it generates

| File | Description | Size Limit |
|------|-------------|-----------|
| `assets/blender/hero-orb.blend` | Full Blender scene | — |
| `public/models/hero-orb.glb` | Web-optimized GLB | 1–3 MB target |
| `public/renders/hero-orb-preview.png` | Preview render | — |

### Asset Specs

- **Format:** Binary glTF (.glb)
- **Target size:** 1–3 MB (current: ~695 KB)
- **Polycount:** Optimized for web (48-segment spheres, 128-segment torus rings)
- **Materials:** Emission + Glass (Eevee-compatible)
- **Animation:** Rotation, breathing, and mouse parallax handled in JavaScript

### Regenerating the Model

1. **Install Blender 4.0+** if not already installed
2. Run `npm run blender:hero`
3. The script auto-detects Blender on common Windows paths
4. Output appears in `public/models/hero-orb.glb`
5. Refresh the dev server to see the updated model

### 3D Fallback

When `hero-orb.glb` fails to load (or is missing), the page gracefully falls back to a procedurally generated 3D orb (`FallbackOrb`), which includes:
- Translucent center sphere with breathing animation
- Glowing cyan/violet core
- 3 orbiting rings at different angles
- 20 floating knowledge nodes with connection lines
- Mouse parallax effect

### Adding Custom 3D Models

1. Export your model as `.glb` (binary glTF)
2. Place in `public/models/`
3. Copy `ModelViewer` usage from `HeroScene.tsx`
4. Keep files under 3 MB for performance

## Pages

| Route | Content |
|-------|---------|
| `/` | Homepage — Hero, Manifesto, Knowledge Map, Experiments, Workflow, Apps, Closing |
| `/cases` | AI-Native workflow case studies |
| `/cases/[slug]` | Case study detail |
| `/skills` | AI skill engineering methodology |
| `/apps` | Apps & lightweight AI tools |
| `/lab` | AI Lab — experimental playground |
| `/second-brain` | Personal knowledge system |
| `/obsidian` | Obsidian knowledge base engineering |
| `/projects` | Projects |
| `/thoughts` | Thoughts & notes |

## Mobile

- 3D Canvas DPR limited to 1 on mobile devices
- Potential Map switches to vertical layout
- Experiment cards stack in single column
- Mouse glow disabled on touch devices
- Hero content avoids overflow
- All animations respect `prefers-reduced-motion`

## Performance

- Dynamic imports for all Three.js components (SSR-safe)
- Lazy-loaded Canvas with Suspense
- GLB file checked via HEAD request before loading
- Smooth fallback if 3D fails
- CSS animations over JS where possible
- No large video backgrounds

## Deployment

### GitHub Pages (current)

The project auto-deploys via GitHub Actions on push to `main`:

```bash
npm run build
# Output in ./out/
```

The `next.config.ts` automatically handles:
- `basePath` for project pages (e.g., `/shannon`)
- Static export (`output: "export"`)
- Unoptimized images for static hosting

### Vercel (alternative)

```bash
npm run build
npx vercel
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_BASE_PATH` | Auto-set for GitHub Pages base path |
| `GITHUB_REPOSITORY` | Used by next.config.ts to detect project pages |

## FAQ

**Q: The 3D model doesn't load / is missing.**
Verify `public/models/hero-orb.glb` exists and is not corrupted. Run `npm run blender:hero` to regenerate.

**Q: Blender is not found.**
Install Blender 4.0+ from [blender.org](https://www.blender.org/). The script checks `C:\Program Files\Blender Foundation\Blender*\blender.exe`.

**Q: The site works on desktop but breaks on mobile.**
Check for horizontal scroll (`overflow-x: hidden` is set on body). The Potential Map and Workflow sections have responsive variants.

**Q: How to change the hero title copy?**
Edit `components/HeroSection.tsx` — the main H1 text is bilingual (EN/ZH).

**Q: Build fails with path errors.**
Ensure you're using Node.js 20+ and have run `npm install` first.

## License

MIT
