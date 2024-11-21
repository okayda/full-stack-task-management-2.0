import MobileSidebar from "./mobile-sidebar";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-[30px] pt-6">
      <div className="hidden w-full pt-6 lg:flex lg:justify-between">
        <h1 className="text-3xl font-medium">First Board</h1>

        <Button className="rounded-full px-6 tracking-wide">Settings</Button>
      </div>

      <MobileSidebar />
    </nav>
  );
}
