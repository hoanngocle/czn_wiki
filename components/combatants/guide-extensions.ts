import type { ComponentType } from "react";
import { RenoaSeasonalGuide } from "./RenoaSeasonalGuide";

// Optional editorial layouts. Ordinary character guides only need data registration.
export const seasonalGuideExtensions: Record<string, ComponentType<{ vietnamese: boolean }>> = {
  "1041": RenoaSeasonalGuide,
};
