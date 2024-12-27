import { redirect } from "next/navigation";

import SignInCard from "@/features/auth/components/sign-in-card";
import { getCurrentUser } from "@/features/auth/queries";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user) redirect("/");

  return <SignInCard />;
}
