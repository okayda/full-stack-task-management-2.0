import { Loader } from "lucide-react";

export default function AsyncLoader() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex items-center gap-x-3">
        <h2>Validating user account</h2>
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}
