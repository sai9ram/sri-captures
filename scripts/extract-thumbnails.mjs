// extract-thumbnails.mjs
// Extracts the first visible frame from each video using ffmpeg-static + child_process
import { execFileSync } from "child_process";
import { createRequire } from "module";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const videosDir = path.join(__dirname, "../public/videos");
const thumbsDir = path.join(__dirname, "../public/images/thumbs");

fs.mkdirSync(thumbsDir, { recursive: true });

const videos = [
  "film-1.mp4",
  "film-2.mp4",
  "film-3.mp4",
  "film-4.mp4",
  "film-5.mp4",
];

for (const vid of videos) {
  const input = path.join(videosDir, vid);
  const outName = vid.replace(".mp4", "-thumb.jpg");
  const output = path.join(thumbsDir, outName);

  if (!fs.existsSync(input)) {
    console.warn(`⚠️  Not found, skipping: ${vid}`);
    continue;
  }

  try {
    execFileSync(ffmpegPath, [
      "-ss", "00:00:01",      // seek to 1 second (avoids pure-black first frame)
      "-i", input,
      "-vframes", "1",        // grab exactly one frame
      "-q:v", "2",            // high JPEG quality
      "-y",                   // overwrite
      output,
    ], { stdio: "inherit" });
    console.log(`✅  ${vid} → ${outName}`);
  } catch (err) {
    console.error(`❌  Failed for ${vid}:`, err.message);
  }
}

console.log("\nDone! Thumbnails saved to public/images/thumbs/");
