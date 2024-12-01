"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import GridPattern from "@/components/ui/grid-pattern";

const AuroraBackground = dynamic(
  () => import("@/components/ui/aurora-background"),
  {
    ssr: false,
  },
);

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main>
      <AuroraBackground />

      <GridPattern
        className="fixed left-0 top-0 -z-[10] hidden h-full w-screen stroke-neutral-300/25 lg-l:block"
        strokeDasharray="4 2"
      />

      <div className="border-b bg-background/60 p-4 backdrop-blur md-l:px-8">
        <nav className="mx-auto flex max-w-[900px] items-center justify-between lg-l:max-w-[1200px]">
          <Image src="/logo.svg" alt="Logo" width={116} height={56} />

          <Button
            asChild
            className="rounded-full border px-6 font-medium tracking-wide"
          >
            <Link href={isSignIn ? "/sign-up" : "sign-in"}>
              {isSignIn ? "Create account" : "Get started"}
            </Link>
          </Button>
        </nav>
      </div>

      <div className="px-4 pt-7 sm:pt-16 md:py-12 md-l:px-8 lg-l:py-20">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </div>
    </main>
  );
}
