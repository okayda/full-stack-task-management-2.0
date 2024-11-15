import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <main>
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
