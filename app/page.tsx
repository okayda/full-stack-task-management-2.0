import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/queries";
import HomeClientPage from "./home-client-page";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
    return null;
  }

  return <HomeClientPage />;
}
