"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";

  return (
    <main>
      <AuroraBackground />

      <div className="mb-20 border-b bg-background/60 px-3 py-5 backdrop-blur-sm md:px-8">
        <nav className="mx-auto flex max-w-[900px] items-center justify-between lg-l:max-w-[1200px]">
          <Image src="/logo.svg" alt="Logo" width={116} height={56} />

          <Button asChild className="rounded-full px-6 tracking-wide">
            <Link href={isSignIn ? "/sign-up" : "sign-in"}>
              {isSignIn ? "Create account" : "Get started"}
            </Link>
          </Button>
        </nav>
      </div>

      <div className="px-3 md:px-8">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </div>
    </main>
  );
}
