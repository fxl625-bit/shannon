/**
 * optimize-frames.js
 *
 * 对已导出的帧序列进行二次优化：
 * - 压缩 webp 质量
 * - 生成移动端缩略版本
 * - 统计文件信息
 *
 * 用法：
 *   node scripts/optimize-frames.js [--input public/sequences/hero] [--quality 70] [--mobile-scale 0.5] [--mobile-suffix _mobile]
 */

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const config = {
  input: path.resolve(ROOT, "public", "sequences", "hero"),
  quality: 70,
  mobileScale: 0.5,
  mobileSuffix: "_mobile",
  format: "webp",
};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--input":
      config.input = path.resolve(args[++i]);
      break;
    case "--quality":
      config.quality = parseInt(args[++i], 10);
      break;
    case "--mobile-scale":
      config.mobileScale = parseFloat(args[++i]);
      break;
    case "--mobile-suffix":
      config.mobileSuffix = args[++i];
      break;
    case "--format":
      config.format = args[++i];
      break;
  }
}

function checkFfmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`🔍 优化目录: ${config.input}`);

  if (!fs.existsSync(config.input)) {
    console.error(`❌ 目录不存在: ${config.input}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(config.input)
    .filter((f) => f.startsWith("frame_") && f.endsWith(`.${config.format}`))
    .sort();

  if (files.length === 0) {
    console.error("❌ 未找到帧文件");
    process.exit(1);
  }

  console.log(`📦 找到 ${files.length} 个帧文件`);

  if (!checkFfmpeg()) {
    console.warn("⚠️  ffmpeg 不可用，跳过压缩");
    return;
  }

  // 1. 压缩尺寸统计
  const beforeSizes = files.map((f) => ({
    name: f,
    size: fs.statSync(path.join(config.input, f)).size,
  }));

  const totalBefore = beforeSizes.reduce((sum, f) => sum + f.size, 0);
  console.log(`\n📊 优化前总大小: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);

  // 2. 生成移动端版本（如果不存在）
  const mobileDir = path.join(config.input, "..", "hero-mobile");
  if (!fs.existsSync(mobileDir)) {
    console.log(`\n📱 生成移动端版本 (${config.mobileScale}x 缩放)...`);
    fs.mkdirSync(mobileDir, { recursive: true });

    const sampleFile = files[0];
    const samplePath = path.join(config.input, sampleFile);
    const info = execSync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of json "${samplePath}"`,
      { stdio: "pipe", encoding: "utf-8" }
    );
    const parsed = JSON.parse(info);
    const origWidth = parsed.streams[0]?.width || 1600;
    const origHeight = parsed.streams[0]?.height || 900;
    const mobileWidth = Math.round(origWidth * config.mobileScale);
    const mobileHeight = Math.round(origHeight * config.mobileScale);

    console.log(`   原始尺寸: ${origWidth}x${origHeight}`);
    console.log(`   移动端尺寸: ${mobileWidth}x${mobileHeight}`);

    // 为每个帧文件生成移动端版本 — 每 2 帧取 1 帧
    const step = Math.max(1, Math.round(files.length / 60));
    const selectedFiles = files.filter((_, i) => i % step === 0);

    console.log(`   生成 ${selectedFiles.length} 帧（步长 ${step}）...`);

    let count = 0;
    for (const f of selectedFiles) {
      const inputPath = path.join(config.input, f);
      const outputName = f;
      const outputPath = path.join(mobileDir, outputName);

      try {
        execSync(
          `ffmpeg -y -i "${inputPath}" -vf "scale=${mobileWidth}:${mobileHeight}:flags=lanczos" -q:v ${config.quality} "${outputPath}"`,
          { stdio: "pipe", timeout: 10000 }
        );
        count++;
      } catch {
        // skip
      }
    }

    console.log(`   已生成 ${count} 帧`);
  } else {
    console.log(`✅ 移动端版本已存在: ${mobileDir}`);
  }

  console.log(`\n✅ 优化完成`);
}

main().catch((err) => {
  console.error("❌ 错误:", err.message);
  process.exit(1);
});
