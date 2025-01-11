"use server";

import { db } from "@/server/db";
import { getUserByEmail } from "@/server/user";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export default async function RegisterUser({ data }: { data: any }) {
  if (!data) {
    return { error: "Enter a valid email and password" };
  }

  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const vtoken = await generateVerificationToken(email);

  // Verification Token Email
  await sendVerificationEmail(vtoken.email, vtoken.token);

  return { success: "Confirmation email has been send successfully!" };
}
