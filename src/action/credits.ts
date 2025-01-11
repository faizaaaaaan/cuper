"use server";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { getUserById, verifyUserFromApi } from "@/server/user";

export async function GetCredits() {
  const usersession = await auth();
  const userid = usersession?.user?.id;

  if (!userid) {
    return { error: "You must be logged in to update your profile" };
  }
  const user = await getUserById(userid);

  const credits = user?.credits || 0;
  return { credits };
}

export async function DeductCredits({
  apiToken,
  userId,
}: {
  apiToken: string;
  userId: string;
}) {
  const verify = await verifyUserFromApi(apiToken);

  if (verify) {
    const user = await getUserById(userId);

    if (!user) {
      return { error: "Invalid API token, User not found" };
    }

    if (user?.credits < 1) {
      return { error: "You don't have enough credits", status: 404 };
    }

    // Deduct Credit
    await db.user.update({
      where: { id: user?.id },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return { user, status: 200 };
  }
}
