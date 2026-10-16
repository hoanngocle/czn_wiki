"use client";
import { createContext, useContext } from "react";
import type { Card } from "../../lib/wiki/types";
import type { CharacterGuide } from "../../lib/wiki/character-guide";
export const CharacterGuideContext = createContext<{ guide?: CharacterGuide; cards: Map<string, Card>; animationEnabled: boolean }>({ cards: new Map(), animationEnabled: false });
export const useCharacterGuide = () => useContext(CharacterGuideContext);
