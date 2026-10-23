// Generates public/og.png (1200x630) — the custom social-share card.
// Rendered from SVG via sharp; system font stack keeps it dependency-light.
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const stats = [
  ["6+", "MONTHS INDUSTRY"],
  ["17", "AGENT PLATFORM"],
  ["6th", "OF 96,000+"],
  ["7.85", "CGPA /10"],
];

const statBoxes = stats
  .map(
    ([value, label], i) => `
  <g transform="translate(${72 + i * 268}, 344)">
    <rect x="8" y="8" width="252" height="128" rx="18" fill="#ff6b35"/>
    <rect width="252" height="128" rx="18" fill="#f7f3e6" stroke="#101010" stroke-width="5"/>
    <text x="126" y="62" text-anchor="middle" font-family="'Arial Black','Segoe UI Black',sans-serif" font-size="42" fill="#17130b">${value}</text>
    <text x="126" y="92" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="14" fill="#45403a">${label}</text>
  </g>`,
  )
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#151515"/>
  <rect x="18" y="18" width="1164" height="594" rx="26" fill="none" stroke="#f2efe8" stroke-width="6"/>
  <text x="72" y="84" font-family="'Consolas','Courier New',monospace" font-weight="700" font-size="22" fill="#8f897b">harshad@portfolio:~ <tspan fill="#ff6b35">$</tspan> <tspan fill="#e8e4d8">status --check</tspan></text>
  <text x="64" y="216" font-family="'Arial Black','Segoe UI Black',sans-serif" font-size="84" fill="#f2efe8">HARSHAD</text>
  <g>
    <rect x="566" y="160" width="486" height="96" rx="18" fill="#ff6b35"/>
    <rect x="556" y="150" width="486" height="96" rx="18" fill="#ff6b35" stroke="#101010" stroke-width="6"/>
    <text x="582" y="226" font-family="'Arial Black','Segoe UI Black',sans-serif" font-size="84" fill="#17130b">AGRAWAL</text>
  </g>
  <text x="88" y="292" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="26" fill="#e8e4d8">&gt; AI/ML ENGINEER · MULTI-AGENT SYSTEMS BUILDER</text>
  ${statBoxes}
  <text x="72" y="560" font-family="'Consolas','Courier New',monospace" font-size="20" fill="#8f897b">github.com/Harshad2321 · linkedin.com/in/harshad-agrawal-486964322</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, "public/og.png"));
console.log("og.png generated (1200x630)");
