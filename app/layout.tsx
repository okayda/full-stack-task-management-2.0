import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { QueryProvider } from "@/components/query-provider";

import { Toaster } from "@/components/ui/sonner";

import { GeistSans } from "geist/font/sans";

const rubik = localFont({
  src: "./fonts/Rubik.ttf",
  variable: "--font-rubik",
  weight: "100 900",
});

const roboto = localFont({
  src: "./fonts/Roboto.ttf",
  variable: "--font-roboto",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Management 2.0",
  description: "Allow you to manage your tasks effectively",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${roboto.variable} ${rubik.variable} font-rubik antialiased`}
      >
        <main>
          <QueryProvider>
            <Toaster richColors />

            {children}
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
