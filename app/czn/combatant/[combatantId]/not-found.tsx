import Link from "next/link";

export default function CombatantNotFound() {
  return <section style={{ padding: 32 }}><h1>Combatant not found</h1><p>This character is not in the saved combatant inventory.</p><Link href="/czn/combatant">Browse combatants</Link></section>;
}
