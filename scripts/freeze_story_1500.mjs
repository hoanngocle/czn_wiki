// Capture the shipped seed before enabling the remaining EPUB chapters.
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createServer } from "vite";

const server = await createServer({ configFile: false, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true, watch: null }, appType: "custom" });
try {
  const { createInitialGraph } = await server.ssrLoadModule("/lib/story/graph.ts");
  const graph = createInitialGraph();
  const chapters = new Set(graph.nodes.filter((node) => node.kind === "event").flatMap((node) => node.chapters ?? []));
  if (chapters.size !== 1500 || Math.max(...chapters) !== 1500) throw new Error("Freeze requires the complete chapter-1500 runtime seed");
  const inputs = [
    ...Array.from({ length: 12 }, (_, index) => `extensions/${301 + index * 100}-${400 + index * 100}.json`),
    "war-god-301-1000.json", "milestones-301-1000.json", "war-god-1001-1500.json", "milestones-1001-1500.json",
    "character-aliases-1001-1500.json", "legacy/chapters-1000.json",
  ];
  const hashes = Object.fromEntries(await Promise.all(inputs.map(async (name) => [name,
    createHash("sha256").update((await readFile(new URL(`../lib/story/${name}`, import.meta.url), "utf8")).replace(/\r\n/g, "\n")).digest("hex")])));
  await writeFile(new URL("../lib/story/legacy/chapters-1500.json", import.meta.url), JSON.stringify(graph, null, 2) + "\n", { flag: "wx" });
  await writeFile(new URL("../lib/story/legacy/chapters-1500-sources.json", import.meta.url), JSON.stringify(hashes, null, 2) + "\n", { flag: "wx" });
  console.log(`Frozen ${graph.nodes.length} nodes and ${graph.links.length} links through chapter 1500`);
} finally {
  await server.close();
}
