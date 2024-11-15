import Link from "next/link";
import Image from "next/image";

import { Separator } from "./ui/separator";

import { MdOutlineDashboard } from "react-icons/md";
import { Button } from "./ui/button";

export default function Sidebar() {
  return (
    <aside className="h-full w-full bg-neutral-100 p-4">
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
          <Button className="flex w-full items-center gap-x-2 font-medium">
            Create Board
          </Button>
        </li>
      </ul>

      <Separator className="my-4 bg-neutral-400/50" />
    </aside>
  );
}
