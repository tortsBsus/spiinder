import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthContextProvider } from "./context/AuthContext";
import { Analytics } from "@vercel/analytics/react"



const inter = Inter({ subsets: ["latin"], variable: "--font-sans",});

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
      <body   className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}>
          <AuthContextProvider>
          {children}
          <Analytics />
          </AuthContextProvider>
          </body>
    </html>
  );
}
