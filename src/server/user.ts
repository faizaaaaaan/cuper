import { db } from "./db";
import { auth } from "./auth";
import { NextResponse } from "next/server";

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const adminData = async () => {
  try {
    const user = await db.user.findMany({
      select: {
        name: true,
        image: true,
        email: true,
        credits: true,
        joinedAt: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByToken = async (apiToken: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        apiToken,
      },
    });
    return user;
  } catch (error) {
    return new NextResponse("User Not Found", { status: 404 });
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const fullUserData = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {},
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const linkedAccounts = async (id: string) => {
  try {
    const accounts = await db.account.findMany({
      where: {
        userId: id,
      },
    });
    return accounts;
  } catch (error) {
    return null;
  }
};

export const verifyUserFromApi = async (apiToken: string) => {
  try {
    const user = await getUserByToken(apiToken);
    if (!user) {
      throw new Error("User not found"); // Throw an error if user is not found
    }
    return user; // Returns the user if exists
  } catch (error) {
    console.error(error); // Log the error for debugging
    return null; // Return null if there's an error
  }
};

export const getVideoById = async (id: string) => {
  try {
    const video = await db.generated.findUnique({
      where: {
        id,
      },
      include: {
        captions: true,
      }
    });
    return video;
  } catch (error) {
    return null;
  }
};

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
