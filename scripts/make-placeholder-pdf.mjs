// Generates public/assets/Harshad_Agrawal_Resume.pdf as a valid one-page placeholder.
// Replace that file with the real resume; no code changes needed.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "assets", "Harshad_Agrawal_Resume.pdf");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
  null, // content stream, filled below
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

const stream = [
  "BT /F1 22 Tf 72 700 Td (Harshad Agrawal - Resume placeholder) Tj ET",
  "BT /F1 12 Tf 72 670 Td (Replace public/assets/Harshad_Agrawal_Resume.pdf with the real resume PDF.) Tj ET",
].join("\n");
objects[3] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, pdf, "latin1");
console.log(`Wrote ${out}`);
