"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

import { MenuIcon } from "lucide-react";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-700" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="!max-w-[300px] p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
