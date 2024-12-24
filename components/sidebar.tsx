"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Models } from "node-appwrite";

import { CreateBoardModal } from "@/features/board/components/create-board-modal";

import SparklesText from "./ui/sparkles-text";
import CustomSlider from "./ui/custom-slider";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";

import { MdOutlineDashboard } from "react-icons/md";
import { LogOut, XIcon, Columns2Icon, LoaderIcon } from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  viewportWidth: number;
  setViewportWidth: (width: number) => void;

  isHomePage: boolean;
  userBoardsData: Models.Document[];
}

const VIEW_PORT_STEPS = [1080, 1280, 1580, 1680];
const VIEW_PORT_LABELS = ["Small", "Medium", "Large", "X-Large"];

const getTargetIndex = function (width: number) {
  // Return index of the first occurrence or -1 if not present so the last step will be used which X-Large
  const idx = VIEW_PORT_STEPS.indexOf(width);
  return idx >= 0 ? idx : VIEW_PORT_STEPS.length - 1;
};

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  viewportWidth,
  setViewportWidth,
  isHomePage,
  userBoardsData,
}: SidebarProps) {
  const pathname = usePathname();
  const hasUserBoardsData = userBoardsData && userBoardsData.length > 0;

  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState(false);
  const openCreateBoardModal = () => setIsCreateBoardModalOpen(true);
  const closeCreateBoardModal = () => setIsCreateBoardModalOpen(false);

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
    <React.Fragment>
      <CreateBoardModal
        isCreateBoardModalOpen={isCreateBoardModalOpen}
        closeCreateBoardModal={closeCreateBoardModal}
      />

      <div
        className={cn(
          "fixed inset-0 size-full bg-[#FAFAFA]/90 transition-opacity duration-300 lg:hidden",
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={toggleSidebar}
      />

      <div
        className={cn(
          "flex h-full w-[17.5rem] flex-col justify-between border-r bg-[#FAFAFA] pb-4 transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          className={cn(
            "absolute -right-[7.25rem] top-[4rem] hidden h-auto border border-neutral-300/80 bg-[#FAFAFA] p-1 text-xs lg:right-[-1.9375rem] lg:top-16 lg:block lg:border-none lg:border-transparent lg:bg-transparent",
            isSidebarOpen && "right-[-1.9375rem] block",
          )}
        >
          <div className="flex items-center gap-x-1 lg:block">
            <Columns2Icon className="hidden cursor-pointer lg:block" />

            <XIcon className="cursor-pointer lg:hidden" />

            <span className={cn("lg:hidden", { hidden: isSidebarOpen })}>
              Open Sidebar
            </span>
          </div>
        </Button>

        <div>
          <div className="relative mb-5 flex items-center gap-x-4 border-b px-4 py-3">
            <SparklesText
              text="Version 2.0"
              className="text-3xl font-medium"
              sparklesCount={6}
              colors={{ first: "#8B5CF6", second: "#10B981" }}
            />

            <Image
              src="/panda.webp"
              width={60}
              height={60}
              unoptimized
              alt="Panda GIF"
              className="absolute -right-4 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
            />
          </div>

          <div className="px-4">
            <ul className="flex flex-col gap-y-5">
              {hasUserBoardsData ? (
                userBoardsData.map((board) => {
                  const isActive = pathname === `/boards/${board.$id}`;

                  return (
                    <li key={board.$id}>
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

              <li className="border-t-2 border-dashed border-neutral-400/60 pt-4">
                <Button
                  className="h-[2.625rem] w-full lg:h-auto"
                  onClick={openCreateBoardModal}
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
    </React.Fragment>
  );
}
