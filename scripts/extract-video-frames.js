/**
 * extract-video-frames.js
 *
 * 使用 ffmpeg 将视频拆解为标准帧序列（webp）。
 *
 * 用法：
 *   node scripts/extract-video-frames.js <视频路径> [选项]
 *
 * 选项：
 *   --fps <12>             每秒帧数（默认 12）
 *   --total <180>          目标总帧数（默认 180；与 fps 取较小者）
 *   --width <1600>         输出宽度（默认 1600，高度自动保持比例）
 *   --quality <75>         webp 质量 1-100（默认 75）
 *   --output <路径>         输出目录（默认 public/sequences/hero）
 *   --prefix <frame_>      文件名前缀（默认 frame_）
 *   --format <webp>        输出格式：webp | jpg | png
 *
 * 示例：
 *   node scripts/extract-video-frames.js "C:\Users\yckj0094\Desktop\douyin_video.mp4" --total 150
 *   node scripts/extract-video-frames.js "C:\Users\yckj0094\Desktop\微信视频.mp4" --fps 10 --width 1920
 */

const { execSync, exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// ── 默认配置 ──────────────────────────────────────────────
const DEFAULTS = {
  fps: 12,
  total: 180,
  width: 1600,
  quality: 75,
  output: path.resolve(__dirname, "..", "public", "sequences", "hero"),
  prefix: "frame_",
  format: "webp",
};

// ── 辅助函数 ──────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp();
    process.exit(0);
  }

  const input = path.resolve(args[0]);
  const config = { ...DEFAULTS };

  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case "--fps":
        config.fps = parseInt(args[++i], 10);
        break;
      case "--total":
        config.total = parseInt(args[++i], 10);
        break;
      case "--width":
        config.width = parseInt(args[++i], 10);
        break;
      case "--quality":
        config.quality = parseInt(args[++i], 10);
        break;
      case "--output":
        config.output = path.resolve(args[++i]);
        break;
      case "--prefix":
        config.prefix = args[++i];
        break;
      case "--format":
        config.format = args[++i];
        break;
    }
  }

  return { input, config };
}

function printHelp() {
  console.log(`
extract-video-frames.js — 用 ffmpeg 将视频拆为帧序列

用法：
  node scripts/extract-video-frames.js <视频路径> [选项]

选项：
  --fps <12>       每秒帧数（默认 12）
  --total <180>    目标总帧数，与 fps 取较小值（默认 180）
  --width <1600>   输出宽度（默认 1600，高度自动保持比例）
  --quality <75>   webp 质量 1-100（默认 75）
  --output <路径>    输出目录（默认 public/sequences/hero）
  --prefix <frame_> 文件名前缀（默认 frame_）
  --format <webp>  输出格式：webp | jpg | png
  `);
}

function checkFfmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

