import { useSettingColumnModal } from "@/features/board/hooks/use-setting-column-modal";
import { Button } from "./ui/button";

export default function Navbar() {
  const { open: openSettingModal } = useSettingColumnModal();

  return (
    <nav className="flex items-center justify-between px-4 pt-6 lg:px-[30px]">
      <div className="flex w-full justify-between pt-6">
        <h1 className="self-center text-2xl font-medium md:text-3xl">
          Example Board
        </h1>

        <Button
          className="rounded-full px-6 tracking-wide"
          onClick={openSettingModal}
        >
          Settings
        </Button>
      </div>
    </nav>
  );
}
