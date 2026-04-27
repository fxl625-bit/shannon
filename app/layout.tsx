import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LanguageProvider } from "@/components/language-provider";

import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shannon Fu",
  description:
    "Exploring how AI extends human capability through workflows, Obsidian notes, and lightweight apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={body.variable}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
