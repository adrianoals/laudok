import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laudok.vercel.app"),
  title: "Laudok! - Laudos de Engenharia Inteligentes",
  description: "Plataforma especializada em laudos de engenharia para condomínios. Simplifique a gestão de laudos técnicos com nossa solução inteligente.",
  openGraph: {
    title: "Laudok! - Laudos de Engenharia Inteligentes",
    description: "Plataforma especializada em laudos de engenharia para condomínios.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Laudok! - Laudos de Engenharia Inteligentes",
      },
    ],
    type: "website",
    locale: "pt_BR",
    siteName: "Laudok!",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${bricolage.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-surface-alt text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
