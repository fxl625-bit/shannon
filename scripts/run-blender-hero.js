#!/usr/bin/env node
/**
 * run-blender-hero.js
 * Locates Blender and runs generate_hero_orb.py to produce 3D assets.
 */

const { execSync, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const SCRIPT = path.join(PROJECT_ROOT, "scripts", "blender", "generate_hero_orb.py");
const GLB_OUT = path.join(PROJECT_ROOT, "public", "models", "hero-orb.glb");
const PREVIEW_OUT = path.join(PROJECT_ROOT, "public", "renders", "hero-orb-preview.png");

// ── Blender Discovery ─────────────────────────────────────────────────────
function findBlender() {
  // 1. Try PATH
  try {
    const result = spawnSync("blender", ["--version"], {
      encoding: "utf8",
      timeout: 10000,
    });
    if (result.status === 0) return "blender";
  } catch (_) {}

  // 2. Windows common paths
  const candidates = [
    // Blender 5.x
    "C:\\Program Files\\Blender Foundation\\Blender 5.1\\blender.exe",
    "C:\\Program Files\\Blender Foundation\\Blender 5.0\\blender.exe",
    // Blender 4.x
    "C:\\Program Files\\Blender Foundation\\Blender 4.3\\blender.exe",
    "C:\\Program Files\\Blender Foundation\\Blender 4.2\\blender.exe",
    "C:\\Program Files\\Blender Foundation\\Blender 4.1\\blender.exe",
    "C:\\Program Files\\Blender Foundation\\Blender 4.0\\blender.exe",
    // F: drive
    "F:\\Program Files\\Blender Foundation\\Blender 5.1\\blender.exe",
    "F:\\Program Files\\Blender Foundation\\Blender 5.0\\blender.exe",
    "F:\\Program Files\\Blender Foundation\\Blender 4.3\\blender.exe",
    "F:\\Program Files\\Blender Foundation\\Blender 4.2\\blender.exe",
    // D: drive
    "D:\\Program Files\\Blender Foundation\\Blender 5.1\\blender.exe",
    "D:\\Program Files\\Blender Foundation\\Blender 4.3\\blender.exe",
  ];

  // Also scan for Blender installations
  const drives = ["C:", "D:", "E:", "F:"];
  for (const drive of drives) {
    const bfPath = `${drive}\\Program Files\\Blender Foundation`;
    try {
      if (fs.existsSync(bfPath)) {
        const entries = fs.readdirSync(bfPath);
        for (const entry of entries.sort().reverse()) {
          const exe = path.join(bfPath, entry, "blender.exe");
          if (fs.existsSync(exe) && !candidates.includes(exe)) {
            candidates.unshift(exe); // Add to front (newest first)
          }
        }
      }
    } catch (_) {}
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  // 3. macOS
  const macPath = "/Applications/Blender.app/Contents/MacOS/Blender";
  if (fs.existsSync(macPath)) return macPath;

  // 4. Linux common paths
  const linuxPaths = [
    "/usr/bin/blender",
    "/usr/local/bin/blender",
    "/snap/bin/blender",
  ];
  for (const p of linuxPaths) {
    if (fs.existsSync(p)) return p;
  }

  return null;
}

// ── File size helper ──────────────────────────────────────────────────────
function fileSizeMB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / (1024 * 1024)).toFixed(2);
  } catch (_) {
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║   Hero Orb Blender Runner                       ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log("");

  // Find Blender
  console.log("[1/3] Searching for Blender...");
  const blenderPath = findBlender();

  if (!blenderPath) {
    console.error("");
    console.error("╔══════════════════════════════════════════════════╗");
    console.error("║   ERROR: Blender not found!                      ║");
    console.error("╚══════════════════════════════════════════════════╝");
    console.error("");
    console.error("Blender is required to generate the hero-orb 3D asset.");
    console.error("");
    console.error("Please install Blender from: https://www.blender.org/download/");
    console.error("");
    console.error("After installing, you can:");
    console.error("  1. Add blender to your PATH, or");
    console.error("  2. Install to the default location:");
    console.error("     C:\\Program Files\\Blender Foundation\\Blender X.X\\");
    console.error("");
    console.error("Then re-run: npm run blender:hero");
    console.error("");
    console.error("Alternatively, the site will use the FallbackOrb component");
    console.error("when the GLB file is not available.");
    process.exit(1);
  }

  console.log(`  Found Blender: ${blenderPath}`);

  // Check script exists
  if (!fs.existsSync(SCRIPT)) {
    console.error(`  ERROR: Script not found: ${SCRIPT}`);
    process.exit(1);
  }

  // Run Blender
  console.log("[2/3] Running Blender script...");
  console.log(`  Script: ${SCRIPT}`);
  console.log("");

  try {
    const args = ["--background", "--python", SCRIPT];
    const result = spawnSync(blenderPath, args, {
      stdio: "inherit",
      timeout: 300000, // 5 min timeout
      cwd: PROJECT_ROOT,
    });

    if (result.status !== 0) {
      console.error("");
      console.error(`  Blender exited with code ${result.status}`);
      process.exit(result.status || 1);
    }
  } catch (err) {
    console.error(`  Failed to run Blender: ${err.message}`);
    process.exit(1);
  }

  // Verify output
  console.log("");
  console.log("[3/3] Verifying output...");

  let success = true;

  if (fs.existsSync(GLB_OUT)) {
    const size = fileSizeMB(GLB_OUT);
    console.log(`  ✓ hero-orb.glb exists (${size} MB)`);
    if (parseFloat(size) > 5) {
      console.warn(`  ⚠ Warning: GLB is ${size} MB (recommended: 1-3 MB)`);
    }
  } else {
    console.error(`  ✗ hero-orb.glb NOT found at ${GLB_OUT}`);
    success = false;
  }

  if (fs.existsSync(PREVIEW_OUT)) {
    const size = fileSizeMB(PREVIEW_OUT);
    console.log(`  ✓ hero-orb-preview.png exists (${size} MB)`);
  } else {
    console.warn(`  ⚠ hero-orb-preview.png NOT found at ${PREVIEW_OUT}`);
  }

  console.log("");
  if (success) {
    console.log("╔══════════════════════════════════════════════════╗");
    console.log("║   ✓ Hero Orb generation complete!                ║");
    console.log("╚══════════════════════════════════════════════════╝");
  } else {
    console.error("╔══════════════════════════════════════════════════╗");
    console.error("║   ✗ Hero Orb generation failed!                  ║");
    console.error("╚══════════════════════════════════════════════════╝");
    process.exit(1);
  }
}

main();
