import { Button } from "./ui/button";
import { PanelRightCloseIcon } from "lucide-react";

interface NavbarHomeProps {
  toggleSidebar: () => void;
}

export default function NavbarHome({ toggleSidebar }: NavbarHomeProps) {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold text-[#451A03] md:text-3xl lg:flex-1 lg:text-center">
          🪴 WELCOME 🪴
        </h1>

        <div className="flex items-center gap-x-2">
          <Button
            className="rounded-lg border border-neutral-300/80 px-2.5 tracking-wide md:px-6 lg:hidden"
            variant="secondary"
            onClick={toggleSidebar}
          >
            <PanelRightCloseIcon className="sm:hidden" />

            <span className="hidden sm:block">Open Sidebar</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
