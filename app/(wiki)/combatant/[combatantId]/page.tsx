import { notFound } from "next/navigation";
import { getCharacter, getCharacterDetail, getCombatants } from "../../../../lib/wiki/repository";
import { CombatantDetail } from "../../../../components/combatants/CombatantDetail";

export function generateStaticParams() { return getCombatants().map(({ id }) => ({ combatantId: id })); }

export default async function CombatantPage({ params }: { params: Promise<{ combatantId: string }> }) {
  const { combatantId } = await params;
  const character = getCharacter(combatantId);
  if (!character || character.kind !== "combatant") notFound();
  return <CombatantDetail summary={character} detail={getCharacterDetail(combatantId)} />;
}
