import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    LEMONSQUEEZY_API_KEY: z.string(),
    LEMONSQUEEZY_STORE_ID: z.string(),
    LEMONSQUEEZY_WEBHOOK_SECRET: z.string(),
    WEBHOOK_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    EMAIL_FROM: z.string().email(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_S3_BUCKET_NAME: z.string(),
    AWS_S3_BUCKET_REGION: z.string(),
    ASSEMBLYAI_KEY: z.string(),
    REMOTION_GCP_PRIVATE_KEY: z.string(),
    REMOTION_GCP_CLIENT_EMAIL: z.string(),
    REMOTION_GCP_PROJECT_ID: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_LS_4D_VARRIENT_ID: z.string(),
    NEXT_PUBLIC_LS_9D_VARRIENT_ID: z.string(),
    NEXT_PUBLIC_AWS_S3_VIDEOURL: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    LEMONSQUEEZY_API_KEY: process.env.LEMONSQUEEZY_API_KEY,
    LEMONSQUEEZY_STORE_ID: process.env.LEMONSQUEEZY_STORE_ID,
    LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
    NEXT_PUBLIC_LS_4D_VARRIENT_ID: process.env.NEXT_PUBLIC_LS_4D_VARRIENT_ID,
    NEXT_PUBLIC_LS_9D_VARRIENT_ID: process.env.NEXT_PUBLIC_LS_9D_VARRIENT_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_REGION: process.env.AWS_S3_BUCKET_REGION,
    NEXT_PUBLIC_AWS_S3_VIDEOURL: process.env.NEXT_PUBLIC_AWS_S3_VIDEOURL,
    ASSEMBLYAI_KEY: process.env.ASSEMBLYAI_KEY,
    REMOTION_GCP_PRIVATE_KEY: process.env.REMOTION_GCP_PRIVATE_KEY,
    REMOTION_GCP_CLIENT_EMAIL: process.env.REMOTION_GCP_CLIENT_EMAIL,
    REMOTION_GCP_PROJECT_ID: process.env.REMOTION_GCP_PROJECT_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
