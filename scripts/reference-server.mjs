import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(process.argv[2] ?? "docs/wiki.e7bot.top");
const port = Number(process.env.PORT || 4173);
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".webp": "image/webp", ".webm": "video/webm", ".png": "image/png", ".ico": "image/x-icon" };
const api = new Set(["/api/czn/characters/list", "/api/czn/characters/1041", "/api/czn/snapshot/characters/diff"]);

export function resolveRequest(pathname) {
  let clean;
  try { clean = decodeURIComponent(pathname); } catch { return null; }
  if (clean.includes("\\") || clean.split("/").includes("..")) return null;
  const rel = api.has(clean) ? `${clean.slice(1)}.html` : clean.slice(1);
  const target = resolve(root, rel);
  if (target !== root && !target.startsWith(root + sep)) return null;
  try { if (statSync(target).isFile()) return target; } catch { /* absent */ }
  if (!extname(clean) && !clean.startsWith("/api/")) return resolve(root, "index.html");
  return null;
}

export function referenceServer() {
  return createServer((request, response) => {
    const pathname = new URL(request.url || "/", "http://127.0.0.1").pathname;
    const path = resolveRequest(pathname);
    if (!path) { response.writeHead(404); response.end("Not found"); return; }
    let bytes = readFileSync(path);
    if (path.endsWith("index.html")) {
      const html = bytes.toString("utf8")
        .replace(/<script type="text\/javascript">[\s\S]*?<\/script>/i, "")
        .replace(/<script type="module" src="https:\/\/static\.cloudflareinsights\.com[\s\S]*?<\/script>/i, "");
      bytes = Buffer.from(html);
    }
    // The saved Vue bundles were formatted with `? ?` in place of the JS `??`
    // operator. Repair only the served QA response; the source files stay intact.
    if (path.endsWith(".js")) bytes = Buffer.from(bytes.toString("utf8").replace(/\? \?/g, "??"));
    const headers = { "Content-Type": mime[extname(path)] || "application/octet-stream", "Access-Control-Allow-Origin": "http://127.0.0.1:4173" };
    if (path.endsWith(".webm") && request.headers.range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range);
      if (match) {
        const start = Number(match[1]), end = match[2] ? Number(match[2]) : bytes.length - 1;
        response.writeHead(206, { ...headers, "Accept-Ranges": "bytes", "Content-Range": `bytes ${start}-${end}/${bytes.length}`, "Content-Length": end - start + 1 });
        response.end(bytes.subarray(start, end + 1)); return;
      }
    }
    response.writeHead(200, { ...headers, "Content-Length": bytes.length }); response.end(bytes);
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  referenceServer().listen(port, "127.0.0.1", () => console.log(`Reference snapshot: http://127.0.0.1:${port}`));
}
