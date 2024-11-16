import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/components/query-provider";

import { Toaster } from "@/components/ui/sonner";

const rubik = localFont({
  src: "./fonts/Rubik.ttf",
  variable: "--font-rubik",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.variable} min-h-screen font-rubik antialiased`}>
        <QueryProvider>
          <Toaster richColors />
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
