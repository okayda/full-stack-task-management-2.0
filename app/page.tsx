import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getCurrentUser } from "@/features/auth/queries";
import { CreateBoardModal } from "@/features/board/components/create-board-modal";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/sign-in");

  return (
    <main>
      <CreateBoardModal />

      <div className="flex h-full w-full">
        <div className="fixed left-0 top-0 hidden h-full overflow-y-auto lg:block lg:w-[280px]">
          <Sidebar />
        </div>

        <div className="w-full lg:pl-[280px]">
          <div className="mx-auto h-full max-w-[1400px]">
            <Navbar />

            <div className="flex h-full flex-col px-6 py-8">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                obcaecati dignissimos maiores reprehenderit nulla illo accusamus
                repellat minima, atque modi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
