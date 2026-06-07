import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AIAssistant from "../components/AIAssistant";

import { Space_Grotesk, Space_Mono, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gebey Gebre | Software Engineering Student",
  description: "Portfolio of Gebey Gebre – Software Engineering Student at Woldia University. Skilled in C++, Java, JavaScript, PHP, and DSA.",
  openGraph: {
    title: "Gebey Gebre | Software Engineering Student",
    description: "Seeking internship opportunities. Skilled in C++, Java, JavaScript, PHP, and Data Structures & Algorithms.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
        <AIAssistant />
      </body>
    </html>
  );
}
