"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Models } from "node-appwrite";

import { useCreateBoardModal } from "@/features/board/hooks/use-create-board-modal";

import CustomSlider from "@/components/custom-slider";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

import { MdOutlineDashboard } from "react-icons/md";
import {
  LogOut,
  PanelLeftCloseIcon,
  PanelRightOpenIcon,
  LoaderIcon,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  viewportWidth: number;
  setViewportWidth: (width: number) => void;
  isHomePage?: boolean;
  userBoardsData?: Models.DocumentList<Models.Document>;
}

const VIEW_PORT_STEPS = [1080, 1280, 1580, 1680];
const VIEW_PORT_LABELS = ["Small", "Medium", "Large", "X-Large"];

const getTargetIndex = function (width: number) {
  // Return index of the first occurrence or -1 if not present so the last step will be used which X-Large
  const idx = VIEW_PORT_STEPS.indexOf(width);
  return idx >= 0 ? idx : VIEW_PORT_STEPS.length - 1;
};

export default function Sidebar({
  isOpen,
  toggle,
  viewportWidth,
  setViewportWidth,
  isHomePage,
  userBoardsData,
}: SidebarProps) {
  const pathname = usePathname();

  const { open: openBoardFormModal } = useCreateBoardModal();

  const [index, setIndex] = useState(getTargetIndex(viewportWidth));
  const [label, setLabel] = useState(VIEW_PORT_LABELS[index]);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const getViewportWidth = localStorage.getItem("viewportWidth");
    const getLabel = localStorage.getItem("viewportLabel");

    if (getViewportWidth && getLabel) {
      const width = parseInt(getViewportWidth, 10);
      setViewportWidth(width);
      setIndex(getTargetIndex(width));

      setLabel(getLabel);
    }

    const timer = setTimeout(() => {
      setShowSlider(true);
    }, 2000); // 2 second

    return () => clearTimeout(timer);
  }, []);

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
            {userBoardsData && userBoardsData.total > 0 ? (
              userBoardsData.documents.map((board) => {
                const isActive = pathname === `/boards/${board.$id}`;

                return (
                  <li key={board.$id} className="mb-3">
                    <Link
                      href={`/boards/${board.$id}`}
                      className={cn(
                        "flex items-center gap-x-2 text-base font-medium transition-colors",
                        isActive ? "text-[#0A0A0A]" : "text-neutral-400",
                      )}
                    >
                      <MdOutlineDashboard className="size-6" />
                      {board.boardName}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li>
                <h3 className="text-base font-medium">No available boards</h3>
              </li>
            )}

            <li className="mt-5 border-t-2 border-dashed border-neutral-400/60 pt-4">
              <Button
                className="h-[42px] w-full lg:h-auto"
                onClick={openBoardFormModal}
              >
                Create Board
              </Button>
            </li>
          </ul>

          <Separator className="my-4 bg-neutral-400/50" />

          {!isHomePage && (
            <div className="hidden lg:block">
              <span className="block text-sm font-medium">
                Viewport adjustment
              </span>

              {showSlider ? (
                <div>
                  <CustomSlider
                    value={index}
                    viewPortSteps={VIEW_PORT_STEPS}
                    viewPortLabels={VIEW_PORT_LABELS}
                    onValueChange={(newIndex, newValue, newLabel) => {
                      setIndex(newIndex);
                      setViewportWidth(newValue);
                      setLabel(newLabel);
                    }}
                  />

                  <span className="flex h-[36px] items-center justify-center rounded-full border border-[#0F0F0F] px-3 py-1 text-center text-[15px] font-medium tracking-wide text-neutral-900">
                    {label}
                  </span>
                </div>
              ) : (
                <LoaderIcon className="mx-auto mt-4 animate-spin" />
              )}

              <Separator className="my-4 bg-neutral-400/50" />
            </div>
          )}

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

        <div>
          <Image
            src="/hatsune.webp"
            width={150}
            height={150}
            alt="meme picture"
            className="mx-auto"
          />

          <Button
            variant="outline"
            className="flex h-[42px] w-full items-center gap-x-3 lg:h-auto"
            onClick={() => {}}
          >
            Log out
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
