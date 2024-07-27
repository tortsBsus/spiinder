import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthContextProvider } from "./context/AuthContext";
import { Analytics } from "@vercel/analytics/react"
import localFont from 'next/font/local';


const inter = Inter({ subsets: ["latin"], variable: "--font-sans", });

export const metadata: Metadata = {
  title: "Spiinder",
  description: "categorise your spends via swipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* TODO : Fill OpenGraph Details */}
        {/* <meta property="twitter:image" content="https://www.meghana.tech/assets/preview.png"></meta>   

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:title" content="Devfolio - Meghana Rathanraj's Developer Portfolio"></meta>
        <meta property="twitter:description" content="Showcasing Meghana's projects"></meta>

        <meta property="description" content="Discover the portfolio of Meghana Rathanraj, showcasing projects and expertise in web development."></meta>

        <meta property="og:image" content="https://www.meghana.tech/assets/preview.png"></meta>

        <meta property="og:site_name" content="Devfolio"></meta>
        <meta property="og:title" content="Devfolio - Meghana Rathanraj's Developer Portfolio"></meta>
        <meta property="og:description" content="Showcasing Meghana's projects"></meta>
        <meta property="og:url" content="https://www.meghana.tech/"></meta> */}
      </head>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable,
      )}>

        <AuthContextProvider>
          {children}
          <Analytics />
        </AuthContextProvider>
      </body>
    </html>
  );
}
