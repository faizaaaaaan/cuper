import { db } from "@/server/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.resetPasswordToken.findFirst({
      where: { email },
    });

    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db.resetPasswordToken.findUnique({
      where: { token },
    });

    return resetToken;
  } catch (error) {
    return null;
  }
};
