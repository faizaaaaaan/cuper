"use server";

import { sendPasswordResetToken } from "@/lib/mail";
import { generatePasswordToken } from "@/lib/tokens";
import { getUserByEmail } from "@/server/user";

export const ResetPass = async (email: string) => {
  if (!email) return { error: "Invalid Email" };

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email not registered!" };

  const passwordresettoken = await generatePasswordToken(email);
  await sendPasswordResetToken(
    passwordresettoken.email,
    passwordresettoken.token,
  );

  return { success: "Password reset email has been sent to " + email };
};
