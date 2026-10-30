import type { Metadata } from "next";
import { DeckBuilder } from "../../../components/deck-builder/DeckBuilder";
import catalog from "../../../data/deck-builder/catalog.json";
import type { Catalog } from "../../../lib/deck-builder/types";

export const metadata: Metadata = { title: "Deck Builder | CZN Wiki", description: "Build and customize Chaos Zero Nightmare decks, calculate PT, and save or share your builds." };

export default function DeckBuilderPage() {
  return <DeckBuilder catalog={catalog as unknown as Catalog} />;
}
