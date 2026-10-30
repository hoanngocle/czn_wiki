import { describe, expect, it } from "vitest";
import { fitViewport, zoomViewport } from "../../lib/story/viewport";

describe("story board viewport", () => {
  it("keeps the scene point under the zoom anchor stationary", () => {
    expect(zoomViewport({ x: 100, y: 50, scale: 1 }, 1.5, { x: 400, y: 200 }))
      .toEqual({ x: -50, y: -25, scale: 1.5 });
  });
  it("clamps excessive zoom without losing the anchor", () => {
    expect(zoomViewport({ x: 0, y: 0, scale: 1 }, 20, { x: 100, y: 100 }))
      .toEqual({ x: -100, y: -100, scale: 2 });
    expect(zoomViewport({ x: 0, y: 0, scale: 1 }, 0.001, { x: 100, y: 100 }))
      .toEqual({ x: 97, y: 97, scale: 0.03 });
  });
  it("centers the complete map within a resized viewport", () => {
    const result = fitViewport(1000, 600, 1600, 800);
    expect(result.scale).toBeCloseTo(0.575);
    expect(result.x).toBeCloseTo(40);
    expect(result.y).toBeCloseTo(70);
  });
});
