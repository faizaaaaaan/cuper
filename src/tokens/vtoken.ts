import { db } from "@/server/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const vtoken = await db.verificationToken.findFirst({
      where: { email },
    });

    return vtoken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
    try {
      const vtoken = await db.verificationToken.findUnique({
        where: { token },
      });
  
      return vtoken;
    } catch (error) {
      return null;
    }
  };