import { readFileSync, readdirSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const signatures = {
  ".webp": (b) => b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP",
  ".png": (b) => b.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  ".webm": (b) => b.subarray(0, 4).equals(Buffer.from([26, 69, 223, 163])),
  ".woff2": (b) => b.toString("ascii", 0, 4) === "wOF2",
  ".ico": (b) => b.subarray(0, 4).equals(Buffer.from([0, 0, 1, 0])),
};

export function inspectAsset(buffer, extension) {
  if (!buffer?.length) return { status: "invalid", reason: "Empty file" };
  if (buffer.toString("utf8", 0, Math.min(100, buffer.length)).includes("No Content")) return { status: "invalid", reason: "Placeholder: No Content" };
  const check = signatures[extension.toLowerCase()];
  return check && !check(buffer) ? { status: "invalid", reason: `Invalid ${extension} signature` } : { status: "available" };
}

export function walkFiles(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? walkFiles(path) : [path];
  }).sort();
}

export function auditDirectory(root) {
  return walkFiles(root).map((path) => ({ path: relative(root, path).replaceAll("\\", "/"), ...inspectAsset(readFileSync(path), extname(path)) }));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const root = process.argv[2] ?? "public/reference/e7bot";
  const report = auditDirectory(root);
  const invalid = report.filter((item) => item.status !== "available");
  console.log(`Audited ${report.length} assets; invalid: ${invalid.length}`);
  for (const item of invalid) console.log(`${item.path}: ${item.reason}`);
  if (invalid.length) process.exitCode = 1;
}
