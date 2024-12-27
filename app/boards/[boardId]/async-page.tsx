import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/queries";

import ParentClientPage from "./(client-pages)/parent-client-page";

export const dynamic = "force-dynamic";

export default async function AsyncPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
    return null;
  }

  return <ParentClientPage />;
}
