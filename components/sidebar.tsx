"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Models } from "node-appwrite";

import { useCreateBoardModal } from "@/features/board/hooks/use-create-board-modal";

import CustomSlider from "./ui/custom-slider";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

import { MdOutlineDashboard } from "react-icons/md";
import { LogOut, Columns2Icon, LoaderIcon } from "lucide-react";
import SparklesText from "./ui/sparkles-text";

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
        "flex h-full w-[17.5rem] flex-col justify-between border-r bg-neutral-50 pb-4 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <Button
        onClick={toggle}
        variant="ghost"
        className="absolute right-[-1.9375rem] top-16 h-auto border-transparent p-1 text-xs"
      >
        <Columns2Icon className="cursor-pointer" />
      </Button>

      <div>
        <div className="mb-5 border-b px-4 py-3">
          <SparklesText
            text="Version 2.0"
            className="text-3xl font-medium"
            sparklesCount={6}
            colors={{ first: "#8B5CF6", second: "#10B981" }}
          />
        </div>

        <div className="px-4">
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
                className="h-[2.625rem] w-full lg:h-auto"
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

                  <span className="flex h-[2.25rem] items-center justify-center rounded-full border border-[#0F0F0F] px-3 py-1 text-center text-[0.9375rem] font-medium tracking-wide text-neutral-900">
                    {label}
                  </span>
                </div>
              ) : (
                <LoaderIcon className="mx-auto mt-4 animate-spin" />
              )}

              <Separator className="my-4 bg-neutral-400/50" />
            </div>
          )}

          <div className="text-[0.8125rem] font-semibold text-neutral-600">
            <p>
              <span className="text-purple-600">Developed: </span>
              Jhon Que&ntilde;ano
            </p>
            <p>
              <span className="text-emerald-600">Design: </span>
              Min-seo Yoon
            </p>
          </div>
        </div>
      </div>

      <div className="px-4">
        <Image
          src="/hatsune.webp"
          width={150}
          height={150}
          alt="meme picture"
          className="mx-auto"
        />

        <Button
          variant="outline"
          className="flex h-[2.625rem] w-full items-center gap-x-3 lg:h-auto"
          onClick={() => {}}
        >
          Log out
          <LogOut className="size-5" />
        </Button>
      </div>
    </div>
  );
}
