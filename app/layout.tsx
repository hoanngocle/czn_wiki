import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CZN Wiki | Combatants",
  description: "Chaos Zero Nightmare combatant reference",
};

const themeBoot = `try{const saved=localStorage.getItem('themeMode');const theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><head><script dangerouslySetInnerHTML={{ __html: themeBoot }} /></head><body>{children}</body></html>;
}
