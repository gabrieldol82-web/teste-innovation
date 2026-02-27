import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Teste Front-end - Gabriel Dantas",
    template: "%s | Product Manager",
  },
  description: "Desafio técnico Front-end. Acesso a dasboard de produtos",
  keywords: ["Next.js", "TypeScript", "Dashboard de Produtos", "Catálogo Online", "Gerenciamento de Estoque"],
  authors: [{ name: "Gabriel Dantas", url: "https://gabriel-dantas.vercel.app/" }],
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://teste-innovation-gabriel.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="min-h-screen">
          <Header />
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}