import { expect, it } from "vitest";
import { getCharacterDetail } from "../../lib/wiki/repository";
import { parseDescription } from "../../lib/wiki/description";

it("parses Renoa source emphasis and line breaks into safe nodes", () => {
  const real = getCharacterDetail("1041")!.startCards[0].description;
  expect(parseDescription(real)).toEqual([{ kind: "emphasis", children: [{ kind: "text", text: "100%" }] }, { kind: "text", text: " Damage" }]);
  expect(parseDescription("First<br>Second").map((node) => node.kind)).toEqual(["text", "break", "text"]);
});

it("ignores executable markup and preserves known keyword formatting", () => {
  const nodes = parseDescription("<script>alert(1)</script><cc><u>Dirge Bullet</u></><img src=x onerror=alert(2)>");
  expect(JSON.stringify(nodes)).not.toMatch(/script|onerror|alert/);
  expect(JSON.stringify(nodes)).toContain("Dirge Bullet");
  expect(parseDescription("<mystery>Safe</mystery>")).toEqual([{ kind: "text", text: "Safe" }]);
});
