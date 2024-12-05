import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/components/query-provider";

import { Toaster } from "@/components/ui/sonner";
import GridPattern from "@/components/ui/grid-pattern";

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
      <body className={`${rubik.variable} font-rubik antialiased`}>
        <GridPattern
          className="fixed left-0 top-0 -z-[10] h-full w-screen stroke-neutral-300/25"
          strokeDasharray="4 2"
        />

        <main>
          <QueryProvider>
            <Toaster richColors />
            <NuqsAdapter>{children}</NuqsAdapter>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
