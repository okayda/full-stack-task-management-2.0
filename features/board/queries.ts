import { Query } from "node-appwrite";

import { createSessionClient } from "@/lib/appwrite";

import { DATABASE_ID, BOARDS_ID } from "@/config";

export const getCurrentUserBoards = async function () {
  const { account, databases } = await createSessionClient();

  const user = await account.get();

  const boards = await databases.listDocuments(DATABASE_ID, BOARDS_ID, [
    Query.equal("userId", user.$id),
  ]);

  return boards;
};
