"use client";

import { useState, useEffect } from "react";

import { Models } from "node-appwrite";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: React.ReactNode;
  isDesktop: boolean;
  isHomePage?: boolean;
  hasBoardsData: boolean;
  userBoardsData?: Models.DocumentList<Models.Document>;
}

const VIEWPORT_WIDTH = 1680;

export default function DashBoardLayout({
  children,
  isDesktop,
  isHomePage,
  hasBoardsData,
  userBoardsData,
}: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const [viewportWidth, setViewportWidth] = useState(VIEWPORT_WIDTH);

  const showNavbar = hasBoardsData && !isHomePage;

  useEffect(() => {
    const savedViewportWidth = localStorage.getItem("viewportWidth");
    if (savedViewportWidth) {
      setViewportWidth(parseInt(savedViewportWidth, 10));
    }
  }, []);

  return (
    <div className="relative">
      <div
        className={cn(
          "fixed left-0 top-0 z-[20] h-full transition-transform duration-300",
          !isSidebarOpen && "w-0",
        )}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          toggle={() => setIsSidebarOpen(!isSidebarOpen)}
          viewportWidth={viewportWidth}
          setViewportWidth={setViewportWidth}
          isHomePage={isHomePage}
          userBoardsData={userBoardsData}
        />
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "lg:pl-[17.5rem]" : "pl-0",
        )}
      >
        {showNavbar && (
          <div className="border-b bg-white px-4 py-3 lg:px-6">
            <div className="mx-auto" style={{ maxWidth: `${viewportWidth}px` }}>
              <Navbar userBoardsData={userBoardsData} />
            </div>
          </div>
        )}

        <div className="pb-0 pl-2 pt-8 lg:px-6 lg:pt-9">
          <div className="mx-auto" style={{ maxWidth: `${viewportWidth}px` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
