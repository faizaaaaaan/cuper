"use server";

import { db } from "@/server/db";
import { getUserByEmail, getUserById, getUserByToken } from "@/server/user";

export const StoreKey = async (userId: string, token: any) => {
  const user = await getUserById(userId);
  if (!user) return { error: "Session expired, Login again!" };

  const notUniqueToken = await getUserByToken(token);
  if (notUniqueToken)
    return { error: "Token already existing, regenerate new one" };

  await db.user.update({
    where: { id: user.id },
    data: { apiToken: token },
  });

  return { success: "Password has been reset successfully!" };
};
