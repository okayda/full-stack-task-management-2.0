import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FilePenLineIcon, CalendarOffIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface TaskContentActionsProps {
  children: React.ReactNode;
}

export const TaskContentActions = function ({
  children,
}: TaskContentActionsProps) {
  return (
    <div className="flex cursor-pointer justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-pointer p-[10px] font-medium">
            <FilePenLineIcon />

            <span className="text-[13px]">Edit your task</span>
          </DropdownMenuItem>

          <div className="py-1">
            <Separator />
          </div>

          <DropdownMenuItem className="cursor-pointer p-[10px] font-medium text-rose-700 focus:text-rose-700">
            <CalendarOffIcon />

            <span className="text-[13px]">Finish | Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
