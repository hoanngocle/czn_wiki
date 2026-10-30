import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const beVietnamPro = localFont({
  src: [
    { path: "../public/fonts/be-vietnam-pro/BeVietnamPro-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/be-vietnam-pro/BeVietnamPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/be-vietnam-pro/BeVietnamPro-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/be-vietnam-pro/BeVietnamPro-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/be-vietnam-pro/BeVietnamPro-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "CZN Wiki & Ebooks",
  description: "Khám phá dữ liệu Chaos Zero Nightmare và thư viện truyện tiếng Việt.",
};

const themeBoot = `try{const saved=localStorage.getItem('themeMode');const theme=saved==='dark'||saved==='light'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme}catch{document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  // themeBoot intentionally sets data-theme before React hydrates this element.
  return <html lang="vi" className={`${beVietnamPro.variable} ${beVietnamPro.className}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBoot }} /></head><body>{children}</body></html>;
}
