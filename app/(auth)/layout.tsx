"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

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

      <div className="mb-7 border-b bg-background/60 px-4 py-5 backdrop-blur-sm sm:mb-16 md:mb-20 md:px-8">
        <nav className="mx-auto flex max-w-[900px] items-center justify-between lg-l:max-w-[1200px]">
          <Image src="/logo.svg" alt="Logo" width={116} height={56} />

          <Button asChild className="rounded-full px-6 tracking-wide">
            <Link href={isSignIn ? "/sign-up" : "sign-in"}>
              {isSignIn ? "Create account" : "Get started"}
            </Link>
          </Button>
        </nav>
      </div>

      <div className="px-4 md:px-8">
        <div className="mx-auto max-w-[1200px]">{children}</div>
      </div>
    </main>
  );
}
