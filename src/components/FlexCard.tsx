import { useState } from "react";
import { Share2 } from "lucide-react";
import { identity, quickStats, roles, type QuickStat } from "../content";
import { celebrateSmall } from "../lib/celebrate";
import { hapticMoment } from "../lib/haptics";
import { SecondaryButton } from "./primitives";

// Shareable "flex card": renders a single 1200x630 PNG (canvas) with name,
// role, and stats pulled straight from content.ts — nothing invented.
const statValue = (s: QuickStat) => `${s.value.toFixed(s.decimals ?? 0)}${s.suffix ?? ""}`;

const pick = (needle: string) => quickStats.find((s) => s.label.includes(needle));

function cardStats(): { value: string; label: string; fill: string }[] {
  const exp = pick("industry experience");
  const agents = pick("agents on the platform");
  const rank = pick("place among");
  const cgpa = pick("CGPA");
  const out: { value: string; label: string; fill: string }[] = [];
  if (exp) out.push({ value: statValue(exp), label: "MONTHS INDUSTRY EXPERIENCE", fill: "#ffde59" });
  if (agents) out.push({ value: statValue(agents), label: "AGENT PLATFORM SHIPPED", fill: "#7dd3fc" });
  if (rank) out.push({ value: statValue(rank), label: "OF 96,000+ PARTICIPANTS", fill: "#f9a8d4" });
  if (cgpa) out.push({ value: statValue(cgpa), label: "CGPA · B.TECH AI & ML", fill: "#6ee7b7" });
  return out;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const INK = "#17130b";
const LINE = "#101010";
const PAPER = "#151515";
const CREAM = "#f7f3e6";
const ORANGE = "#ff6b35";
const TERM = "#e8e4d8";
const TERM_DIM = "#8f897b";

async function renderCard(): Promise<Blob | null> {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // charcoal base + cream frame line
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, 1200, 630);
  ctx.strokeStyle = CREAM;
  ctx.lineWidth = 6;
  roundRect(ctx, 18, 18, 1164, 594, 26);
  ctx.stroke();

  // header row: terminal prompt
  ctx.textAlign = "left";
  ctx.font = "700 22px 'Inter Variable', sans-serif";
  ctx.fillStyle = TERM_DIM;
  ctx.fillText("harshad@portfolio:~", 72, 84);
  ctx.fillStyle = ORANGE;
  ctx.font = "800 22px 'Inter Variable', sans-serif";
  ctx.fillText("$", 340, 84);
  ctx.fillStyle = TERM;
  ctx.fillText("status --check", 362, 84);

  // name
  ctx.font = "88px 'Archivo Black', sans-serif";
  ctx.fillStyle = CREAM;
  ctx.fillText("HARSHAD", 64, 220);
  // AGRAWAL in an orange block with black border + orange offset shadow
  const blockX = 556;
  const blockY = 150;
  const blockW = 486;
  const blockH = 96;
  ctx.fillStyle = ORANGE;
  roundRect(ctx, blockX + 10, blockY + 10, blockW, blockH, 18); // hard shadow
  ctx.fill();
  ctx.fillStyle = ORANGE;
  roundRect(ctx, blockX, blockY, blockW, blockH, 18);
  ctx.fill();
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 6;
  roundRect(ctx, blockX, blockY, blockW, blockH, 18);
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = "88px 'Archivo Black', sans-serif";
  ctx.fillText("AGRAWAL", blockX + 26, blockY + 76);

  // role line as terminal output
  ctx.font = "700 26px 'Inter Variable', sans-serif";
  ctx.fillStyle = TERM_DIM;
  ctx.fillText(">", 64, 292);
  ctx.fillStyle = TERM;
  const roleLine = `${roles[0].toUpperCase()} · ${roles[1].toUpperCase()}`;
  ctx.fillText(roleLine, 88, 292);

  // stat blocks: cream boxes, black border, orange hard shadow
  const stats = cardStats();
  const boxW = 252;
  const gap = 20;
  const totalW = stats.length * boxW + (stats.length - 1) * gap;
  let x = 64 + (1072 - totalW) / 2;
  const y = 350;
  for (const stat of stats) {
    ctx.fillStyle = ORANGE;
    roundRect(ctx, x + 8, y + 8, boxW, 130, 18);
    ctx.fill();
    ctx.fillStyle = CREAM;
    roundRect(ctx, x, y, boxW, 130, 18);
    ctx.fill();
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 5;
    roundRect(ctx, x, y, boxW, 130, 18);
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.font = "44px 'Archivo Black', sans-serif";
    ctx.fillText(stat.value, x + boxW / 2, y + 62);
    ctx.font = "700 15px 'Inter Variable', sans-serif";
    const words = stat.label.split(" ");
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (ctx.measureText(candidate).width > boxW - 28 && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    lines.forEach((line, i) => ctx.fillText(line, x + boxW / 2, y + 90 + i * 20));
    ctx.textAlign = "left";
    x += boxW + gap;
  }

  // handles
  ctx.font = "600 20px 'Inter Variable', sans-serif";
  ctx.fillStyle = TERM_DIM;
  ctx.fillText("github.com/" + identity.githubHandle, 64, 560);
  ctx.fillText("linkedin.com/in/harshad-agrawal-486964322", 430, 560);

  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
}

export function FlexCardButton() {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  const generate = async () => {
    if (state === "busy") return;
    setState("busy");
    hapticMoment();
    try {
      const blob = await renderCard();
      if (!blob) throw new Error("canvas unavailable");
      const file = new File([blob], "harshad-agrawal-card.png", { type: "image/png" });
      const nav = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean;
        share?: (data: { files: File[]; title?: string; text?: string }) => Promise<void>;
      };
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        await nav.share({ files: [file], title: "Harshad Agrawal — Portfolio Card" });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "harshad-agrawal-card.png";
        a.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 4000);
      }
      celebrateSmall();
      setState("done");
      window.setTimeout(() => setState("idle"), 2400);
    } catch {
      setState("idle");
    }
  };

  return (
    <SecondaryButton onClick={generate} small>
      <Share2 className="size-4" aria-hidden="true" />
      {state === "done" ? "Card saved!" : state === "busy" ? "Rendering…" : "Share my card"}
    </SecondaryButton>
  );
}
