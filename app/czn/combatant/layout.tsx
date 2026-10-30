import { getCombatants, getNewCombatantIds, getUnavailableJobIcons } from "../../../lib/wiki/repository";
import { CombatantWorkspace } from "../../../components/combatants/CombatantWorkspace";

export default function CombatantLayout({ children }: { children: React.ReactNode }) {
  return <CombatantWorkspace characters={getCombatants()} newIds={getNewCombatantIds()} unavailableJobIcons={getUnavailableJobIcons()}>{children}</CombatantWorkspace>;
}
