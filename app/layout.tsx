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
  title: "Shannon Fu — AI x Human Potential",
  description:
    "A personal interface for exploring how AI expands memory, expression, judgment, and creativity.",
  keywords: ["AI", "Human Potential", "Knowledge System", "Second Brain", "Workflow"],
  openGraph: {
    title: "Shannon Fu — AI x Human Potential",
    description:
      "A personal interface for exploring how AI expands memory, expression, judgment, and creativity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={body.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
