"use server";

import { db } from "@/server/db";
import { getUserByEmail } from "@/server/user";
import bcrypt from "bcryptjs";

export const ChangePassword = async (password: string, email: any) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await getUserByEmail(email);
  if (!user) return { error: "Session expired, Login again!" };

  const passwordCompare = await bcrypt.compare(password, user.password || "");
  if (passwordCompare)
    return { error: "New password cannot be the same as the old password" };

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, email: email },
  });

  return { success: "Password has been reset successfully!" };
};
