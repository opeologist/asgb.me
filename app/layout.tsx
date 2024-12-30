import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aaron Giordano-Barry",
  description: "Aaron Giordano-Barry's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className={openSans.variable}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
