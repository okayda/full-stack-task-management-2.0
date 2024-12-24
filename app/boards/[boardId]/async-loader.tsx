import { Loader } from "lucide-react";

export default function AsyncLoader() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex items-center gap-x-3">
        <h2>Verifying user account</h2>

        <Loader className="animate-spin text-muted-foreground" />
      </div>
    </div>
  );
}
