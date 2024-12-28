import { redirect } from "next/navigation";

import SignInCard from "@/features/auth/components/sign-in-card";
import { getCurrentUser } from "@/features/auth/queries";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) redirect("/");

  return <SignInCard />;
}
