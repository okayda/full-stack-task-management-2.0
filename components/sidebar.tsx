"use client";

import Link from "next/link";
import Image from "next/image";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { LogOut } from "lucide-react";
import { MdOutlineDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
      <div className="flex h-full flex-col justify-between">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={116} height={56} />
          </Link>

          <Separator className="mb-5 mt-4 bg-neutral-400/50" />

          <ul>
            <li>
              <Link
                href="#"
                className="flex items-center gap-x-2 text-lg font-medium"
              >
                <MdOutlineDashboard className="size-6" />
                First Board
              </Link>
            </li>

            <li className="mt-5 border-t-2 border-dashed border-neutral-400/50 pt-4">
              <Button className="flex h-[42px] w-full items-center gap-x-2 lg:h-auto">
                Create Board
              </Button>
            </li>
          </ul>

          <Separator className="my-4 bg-neutral-400/50" />
        </div>

        <Button
          variant="outline"
          className="flex h-[42px] items-center gap-x-3 lg:h-auto"
          onClick={() => {}}
        >
          Log out
          <LogOut className="size-5" />
        </Button>
      </div>
    </aside>
  );
}
