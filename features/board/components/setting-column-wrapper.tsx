import { SettingColumnForm } from "./setting-column-form";
// import { Card, CardContent } from "@/components/ui/card";

// import { Loader } from "lucide-react";

interface SettingColumnFormWrapperProps {
  onCancel: () => void;
}

export const SettingColumnFormWrapper = ({
  onCancel,
}: SettingColumnFormWrapperProps) => {
  //   if (false) {
  //     return (
  //       <Card className="h-[714px] w-full border-none shadow-none">
  //         <CardContent className="flex h-full items-center justify-center">
  //           <Loader className="size-5 animate-spin text-muted-foreground" />
  //         </CardContent>
  //       </Card>
  //     );
  //   }

  return <SettingColumnForm onCancel={onCancel} />;
};
