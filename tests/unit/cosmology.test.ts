import { describe, expect, it } from "vitest";
import { cosmosEntities, cosmosRelations, getConnections, searchCosmos } from "../../lib/story/cosmos";

describe("curated story cosmology", () => {
  it("keeps scattered worlds outside Biểu Tầng and tombs separate from geographic regions", () => {
    expect(cosmosEntities.find((item) => item.id === "tombs")?.kind).toBe("concept");
    expect(cosmosRelations.some((edge) => edge.source === "bieu-tang" && edge.target === "roi-rac")).toBe(false);
    for (const id of ["reality", "cultivation", "than-vo", "huyen-khong"]) {
      expect(cosmosRelations.some((edge) => edge.source === "roi-rac" && edge.target === id && edge.kind === "contains")).toBe(true);
    }
  });

  it("finds relationships in both directions without conflating membership and fusion", () => {
    const connections = getConnections("reality");
    expect(connections.some(({ entity, relation }) => entity.id === "luc-dao" && relation.kind === "system")).toBe(true);
    expect(connections.some(({ entity, relation }) => entity.id === "hoang-tuyen" && relation.kind === "fusion" && relation.chapters.includes(455))).toBe(true);
    expect(connections.some(({ entity }) => entity.id === "tombs")).toBe(true);
    expect(getConnections("unknown")).toEqual([]);
  });

  it("supports Vietnamese names, unaccented search and aliases", () => {
    expect(searchCosmos("huyen khong").map((item) => item.id)).toContain("huyen-khong");
    expect(searchCosmos("nhân gian").map((item) => item.id)).toContain("reality");
    expect(searchCosmos("dia nguc").map((item) => item.id)).toContain("hoang-tuyen");
    expect(searchCosmos("not-a-real-world")).toEqual([]);
  });

  it("has complete endpoints and chapter evidence for every entity and relationship", () => {
    const ids = new Set(cosmosEntities.map((item) => item.id));
    expect(ids.size).toBe(cosmosEntities.length);
    for (const item of cosmosEntities) {
      expect(item.chapters.length).toBeGreaterThan(0);
      expect(item.position.every(Number.isFinite)).toBe(true);
    }
    for (const edge of cosmosRelations) {
      expect(ids.has(edge.source) && ids.has(edge.target)).toBe(true);
      expect(edge.source).not.toBe(edge.target);
      expect(edge.chapters.length).toBeGreaterThan(0);
      expect(edge.chapters.every((chapter) => chapter > 0 && chapter <= 700)).toBe(true);
    }
  });
});
