/**
 * generate-preview-frames.js
 *
 * 在没有真实视频帧时，生成抽象渐变帧作为预览 / POC。
 *
 * 用法：
 *   node scripts/generate-preview-frames.js [--count 150] [--width 1600] [--height 900]
 *
 * 生成 150 帧从青色到 violet 的抽象渐变 + 几何运动。
 * 这些帧让 ScrollVideoHero 组件在视频帧提取前就能验证功能。
 *
 * 注意：此脚本需要使用 sharp 或 canvas。
 * 如果不可用，会直接输出 SVG-based HTML 预览。
 */

const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "sequences", "hero");

const args = process.argv.slice(2);
const config = {
  count: 150,
  width: 1600,
  height: 900,
  format: "webp",
};

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case "--count":
      config.count = parseInt(args[++i], 10);
      break;
    case "--width":
      config.width = parseInt(args[++i], 10);
      break;
    case "--height":
      config.height = parseInt(args[++i], 10);
      break;
    case "--format":
      config.format = args[++i];
      break;
  }
}

/**
 * 生成一帧的 SVG 内容。
 * 每一帧是一个抽象几何场景，随帧序号变化。
 */
function generateFrameSVG(frameIndex, totalFrames) {
  const progress = frameIndex / totalFrames;
  const w = config.width;
  const h = config.height;

  // 颜色渐变：从青色(第一阶段) -> 紫蓝色(第二阶段) -> 暖色(第三阶段)
  const color1 = lerpColor("#67E8F9", "#A78BFA", progress);
  const color2 = lerpColor("#A78BFA", "#60A5FA", progress * 0.7);
  const color3 = lerpColor("#60A5FA", "#F5D7A1", Math.max(0, progress - 0.5) * 2);

  // 圆的位置和大小随进度变化
  const cx = w * 0.3 + Math.sin(progress * Math.PI * 2) * w * 0.25;
  const cy = h * 0.35 + Math.cos(progress * Math.PI * 1.5) * h * 0.15;
  const r = 100 + Math.sin(progress * Math.PI * 3) * 40 + progress * 60;

  // 粒子点（随进度增加）
  const particleCount = Math.floor(20 + progress * 60);
  let particles = "";
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2 + progress * Math.PI * 2;
    const dist = 60 + Math.sin(angle * 3 + progress * 4) * 30 + progress * 80;
    const px = w / 2 + Math.cos(angle) * dist;
    const py = h / 2 + Math.sin(angle) * dist;
    const size = 1 + Math.sin(angle * 2 + progress * 5) * 0.8;
    const alpha = 0.1 + Math.sin(angle * 3 + progress * 6) * 0.1 + 0.1;
    particles += `<circle cx="${px}" cy="${py}" r="${size}" fill="${color1}" opacity="${alpha}" />\n    `;
  }

  // 水平线（随进度出现）
  const lineCount = Math.floor(5 + progress * 15);
  let lines = "";
  for (let i = 0; i < lineCount; i++) {
    const y = (h / (lineCount + 1)) * (i + 1) + Math.sin(progress * 2 + i) * 20;
    const alpha = 0.02 + Math.sin(progress * 3 + i * 0.5) * 0.02 + 0.01;
    lines += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${color2}" stroke-width="0.5" opacity="${alpha}" />\n    `;
  }

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#05070D" />
      <stop offset="50%" style="stop-color:#0B1020" />
      <stop offset="100%" style="stop-color:#05070D" />
    </linearGradient>
    <radialGradient id="glow${frameIndex}" cx="${cx / w * 100}%" cy="${cy / h * 100}%" r="30%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:0.15" />
      <stop offset="50%" style="stop-color:${color2};stop-opacity:0.06" />
      <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)" />
  <rect width="${w}" height="${h}" fill="url(#glow${frameIndex})" />
  ${lines}
  ${particles}
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color1}" stroke-width="1.5" opacity="0.15" />
  <circle cx="${cx}" cy="${cy}" r="${r * 0.7}" fill="none" stroke="${color2}" stroke-width="1" opacity="0.1" />
  <circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="${color3}" opacity="0.08" filter="url(#blur)" />
</svg>`;

  return svgContent;
}

function lerpColor(hex1, hex2, t) {
  t = Math.max(0, Math.min(1, t));
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

async function main() {
  console.log(`🎨 生成预览帧序列`);
  console.log(`   帧数: ${config.count}`);
  console.log(`   尺寸: ${config.width}x${config.height}`);
  console.log(`   目录: ${OUTPUT_DIR}`);
  console.log("");

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // 先用 SVG 作为占位（浏览器可以直接渲染 SVG 作为图像源）
  // 但 SVG 在 Canvas 上 drawImage 时可能有问题（跨域/安全策略）
  // 因此建议用户安装 sharp 后重新生成真正图片
  // 这里输出 HTML 预览 + 简单注释
  //
  // 由于无法使用 sharp（需要 npm install sharp），
  // 我们输出 .svg 文件，浏览器可以直接加载

  console.log("生成 SVG 帧...");
  let totalSize = 0;

  for (let i = 0; i < config.count; i++) {
    const frameNum = String(i + 1).padStart(4, "0");
    const svg = generateFrameSVG(i, config.count);
    const filePath = path.join(OUTPUT_DIR, `frame_${frameNum}.svg`);
    fs.writeFileSync(filePath, svg);
    totalSize += svg.length;
  }

  console.log(`✅ 已生成 ${config.count} 帧 SVG`);
  console.log(`   总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   平均: ${(totalSize / config.count / 1024).toFixed(1)} KB/帧`);

  // 更新 manifest
  const manifestPath = path.join(OUTPUT_DIR, "manifest.json");
  const manifest = {
    source: "generated-preview-svg",
    sourceSize: 0,
    sourceWidth: config.width,
    sourceHeight: config.height,
    sourceDuration: config.count / 10,
    sourceFps: 30,
    extractedAt: new Date().toISOString(),
    totalFrames: config.count,
    outputWidth: config.width,
    outputHeight: config.height,
    outputFormat: "svg",
    outputQuality: 100,
    outputFps: 10,
    outputDir: OUTPUT_DIR,
    outputPrefix: "frame_",
    totalSizeBytes: totalSize,
    avgSizeBytes: Math.round(totalSize / config.count),
    firstFrame: `frame_0001.svg`,
    lastFrame: `frame_${String(config.count).padStart(4, "0")}.svg`,
    frameFiles: Array.from({ length: config.count }, (_, i) =>
      `frame_${String(i + 1).padStart(4, "0")}.svg`
    ),
    isPreview: true,
    note: "使用真实视频替换: node scripts/extract-video-frames.js <视频路径>",
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📋 manifest.json 已更新`);

  console.log(`\n💡 提示：预览帧为 SVG 格式。`);
  console.log(`   要在生产环境使用真实视频：`);
  console.log(`   1. 确保 ffmpeg 已安装`);
  console.log(`   2. npm run frames:extract "C:\\path\\to\\video.mp4"`);
  console.log(`   3. npm run build`);
  console.log("");
  console.log(`   或者在浏览器中直接打开 SVG 帧测试 ScrollVideoHero 功能：`);
  console.log(`   打开 public/sequences/hero/frame_0001.svg 查看效果`);
}

main().catch((err) => {
  console.error("❌ 错误:", err.message);
  process.exit(1);
});
