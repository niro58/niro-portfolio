import Navbar from "@/components/nav/nav";
import ScrollObserver from "@/lib/scroll-observer";
import "@/styles/globals.css";
import "@/styles/prism-coldark-dark.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { StrictMode } from "react";
import { Toaster } from "sonner";
const inter = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Niro's Portfolio",
  description: "Created by Nichita Roilean"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <ScrollObserver>
        <StrictMode>
          <body className={`bg-background ${inter.className}`}>
            <Navbar />
            {children}
            <Toaster />
          </body>
          <GoogleAnalytics gaId="G-4X2FPT99PG" />
        </StrictMode>
      </ScrollObserver>
    </html>
  );
}
