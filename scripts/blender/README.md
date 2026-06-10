# Blender Automation Scripts

## Generate Hero Orb

The `generate_hero_orb.py` script creates a 3D asset for the site's hero section.

### What it generates

- `assets/blender/hero-orb.blend` — Full Blender scene
- `public/models/hero-orb.glb` — Web-optimized GLB for React Three Fiber
- `public/renders/hero-orb-preview.png` — Preview render

### How to run

```bash
# From project root:
npm run blender:hero

# Or manually:
"C:\Program Files\Blender Foundation\Blender 5.1\blender.exe" --background --python scripts/blender/generate_hero_orb.py
```

### Requirements

- Blender 4.0+ (tested with 5.1)
- No additional addons required

### Asset specs

- Format: GLB (binary glTF)
- Target size: 1-3 MB
- Polycount: Optimized for web
- Materials: Emission + Glass (Eevee-compatible)
