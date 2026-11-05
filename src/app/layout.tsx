import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Sofia_Sans_Extra_Condensed } from "next/font/google";
import "./globals.css";

const sofia = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia",
  weight: ["700", "800"],
  subsets: ["latin", "cyrillic"],
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  weight: ["400", "500", "600"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "АЛЛЕЯ — вода из айсбергов Ньюфаундленда. Сезон закрыт",
  description:
    "Концепт для портфолио: вымышленный бренд воды из айсбергов. Погружение от верхушки айсберга до дна и запись на первую бутылку следующего сезона.",
};

export const viewport: Viewport = {
  themeColor: "#eaf3f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${sofia.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
