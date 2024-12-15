import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Trash2Icon } from "lucide-react";

interface SettingColumnActionsProps {
  children: React.ReactNode;
}

export const SettingColumnActions = function ({
  children,
}: SettingColumnActionsProps) {
  return (
    <div className="flex cursor-pointer justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-pointer p-[0.625rem] font-medium text-rose-700 focus:text-rose-700">
            <Trash2Icon />

            <span className="text-[0.8125rem]">Delete Board</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
