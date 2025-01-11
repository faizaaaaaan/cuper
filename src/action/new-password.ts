"use server";

import { db } from "@/server/db";
import { getPasswordResetTokenByToken } from "@/tokens/resetpass";
import { getUserByEmail } from "@/server/user";
import bcrypt from "bcryptjs";

export const newPassword = async (password: string, token: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!token) return { error: "Invalid token" };

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) return { error: "Token not found" };

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired" };

  const user = await getUserByEmail(existingToken.email);

  if (!user) return { error: "User not found" };

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, email: existingToken.email },
  });

  await db.resetPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password has been reset successfully!" };
};
