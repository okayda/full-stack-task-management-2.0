"use client";

import { useState, useEffect } from "react";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: React.ReactNode;
  isDesktop: boolean;
}

const VIEWPORT_WIDTH = 1680;

export default function DashBoardLayout({
  children,
  isDesktop,
}: SidebarLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const [viewportWidth, setViewportWidth] = useState(VIEWPORT_WIDTH);

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
        />
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          isSidebarOpen ? "lg:pl-[280px]" : "pl-0",
        )}
      >
        <div className="mx-auto" style={{ maxWidth: `${viewportWidth}px` }}>
          <Navbar />

          {children}
        </div>
      </div>
    </div>
  );
}
