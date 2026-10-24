import type { Metadata } from "next";
import { Anton, Anton_SC, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const antonSc = Anton_SC({
  variable: "--font-anton-sc",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  weight: ["400", "500", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhavya Jain | Portfolio",
  description: "Portfolio of Bhavya Jain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${antonSc.variable} ${ibmPlexSansArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
