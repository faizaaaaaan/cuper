import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { login } from "@/schemas";
import { db } from "./db";
import { all } from "axios";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateedFields = login.safeParse(credentials);

        if (validateedFields.success) {
          const { email, password } = validateedFields.data;

          const user = await db.user.findFirst({
            where: {
              email,
            },
          });
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (user && passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
