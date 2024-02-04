import { Nav } from "@/components/nav";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { StrictMode } from "react";

import "../styles/globals.css";

const inter = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StrictMode>
        <body className={`bg-background  ${inter.className}`}>
          {
            //<Nav />
          }{" "}
          {children}
        </body>
      </StrictMode>
    </html>
  );
}
