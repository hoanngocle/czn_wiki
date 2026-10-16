import { describe, expect, it } from "vitest";
import { advanceCardSpring } from "../../lib/ui/card-motion";

describe("card spring", () => {
  it("has the same response over equal time at 30, 60 and 144 Hz", () => {
    const results = [30, 60, 144].map(rate => {
      let state = { value: 0, velocity: 0 };
      for (let frame = 0; frame < rate / 2; frame++) {
        state = advanceCardSpring(state.value, state.velocity, 15, 1 / rate, 18);
      }
      return state;
    });
    for (const result of results) {
      expect(result.value).toBeCloseTo(results[0].value, 10);
      expect(result.velocity).toBeCloseTo(results[0].velocity, 10);
      expect(result.value).toBeGreaterThan(14.9);
      expect(result.value).toBeLessThan(15);
    }
  });

  it("returns from a held tilt without crossing or bouncing around the neutral position", () => {
    let state = { value: 20, velocity: 0 };
    for (let frame = 0; frame < 120; frame++) {
      const next = advanceCardSpring(state.value, state.velocity, 0, 1 / 120, 14);
      expect(next.value).toBeLessThan(state.value);
      expect(next.value).toBeGreaterThanOrEqual(0);
      state = next;
    }
    expect(state.value).toBeLessThan(.001);
  });
});
