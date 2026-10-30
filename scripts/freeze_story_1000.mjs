// Run before enabling the 1500 imports, after the earlier packet audit is complete.
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createServer } from "vite";

const server = await createServer({ configFile: false, optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true, watch: null }, appType: "custom" });
try {
  const { createInitialGraph } = await server.ssrLoadModule("/lib/story/graph.ts");
  const graph = createInitialGraph();
  const chapters = new Set(graph.nodes.filter((node) => node.kind === "event").flatMap((node) => node.chapters ?? []));
  if (chapters.size !== 1000 || Math.max(...chapters) !== 1000) throw new Error("Freeze requires the complete chapter-1000 runtime seed");
  const path = new URL("../lib/story/legacy/chapters-1000.json", import.meta.url);
  const inputs = [
    ...Array.from({ length: 7 }, (_, index) => `extensions/${301 + index * 100}-${400 + index * 100}.json`),
    "war-god-301-1000.json", "milestones-301-1000.json", "legacy/chapters-300.json",
  ];
  const hashes = Object.fromEntries(await Promise.all(inputs.map(async (name) => [name,
    createHash("sha256").update(await readFile(new URL(`../lib/story/${name}`, import.meta.url))).digest("hex")])));
  await writeFile(path, JSON.stringify(graph, null, 2) + "\n", { flag: "wx" });
  await writeFile(new URL("../lib/story/legacy/chapters-1000-sources.json", import.meta.url), JSON.stringify(hashes, null, 2) + "\n", { flag: "wx" });
  console.log(`Frozen ${graph.nodes.length} nodes and ${graph.links.length} links through chapter 1000`);
} finally {
  await server.close();
}
