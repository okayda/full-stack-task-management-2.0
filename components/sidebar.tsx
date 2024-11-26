"use client";

import Link from "next/link";
import Image from "next/image";

import { useCreateBoardModal } from "@/features/board/hooks/use-create-board-modal";

import CustomSlider from "@/components/custom-slider";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

import { MdOutlineDashboard } from "react-icons/md";
import { LogOut, PanelLeftCloseIcon, PanelRightOpenIcon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  viewportWidth: number;
  setViewportWidth: (width: number) => void;
}

export default function Sidebar({
  isOpen,
  toggle,
  viewportWidth,
  setViewportWidth,
}: SidebarProps) {
  const { open } = useCreateBoardModal();

  return (
    <div
      className={cn(
        "h-full w-[280px] bg-neutral-50 p-4 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <Button
        onClick={toggle}
        className="absolute right-[-31px] top-1.5 h-auto border border-transparent p-1 text-xs"
      >
        {isOpen ? (
          <PanelLeftCloseIcon className="cursor-pointer" />
        ) : (
          <PanelRightOpenIcon className="cursor-pointer" />
        )}
      </Button>

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
                <MdOutlineDashboard className="h-6 w-6" />
                First Board
              </Link>
            </li>

            <li className="mt-5 border-t-2 border-dashed border-neutral-400/50 pt-4">
              <Button
                className="flex h-[42px] w-full items-center gap-x-2 lg:h-auto"
                onClick={open}
              >
                Create Board
              </Button>
            </li>
          </ul>

          <Separator className="my-4 bg-neutral-400/50" />

          <div className="hidden lg:block">
            <span className="block text-sm font-medium">
              Viewport adjustment
            </span>

            <CustomSlider
              defaultValue={viewportWidth}
              steps={[1080, 1280, 1580, 1680]}
              onValueChange={(value) => setViewportWidth(value)}
            />

            <span className="flex h-[36px] items-center justify-center rounded-full border border-[#0F0F0F] px-3 py-1 text-center text-[15px] font-medium tracking-wide text-neutral-900">
              {viewportWidth}px
            </span>

            <Separator className="my-4 bg-neutral-400/50" />
          </div>

          <div className="text-[13px] font-semibold text-neutral-600">
            <p>
              <span className="text-emerald-600">Developed: </span>
              Jhon Que&ntilde;ano
            </p>
            <p>
              <span className="text-emerald-600">Design: </span>
              Min-seo Yoon
            </p>
          </div>
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
    </div>
  );
}
