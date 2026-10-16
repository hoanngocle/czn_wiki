"use client";

import { useUiLanguage } from "../../../lib/ui/language";

export default function CombatantIndex() {
  const { t } = useUiLanguage();
  return <section aria-label={t("Choose a combatant")} style={{ display: "grid", placeItems: "center", minHeight: "100vh", color: "var(--text-tertiary)" }}><p>{t("Select a combatant to view their details.")}</p></section>;
}
