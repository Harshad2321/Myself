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
const PAPER = "#fdf3d3";

async function renderCard(): Promise<Blob | null> {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // paper + chunky frame
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, 1200, 630);
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 8;
  roundRect(ctx, 14, 14, 1172, 602, 28);
  ctx.stroke();

  // scattered flat blocks for texture
  const blocks: [number, number, number, string][] = [
    [930, 70, 26, "#f9a8d4"],
    [1010, 130, 18, "#7dd3fc"],
    [880, 160, 14, "#ffde59"],
    [1080, 90, 22, "#6ee7b7"],
  ];
  for (const [x, y, s, color] of blocks) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, s, s);
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, s, s);
  }

  // header row: HA blocks + kicker
  ctx.fillStyle = "#ffde59";
  roundRect(ctx, 64, 62, 74, 74, 14);
  ctx.fill();
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = "#f9a8d4";
  roundRect(ctx, 150, 62, 74, 74, 14);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = "44px 'Archivo Black', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("H", 101, 116);
  ctx.fillText("A", 187, 116);
  ctx.textAlign = "left";
  ctx.font = "700 22px 'Inter Variable', sans-serif";
  ctx.fillStyle = INK;
  ctx.fillText("PORTFOLIO CARD // HARSHAD.AGRAWAL", 260, 108);

  // name
  ctx.font = "88px 'Archivo Black', sans-serif";
  ctx.fillText("HARSHAD", 64, 236);
  ctx.fillStyle = "#f9a8d4";
  roundRect(ctx, 560, 158, 470, 92, 18);
  ctx.fill();
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.fillText("AGRAWAL", 584, 228);

  // role line
  ctx.font = "700 26px 'Inter Variable', sans-serif";
  const roleLine = `${roles[0].toUpperCase()} · ${roles[1].toUpperCase()}`;
  ctx.fillText(roleLine, 64, 296);

  // stat blocks
  const stats = cardStats();
  const boxW = 252;
  const gap = 20;
  const totalW = stats.length * boxW + (stats.length - 1) * gap;
  let x = 64 + (1092 - totalW) / 2 - 30;
  const y = 350;
  for (const stat of stats) {
    ctx.fillStyle = stat.fill;
    roundRect(ctx, x, y, boxW, 130, 18);
    ctx.fill();
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 5;
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
  ctx.fillStyle = INK;
  ctx.fillText(
    `github.com/${identity.githubHandle}   ·   linkedin.com/in/harshad-agrawal-486964322`,
    64,
    560,
  );

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
