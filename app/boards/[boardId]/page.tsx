import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/queries";
import ParentClientPage from "./(client-pages)/parent-client-page";

export default async function BoardIdPage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/sign-in");
    return null;
  }

  return <ParentClientPage />;
}
