import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PokedexFooter } from "@/components/PokedexLayout";
import { GlobalPokedexHeader } from "@/components/GlobalPokedexHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex MVP",
  description: "Minimalist Pokedex Information System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalPokedexHeader />
        <main className="min-h-screen pt-44 md:pt-48 pb-14 px-4 md:px-8 max-w-7xl mx-auto">
           {children}
        </main>
        <PokedexFooter />
      </body>
    </html>
  );
}


