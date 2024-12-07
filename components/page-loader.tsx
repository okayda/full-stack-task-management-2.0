import { Loader } from "lucide-react";

export const PageLoader = function () {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Loader className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
};