function getVideoInfo(inputPath) {
  try {
    const output = execSync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,r_frame_rate -of json "${inputPath}"`,
      { stdio: "pipe", encoding: "utf-8" }
    );
    const info = JSON.parse(output).streams[0];
    const fpsMatch = info.r_frame_rate;
    const [num, den] = fpsMatch.split("/").map(Number);
    const fps = num / (den || 1);
    return {
      width: info.width,
      height: info.height,
      duration: parseFloat(info.duration) || 0,
      fps: Math.round(fps),
    };
  } catch {
    return null;
  }
}

// ── 主流程 ──────────────────────────────────────────────
async function main() {
  const { input, config } = parseArgs();

  // 1. 检查输入文件
  if (!fs.existsSync(input)) {
    console.error(`❌ 输入文件不存在: ${input}`);
    process.exit(1);
  }
  const inputSize = fs.statSync(input).size;

  // 2. 检查 ffmpeg
  if (!checkFfmpeg()) {
    console.error("❌ ffmpeg 不可用。请安装 ffmpeg:");
    console.error("   Windows: winget install ffmpeg 或从 https://ffmpeg.org/download.html 安装");
    console.error("   macOS: brew install ffmpeg");
    console.error("   Linux: sudo apt install ffmpeg");
    process.exit(1);
  }
  console.log("✅ ffmpeg 可用");

  // 3. 获取视频信息
  const videoInfo = getVideoInfo(input);
  if (!videoInfo) {
    console.error("❌ 无法读取视频信息");
    process.exit(1);
  }
  console.log(`📹 视频信息:`);
  console.log(`   文件: ${path.basename(input)}`);
  console.log(`   时长: ${videoInfo.duration.toFixed(1)}s`);
  console.log(`   分辨率: ${videoInfo.width}x${videoInfo.height}`);
  console.log(`   原始帧率: ${videoInfo.fps}fps`);

  // 4. 计算最终帧数
  const totalFrames = Math.min(
    config.total,
    Math.floor(videoInfo.duration * config.fps)
  );
  const effectiveFps = Math.min(
    config.fps,
    Math.floor(totalFrames / videoInfo.duration)
  );

  console.log(`🎯 输出配置:`);
  console.log(`   抽帧: ${effectiveFps}fps（预计 ${totalFrames} 帧）`);
  console.log(`   宽度: ${config.width}px`);
  console.log(`   质量: ${config.quality}`);
  console.log(`   格式: ${config.format}`);
  console.log(`   输出: ${config.output}`);

  // 5. 创建输出目录
  fs.mkdirSync(config.output, { recursive: true });

  // 6. 清理旧文件（提示）
  const existingFiles = fs
    .readdirSync(config.output)
    .filter((f) => f.startsWith(config.prefix));
  if (existingFiles.length > 0) {
    console.log(`⚠️  输出目录已有 ${existingFiles.length} 个帧文件，将被覆盖`);
  }

  // 7. 执行 ffmpeg
  const outputPattern = path.join(config.output, `${config.prefix}%04d.${config.format}`);

  // 帧率计算：先通过 fps 和 total 确定合适的抽帧策略
  // 如果视频非常短或很长，动态调整
  const targetFps = Math.min(config.fps, videoInfo.fps);

  let ffmpegCmd;
  if (config.format === "webp") {
    ffmpegCmd = `ffmpeg -i "${input}" -vf "fps=${targetFps},scale=${config.width}:-1:flags=lanczos" -q:v ${config.quality} -compression_level 6 -preset default -loop 0 -y "${outputPattern}"`;
  } else if (config.format === "jpg") {
    ffmpegCmd = `ffmpeg -i "${input}" -vf "fps=${targetFps},scale=${config.width}:-1:flags=lanczos" -q:v 2 -y "${outputPattern}"`;
  } else {
    ffmpegCmd = `ffmpeg -i "${input}" -vf "fps=${targetFps},scale=${config.width}:-1:flags=lanczos" -y "${outputPattern}"`;
  }

  console.log(`\n🚀 开始抽帧...`);
  console.log(`   命令: ${ffmpegCmd}\n`);

  const startTime = Date.now();

  try {
    execSync(ffmpegCmd, { stdio: "inherit", timeout: 600000 }); // 10 分钟超时
  } catch (err) {
    console.error(`\n❌ ffmpeg 执行失败`);
    console.error(`   确保 ffmpeg 在 PATH 中，且视频文件可读`);
    process.exit(1);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // 8. 统计输出
  const outFiles = fs
    .readdirSync(config.output)
    .filter((f) => f.startsWith(config.prefix))
    .sort();

  const actualCount = outFiles.length;
  const totalSize = outFiles.reduce(
    (sum, f) => sum + fs.statSync(path.join(config.output, f)).size,
    0
  );

  console.log(`\n✅ 抽帧完成! (耗时 ${elapsed}s)`);
  console.log(`   实际输出: ${actualCount} 帧`);
  console.log(`   总大小: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   平均大小: ${(totalSize / actualCount / 1024).toFixed(1)} KB/帧`);
  console.log(`   目录: ${config.output}`);

  // 9. 生成 manifest.json
  const manifest = {
    source: path.basename(input),
    sourceSize: inputSize,
    sourceWidth: videoInfo.width,
    sourceHeight: videoInfo.height,
    sourceDuration: videoInfo.duration,
    sourceFps: videoInfo.fps,
    extractedAt: new Date().toISOString(),
    totalFrames: actualCount,
    outputWidth: config.width,
    outputHeight: Math.round(
      (config.width / videoInfo.width) * videoInfo.height
    ),
    outputFormat: config.format,
    outputQuality: config.quality,
    outputFps: targetFps,
    outputDir: config.output,
    outputPrefix: config.prefix,
    totalSizeBytes: totalSize,
    avgSizeBytes: Math.round(totalSize / actualCount),
    firstFrame: outFiles[0] || null,
    lastFrame: outFiles[outFiles.length - 1] || null,
    frameFiles: outFiles,
  };

  const manifestPath = path.join(config.output, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📋 manifest.json 已生成: ${manifestPath}`);
}

main().catch((err) => {
  console.error("❌ 错误:", err.message);
  process.exit(1);
});
