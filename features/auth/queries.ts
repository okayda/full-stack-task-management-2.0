import { createSessionClient } from "@/lib/appwrite";

export const getCurrentUser = async function () {
  try {
    const { account } = await createSessionClient();

    return await account.get();
  } catch (e) {
    console.log("getCurrentUser() is not working error:", e);

    return null;
  }
};
