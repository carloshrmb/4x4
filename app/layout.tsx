import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "El 4×4 de la Productividad — Carlos Hermosillo",
  description:
    "Diagnóstico gratuito para descubrir tu nivel como Profesional Todoterreno. Metodología 4×4 de Carlos Hermosillo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F5F5F5] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
