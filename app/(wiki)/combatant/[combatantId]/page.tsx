import { notFound, permanentRedirect } from "next/navigation";
import { getCharacter, getCharacterDetail, getCombatants, getCombatantBySlug } from "../../../../lib/wiki/repository";
import { combatantSlug, combatantUrl } from "../../../../lib/wiki/urls";
import { CombatantDetail } from "../../../../components/combatants/CombatantDetail";

export function generateStaticParams() { return getCombatants().map((character) => ({ combatantId: combatantSlug(character) })); }

export default async function CombatantPage({ params }: { params: Promise<{ combatantId: string }> }) {
  const { combatantId: slug } = await params;
  const character = getCombatantBySlug(slug) ?? getCharacter(slug);
  if (!character || character.kind !== "combatant") notFound();
  if (slug !== combatantSlug(character)) permanentRedirect(combatantUrl(character));
  return <CombatantDetail summary={character} detail={getCharacterDetail(character.id)} />;
}
