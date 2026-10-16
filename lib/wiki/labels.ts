import terminology from "../../data/wiki/translations/vi/terminology.json";
const labels = new Map(Object.entries(terminology).map(([key, value]) => [key.toLowerCase(), value]));

export function label(value: string, vietnamese: boolean): string {
  return vietnamese ? (terminology as Record<string, string>)[value] ?? labels.get(value.toLowerCase()) ?? value : value;
}
