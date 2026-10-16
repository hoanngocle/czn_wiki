import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Downloaded source paths stay intact; application assets have one category layer.
export function assetUrl(sourcePath, characterKind) {
  const path = sourcePath.replaceAll("\\", "/").replace(/^\/reference\/e7bot\//, "");
  if (path.startsWith("/assets/")) return path;
  const name = path.split("/").at(-1);
  let category = "common";
  if (/\/face\/character\//.test(path)) {
    category = characterKind === "supporter" ? "partner" : "combatant";
  } else if (/\/(?:item|relics)\//.test(path)) category = "item";
  else if (/\/(?:card|card_illustration|font)\//.test(path)) category = "card";
  else if (/^(?:partner-|icon_tab_partner-)/.test(name)) category = "partner";
  else if (/^(?:combatant-|icon_tab_combatant-)/.test(name)) category = "combatant";
  else if (/^(?:item-|relic-|icon_equip_)/.test(name)) category = "item";
  else if (/^card-/.test(name)) category = "card";
  return `/assets/${category}/${name}`;
}

export function createAssetResolver(characters) {
  const kinds = new Map(characters.map((character) => [character.portrait.split("/").at(-1), character.kind]));
  return (sourcePath) => assetUrl(sourcePath, kinds.get(sourcePath.replaceAll("\\", "/").split("/").at(-1)));
}

export function copyAsset(source, publicRoot, url) {
  const target = join(publicRoot, url);
  if (existsSync(target)) {
    if (!readFileSync(source).equals(readFileSync(target))) throw new Error(`Asset filename collision: ${url}`);
    return;
  }
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}
