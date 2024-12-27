import { redirect } from "next/navigation";

import SignUpCard from "@/features/auth/components/sign-up-card";
import { getCurrentUser } from "@/features/auth/queries";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/");
    return null;
  }

  return <SignUpCard />;
}
